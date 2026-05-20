import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  phone: z.string().min(10, "Telefon numarası en az 10 karakter olmalıdır"),
  service: z.string().min(1, "Hizmet seçimi zorunludur"),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: "Geçersiz form verisi", 
          details: validation.error.format() 
        }, 
        { status: 400 }
      );
    }

    const { name, phone, service, message } = validation.data;

    const newRequest = await prisma.contactRequest.create({
      data: {
        name,
        phone,
        service,
        message,
        status: "NEW",
      },
    });

    // Write to Activity Log
    try {
      await prisma.activityLog.create({
        data: {
          action: "Yeni İletişim Talebi",
          user: name,
          details: `Hizmet: ${service}, Tel: ${phone}`,
        },
      });
    } catch (logError) {
      console.error("Contact request activity log creation failed:", logError);
    }

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
