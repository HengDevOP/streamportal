import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET() {
  const username = await getSession();
  if (username) {
    return NextResponse.json({ authenticated: true, username });
  }
  return NextResponse.json({ authenticated: false });
}
