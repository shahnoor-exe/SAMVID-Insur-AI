import { NextResponse } from "next/server";
import { calculateWeeklyPremium, getZoneRiskScore } from "@/lib/premium-engine";
import type { Season } from "@/lib/types";

export const POST = async (req: Request) => {
  try {
    console.log("[API] Worker registration request received");

    const body = await req.json();
    const { worker_id, platform, pincode, city, avg_daily_earning, phone } = body;

    // Validate required fields
    if (!worker_id || !platform || !pincode || !avg_daily_earning) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Infer coverage tier from earnings
    let coverage_tier = "Bronze";
    if (avg_daily_earning > 850) coverage_tier = "Gold";
    else if (avg_daily_earning > 500) coverage_tier = "Silver";

    console.log(`[API] Tier inferred for ₹${avg_daily_earning}/day: ${coverage_tier}`);

    // Calculate premium
    const zoneRisk = getZoneRiskScore(pincode);
    const premiumResult = calculateWeeklyPremium({
      pincode,
      city,
      platform,
      avg_daily_earning,
      active_days_per_week: 5,
      historical_disruption_days: 3,
      current_season: "monsoon" as Season,
      zone_risk_score: zoneRisk,
    });

    console.log(`[API] Premium calculated: ₹${premiumResult.weekly_premium}`);

    // In real app: save to Supabase
    const worker = {
      id: `WKR-${Date.now()}`,
      worker_id,
      platform,
      pincode,
      city,
      avg_daily_earning,
      phone,
      coverage_tier,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json(
      { worker, premium_result: premiumResult, success: true },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    console.error("[API] Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed", details: String(error) },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
};
