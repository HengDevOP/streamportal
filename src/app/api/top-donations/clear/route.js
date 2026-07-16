import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getTransactionCollection } from "@/lib/db";

export async function POST() {
  const username = await getSession();
  if (!username) {
    return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
  }

  try {
    const transactionColl = await getTransactionCollection();
    await transactionColl.deleteMany({ streamer: username });
    return NextResponse.json({ success: true, message: "All transactions and top donations cleared." });
  } catch (err) {
    console.error("Error clearing transactions:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
