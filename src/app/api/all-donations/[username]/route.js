import { NextResponse } from "next/server";
import { getTransactionCollection } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { username } = await params;
    const targetUsername = username.toLowerCase();

    const transactionColl = await getTransactionCollection();
    const streamerDonations = await transactionColl.find({ streamer: targetUsername }).toArray();
    return NextResponse.json(streamerDonations);
  } catch (err) {
    console.error("Error fetching all donations:", err);
    return NextResponse.json({ error: "Database query error" }, { status: 500 });
  }
}
