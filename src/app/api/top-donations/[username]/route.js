import { NextResponse } from "next/server";
import { getTransactionCollection } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { username } = await params;
    const targetUsername = username.toLowerCase();

    const transactionColl = await getTransactionCollection();
    const top3 = await transactionColl
      .find({ streamer: targetUsername })
      .sort({ amountUSD: -1 })
      .limit(3)
      .toArray();

    return NextResponse.json(top3);
  } catch (err) {
    console.error("Error fetching top donations:", err);
    return NextResponse.json({ error: "Database query error" }, { status: 500 });
  }
}
