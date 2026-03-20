import { NextResponse } from "next/server";

import { calculateWeeklyPremium, getZoneRiskScore } from "@/lib/premium-engine";

export async function GET() {
  const input = {
    pincode: "400001",
    city: "Mumbai",
    platform: "swiggy",
    avg_daily_earning: 780,
    active_days_per_week: 6,
    historical_disruption_days: 4,
    current_season: "monsoon" as const,
    zone_risk_score: getZoneRiskScore("400001"),
  };

  const result = calculateWeeklyPremium(input);

  return NextResponse.json({ data: result });
}
