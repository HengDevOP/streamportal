import { NextResponse } from "next/server";
import { getPendingDonationCollection } from "@/lib/db";

export async function POST(request) {
  try {
    const { username, message, bankName } = await request.json();

    if (!bankName || !bankName.trim()) {
      return NextResponse.json({ error: "Bank name is required" }, { status: 400 });
    }

    const pendingColl = await getPendingDonationCollection();

    // Remove stale entries older than 1 hour for this streamer
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    await pendingColl.deleteMany({
      username: (username || "").toLowerCase(),
      time: { $lt: oneHourAgo },
    });

    // Insert the new pending donation into MongoDB
    await pendingColl.insertOne({
      username: (username || "streamer").toLowerCase(),
      message: message || "",
      bankName: bankName.trim(),
      time: Date.now(),
    });

    console.log(
      `💾 Saved pending donation to MongoDB — bank: "${bankName}" | streamer: "${username}" | msg: "${message}"`
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
