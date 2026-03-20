import { NextResponse } from "next/server";
import { calculateWeeklyPremium } from "@/lib/premium-engine";
import type { Season } from "@/lib/types";

export const POST = async (req: Request) => {
  try {
    console.log("[API] Premium calculation request");

    const body = await req.json();
    const {
      pincode,
      city,
      platform,
      avg_daily_earning,
      active_days_per_week = 5,
      historical_disruption_days = 0,
      current_season = "monsoon",
      zone_risk_score = 5,
    } = body;

    if (!pincode || !avg_daily_earning) {
      return NextResponse.json(
        { error: "Missing pincode or earnings" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const result = calculateWeeklyPremium({
      pincode,
      city: city || "Mumbai",
      platform,
      avg_daily_earning,
      active_days_per_week,
      historical_disruption_days,
      current_season: current_season as Season,
      zone_risk_score,
    });

    console.log(`[API] Premium calculated: ₹${result.weekly_premium}`);

    return NextResponse.json(
      { premium_result: result, success: true },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    console.error("[API] Premium calculation error:", error);
    return NextResponse.json(
      { error: "Premium calculation failed", details: String(error) },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
};
