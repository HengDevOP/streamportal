import { NextResponse } from "next/server";
import { pendingDonations } from "@/lib/telegramManager";

export async function POST(request) {
  try {
    const { username, message, bankName } = await request.json();

    if (!bankName || !bankName.trim()) {
      return NextResponse.json({ error: "Bank name is required" }, { status: 400 });
    }

    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const kept = pendingDonations.filter((p) => p.time > oneHourAgo);
    pendingDonations.length = 0;
    pendingDonations.push(...kept);

    pendingDonations.push({
      username: (username || "streamer").toLowerCase(),
      message: message || "",
      bankName: bankName.trim(),
      time: Date.now(),
    });

    console.log(
      `Saved pending donation from bank: "${bankName}" for streamer: "${username}" with msg: "${message}"`
    );

    return NextResponse.json({
      success: true,
      message: "Donation message submitted. Waiting for transaction...",
    });
  } catch (err) {
    console.error("Donate submission error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
