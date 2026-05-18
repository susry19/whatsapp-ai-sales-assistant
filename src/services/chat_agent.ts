import { prisma } from "@/lib/prisma";
import { generateEmbedding, openai } from "@/lib/openai";

export async function processIncomingMessage(organizationId: string, phone: string, text: string, customerName?: string) {
  // 1. Find or create customer and conversation
  let customer = await prisma.customer.findUnique({
    where: { organizationId_phone: { organizationId, phone } }
  });

  if (!customer) {
    customer = await prisma.customer.create({
      data: { organizationId, phone, name: customerName }
    });
  }

  let conversation = await prisma.conversation.findFirst({
    where: { customerId: customer.id, status: "ACTIVE" }
  });

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: { organizationId, customerId: customer.id, platform: "WHATSAPP" }
    });
  }

  // Save user message
  await prisma.message.create({
    data: { conversationId: conversation.id, sender: "USER", content: text }
  });

  // If human takeover, do not reply
  if (conversation.humanTakeover) return null;

  // 2. Retrieve relevant products using pgvector
  const embedding = await generateEmbedding(text);
  const embeddingStr = `[${embedding.join(",")}]`;

  // Get top 3 relevant products
  const searchResults = await prisma.$queryRawUnsafe<any[]>(
    `SELECT "productId", content, 1 - (embedding <=> $1::vector) as similarity
     FROM "ProductEmbedding"
     WHERE "productId" IN (SELECT id FROM "Product" WHERE "organizationId" = $2)
     ORDER BY embedding <=> $1::vector
     LIMIT 3;`,
    embeddingStr,
    organizationId
  );

  let contextInfo = "No specific product context found.";
  if (searchResults.length > 0) {
    contextInfo = searchResults.map(r => r.content).join("\n\n");
  }

  // 3. Get organization settings for system prompt
  const settings = await prisma.setting.findUnique({ where: { organizationId } });
  const baseSystemPrompt = settings?.systemPrompt || "You are a professional sales and customer support assistant. Answer accurately based on the product info provided.";

  // Retrieve last 5 messages for context
  const recentMessages = await prisma.message.findMany({
    where: { conversationId: conversation.id },
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  const chatHistory = recentMessages.reverse().map(m => ({
    role: m.sender === "USER" ? "user" : "assistant",
    content: m.content
  }));

  // 4. Generate AI response
  const systemPrompt = `
${baseSystemPrompt}

PRODUCT KNOWLEDGE BASE:
${contextInfo}

INSTRUCTIONS:
- If the customer wants to order, ask for their full name, phone number, and delivery address sequentially.
- If you have collected all order details, format the final confirmation clearly.
- Never invent product details. If you don't know, say so politely.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      ...chatHistory as any[]
    ],
    temperature: 0.3,
  });

  const aiReply = response.choices[0].message.content || "Sorry, I am unable to respond at the moment.";

  // Save AI message
  await prisma.message.create({
    data: { conversationId: conversation.id, sender: "AI", content: aiReply }
  });

  // Update daily analytics
  const today = new Date();
  today.setHours(0,0,0,0);
  await prisma.analyticsDaily.upsert({
    where: { organizationId_date: { organizationId, date: today } },
    update: { totalMessages: { increment: 1 }, aiMessages: { increment: 1 } },
    create: { organizationId, date: today, totalMessages: 1, aiMessages: 1 }
  });

  // Basic check for order creation intent in the AI response or conversation flow
  // (In a real scenario, use OpenAI function calling to create orders)
  
  return aiReply;
}
