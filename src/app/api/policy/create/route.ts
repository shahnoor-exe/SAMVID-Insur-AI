import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    console.log("[API] Policy creation request");

    const body = await req.json();
    const { worker_id, coverage_tier, premium_amount_agreed, pincode, city } = body;

    if (!worker_id || !coverage_tier || premium_amount_agreed === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Generate policy number
    const policyNumber = `SAMVID-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // In real app: save policy to Supabase
    const policy = {
      policy_number: policyNumber,
      worker_id,
      coverage_tier,
      premium_amount_agreed,
      pincode,
      city,
      status: "activated",
      activation_date: new Date().toISOString(),
      coverage_start_date: new Date().toISOString(),
      coverage_end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
    };

    console.log(`[API] Policy ${policyNumber} created for worker ${worker_id}`);

    return NextResponse.json(
      { policy, success: true },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    console.error("[API] Policy creation error:", error);
    return NextResponse.json(
      { error: "Policy creation failed", details: String(error) },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
};
