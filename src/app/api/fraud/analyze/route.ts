import { NextResponse } from "next/server";
import { analyzeFraud, generateExplainableReason } from "@/lib/fraud-engine";

export const POST = async (req: Request) => {
  try {
    console.log("[API] Fraud analysis request");

    const body = await req.json();
    const { worker_id, claim_amount, location_gps, claim_frequency, time_of_claim } = body;

    if (!worker_id || claim_amount === undefined) {
      return NextResponse.json(
        { error: "Missing worker_id or claim_amount" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Run fraud engine with proper ClaimInput structure
    const fraudAnalysis = analyzeFraud({
      worker_id,
      worker_gps_lat: location_gps?.latitude || 19.2183,
      worker_gps_lng: location_gps?.longitude || 72.9781,
      claimed_pincode: "421601",
      trigger_type: "rain",
      trigger_timestamp: time_of_claim || new Date().toISOString(),
      claim_history: [],
      zone_disruption_confirmed: true,
      total_workers_claiming_same_zone: claim_frequency || 2,
    });

    // Generate explanation
    const explanation = generateExplainableReason(fraudAnalysis);

    console.log(
      `[API] Fraud analysis: ${fraudAnalysis.risk_level} (score: ${fraudAnalysis.fraud_score})`
    );

    return NextResponse.json(
      {
        worker_id,
        fraud_analysis: {
          fraud_score: fraudAnalysis.fraud_score,
          risk_level: fraudAnalysis.risk_level,
          is_approved: fraudAnalysis.is_approved,
          flags: fraudAnalysis.flags.map((f) => ({
            type: f.type,
            score: f.score,
            detail: f.detail,
          })),
          recommendation: fraudAnalysis.recommendation,
        },
        explanation,
        analysis_time: new Date().toISOString(),
        success: true,
      },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    console.error("[API] Fraud analysis error:", error);
    return NextResponse.json(
      { error: "Fraud analysis failed", details: String(error) },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
};
