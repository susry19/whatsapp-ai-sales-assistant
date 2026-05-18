import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { login } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { name, email, password, companyName } = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const organization = await prisma.organization.create({
      data: {
        name: companyName,
        subscription: {
          create: { plan: "STARTER", status: "TRIAL" }
        },
        settings: {
          create: { systemPrompt: "You are a professional sales and customer support assistant. Use only the uploaded product information to answer customer questions." }
        }
      }
    });

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        role: "ADMIN",
        organizationId: organization.id
      }
    });

    await login(user.id, organization.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
