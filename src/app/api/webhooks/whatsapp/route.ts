import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { processIncomingMessage } from "@/services/chat_agent";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "wa_sales_ai_verify_token";

// Webhook Verification (GET)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

// Handle Incoming Messages (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.object === "whatsapp_business_account") {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.value && change.value.messages) {
            const phoneId = change.value.metadata.phone_number_id;
            const message = change.value.messages[0];
            const contact = change.value.contacts[0];
            
            const senderPhone = message.from;
            const text = message.text?.body;
            const customerName = contact?.profile?.name;

            if (!text) continue;

            // Find organization by phoneId
            const setting = await prisma.setting.findFirst({
              where: { whatsappPhoneId: phoneId }
            });

            if (!setting || !setting.metaAccessToken) {
              console.error("No valid organization/token found for phoneId:", phoneId);
              continue;
            }

            const aiReply = await processIncomingMessage(setting.organizationId, senderPhone, text, customerName);

            if (aiReply) {
              // Send reply via WhatsApp API
              await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${setting.metaAccessToken}`,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  messaging_product: "whatsapp",
                  to: senderPhone,
                  text: { body: aiReply }
                })
              });
            }
          }
        }
      }
    }
    
    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
