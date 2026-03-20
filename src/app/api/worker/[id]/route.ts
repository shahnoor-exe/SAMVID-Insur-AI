import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    console.log(`[API] Fetching worker ${id}`);

    if (!id) {
      return NextResponse.json(
        { error: "Worker ID required" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // In real app: fetch from Supabase
    // Mock worker data
    const worker = {
      id,
      worker_id: "RAMESH-9087",
      platform: "Swiggy",
      pincode: 421601,
      city: "Kalyan",
      avg_daily_earning: 750,
      phone: "+91-9876543210",
      coverage_tier: "Silver",
      claims_count: 2,
      last_claim_date: "2026-03-15T10:30:00Z",
      zone_risk_score: 7.2,
      fraud_flag_count: 0,
      created_at: "2026-01-10T08:00:00Z",
    };

    console.log(`[API] Worker ${id} returned`);

    return NextResponse.json(
      { worker, success: true },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    console.error("[API] Fetch worker error:", error);
    return NextResponse.json(
      { error: "Failed to fetch worker", details: String(error) },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
};
