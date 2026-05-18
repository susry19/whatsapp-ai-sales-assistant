import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const conversations = await prisma.conversation.findMany({
    where: { organizationId: session.organizationId },
    include: {
      customer: true,
      messages: { orderBy: { createdAt: 'desc' }, take: 1 }
    },
    orderBy: { updatedAt: 'desc' }
  });

  return NextResponse.json({ conversations });
}
