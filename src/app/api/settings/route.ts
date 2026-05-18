import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await prisma.setting.findUnique({
    where: { organizationId: session.organizationId }
  });

  return NextResponse.json({ settings });
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();

  const settings = await prisma.setting.upsert({
    where: { organizationId: session.organizationId },
    update: {
      openaiApiKey: data.openaiApiKey,
      metaAccessToken: data.metaAccessToken,
      whatsappPhoneId: data.whatsappPhoneId,
      instagramToken: data.instagramToken,
      systemPrompt: data.systemPrompt
    },
    create: {
      organizationId: session.organizationId,
      openaiApiKey: data.openaiApiKey,
      metaAccessToken: data.metaAccessToken,
      whatsappPhoneId: data.whatsappPhoneId,
      instagramToken: data.instagramToken,
      systemPrompt: data.systemPrompt
    }
  });

  return NextResponse.json({ settings });
}
