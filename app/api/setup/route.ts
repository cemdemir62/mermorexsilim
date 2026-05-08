import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const hashedPassword = await bcrypt.hash("marmo2024", 10);
    
    const admin = await prisma.user.upsert({
      where: { email: "admin@mermorex.com" },
      update: {},
      create: {
        email: "admin@mermorex.com",
        name: "Admin",
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "Admin user created", email: admin.email });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
