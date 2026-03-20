import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ worker_id: string }> }
) => {
  try {
    const { worker_id } = await params;
    console.log(`[API] Fetching claims for worker ${worker_id}`);

    if (!worker_id) {
      return NextResponse.json(
        { error: "Worker ID required" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // In real app: fetch from Supabase
    // Mock claims data
    const claims = [
      {
        claim_id: "CLM-001",
        worker_id,
        policy_number: "SAMVID-2026-ABC123",
        triggered_by: "rain",
        trigger_value: 65.5,
        claim_amount: 12500,
        status: "approved",
        filed_date: "2026-03-15T10:30:00Z",
        approved_date: "2026-03-15T14:45:00Z",
        payout_date: "2026-03-16T09:00:00Z",
      },
      {
        claim_id: "CLM-002",
        worker_id,
        policy_number: "SAMVID-2026-ABC123",
        triggered_by: "heat",
        trigger_value: 44.8,
        claim_amount: 8750,
        status: "approved",
        filed_date: "2026-03-10T14:20:00Z",
        approved_date: "2026-03-10T16:00:00Z",
        payout_date: "2026-03-11T08:30:00Z",
      },
    ];

    console.log(`[API] Found ${claims.length} claims for worker ${worker_id}`);

    return NextResponse.json(
      { claims, total_claims: claims.length, success: true },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    console.error("[API] Fetch claims error:", error);
    return NextResponse.json(
      { error: "Failed to fetch claims", details: String(error) },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
};
