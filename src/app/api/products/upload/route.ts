import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { generateEmbedding } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const products = body.products; // Array of product objects from CSV

    for (const p of products) {
      if (!p.urun_adi || !p.kisa_aciklama || !p.detayli_aciklama) continue;

      const product = await prisma.product.create({
        data: {
          organizationId: session.organizationId,
          urun_adi: p.urun_adi,
          kisa_aciklama: p.kisa_aciklama,
          detayli_aciklama: p.detayli_aciklama,
          resim_url: p.resim_url,
          fiyat: p.fiyat ? parseFloat(p.fiyat) : null,
          stok: p.stok ? parseInt(p.stok) : null,
          kategori: p.kategori,
          marka: p.marka,
          tags: p.tags,
          faq_sorulari: p.faq_sorulari,
          kurulum_bilgisi: p.kurulum_bilgisi,
          sikayetler_cozumler: p.sikayetler_ve_cozumler
        }
      });

      // Generate embedding content
      const content = `
        Product: ${product.urun_adi}
        Short Description: ${product.kisa_aciklama}
        Detailed Description: ${product.detayli_aciklama}
        Price: ${product.fiyat}
        Category: ${product.kategori}
        Brand: ${product.marka}
        Tags: ${product.tags}
        FAQ: ${product.faq_sorulari}
        Installation: ${product.kurulum_bilgisi}
        Complaints & Solutions: ${product.sikayetler_cozumler}
      `;

      const embedding = await generateEmbedding(content);

      // Insert embedding using raw query due to pgvector
      await prisma.$executeRawUnsafe(
        `INSERT INTO "ProductEmbedding" (id, "productId", content, embedding) 
         VALUES (gen_random_uuid(), $1, $2, $3::vector)`,
        product.id,
        content,
        `[${embedding.join(",")}]`
      );
    }

    return NextResponse.json({ success: true, message: "Products uploaded and embeddings generated" });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload products" }, { status: 500 });
  }
}
