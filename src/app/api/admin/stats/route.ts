import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    console.log("[API] Admin stats request");

    // Mock admin statistics
    const stats = {
      overview: {
        total_workers: 1247,
        total_policies_active: 1089,
        total_claims_filed: 342,
        total_claims_approved: 298,
        total_claims_rejected: 44,
        total_payouts_issued: "₹82,50,000",
        avg_claim_payout: "₹27,685",
      },
      by_platform: {
        Swiggy: { workers: 520, approvals_pct: 87, avg_premium: "₹38.50" },
        Zomato: { workers: 380, approvals_pct: 85, avg_premium: "₹39.20" },
        Uber: { workers: 347, approvals_pct: 89, avg_premium: "₹37.80" },
      },
      by_trigger: {
        rain: 45,
        heat: 22,
        aqi: 18,
        civic: 12,
        platform_downtime: 3,
      },
      by_tier: {
        Bronze: { workers: 450, claims_filed: 89, approval_rate: 0.82 },
        Silver: { workers: 510, claims_filed: 145, approval_rate: 0.87 },
        Gold: { workers: 287, claims_filed: 108, approval_rate: 0.91 },
      },
      top_risk_pincodes: [
        { pincode: 421601, city: "Kalyan", risk_score: 9.2, claim_count: 45 },
        { pincode: 400001, city: "Mumbai", risk_score: 8.8, claim_count: 38 },
        { pincode: 560001, city: "Bangalore", risk_score: 8.3, claim_count: 32 },
      ],
      fraud_metrics: {
        total_flagged: 18,
        approved_despite_flag: 12,
        rejected_due_to_fraud: 6,
        most_common_flag: "SERIAL_CLAIMER",
      },
      premium_revenue: {
        total_collected: "₹2,15,80,000",
        this_month: "₹45,32,000",
        avg_monthly_trend: [
          { month: "Jan", amount: "₹38,50,000" },
          { month: "Feb", amount: "₹42,15,000" },
          { month: "Mar", amount: "₹45,32,000" },
        ],
      },
    };

    console.log("[API] Admin stats delivered");

    return NextResponse.json(
      {
        stats,
        generated_at: new Date().toISOString(),
        period: "2026-03-01 to 2026-03-20",
        success: true,
      },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    console.error("[API] Admin stats error:", error);
    return NextResponse.json(
      { error: "Failed to generate stats", details: String(error) },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
};
