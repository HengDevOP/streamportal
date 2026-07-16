import { NextResponse } from "next/server";
import { getTransactionCollection } from "@/lib/db";
import { lastPreviews } from "@/lib/telegramManager";

export async function GET(request, { params }) {
  try {
    const { username } = await params;
    const targetUsername = username.toLowerCase();

    const transactionColl = await getTransactionCollection();
    const latestReal = await transactionColl
      .find({ streamer: targetUsername })
      .sort({ time: -1 })
      .limit(1)
      .next() || {};

    const latestPreview = lastPreviews[targetUsername] || {};

    const realTime = latestReal.time || 0;
    const previewTime = latestPreview.time || 0;

    if (previewTime > realTime) {
      return NextResponse.json(latestPreview);
    }
    return NextResponse.json(latestReal);
  } catch (err) {
    console.error("Error fetching latest payment:", err);
    return NextResponse.json({ error: "Database query error" }, { status: 500 });
  }
}
