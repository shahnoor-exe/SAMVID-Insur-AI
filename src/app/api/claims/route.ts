import { NextResponse } from "next/server";

const claims = [
  { id: "CLM-2031", status: "processing", payout_amount: 900 },
  { id: "CLM-1982", status: "approved", payout_amount: 1500 },
  { id: "CLM-1957", status: "paid", payout_amount: 900 },
];

export async function GET() {
  return NextResponse.json({ data: claims });
}
