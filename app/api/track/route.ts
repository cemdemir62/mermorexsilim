import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST() {
  try {
    const today = new Date();
    // Format to YYYY-MM-DD in Europe/Istanbul timezone
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Istanbul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const dateStr = formatter.format(today); // YYYY-MM-DD

    const totalKey = "total_visits";
    const dailyKey = `visit_count:${dateStr}`;

    // Read and increment total visits
    const totalRecord = await prisma.setting.findUnique({
      where: { key: totalKey },
    });
    const newTotal = (parseInt(totalRecord?.value || "0", 10) + 1).toString();
    await prisma.setting.upsert({
      where: { key: totalKey },
      update: { value: newTotal },
      create: { key: totalKey, value: "1" },
    });

    // Read and increment daily visits
    const dailyRecord = await prisma.setting.findUnique({
      where: { key: dailyKey },
    });
    const newDaily = (parseInt(dailyRecord?.value || "0", 10) + 1).toString();
    await prisma.setting.upsert({
      where: { key: dailyKey },
      update: { value: newDaily },
      create: { key: dailyKey, value: "1" },
    });

    return NextResponse.json({ success: true, total: newTotal, daily: newDaily });
  } catch (error) {
    console.error("Tracking API Error:", error);
    return NextResponse.json({ error: "Failed to track visit" }, { status: 500 });
  }
}
