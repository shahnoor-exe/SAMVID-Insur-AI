import { NextResponse } from "next/server";

import { analyzeFraud, generateExplainableReason } from "@/lib/fraud-engine";
import type { Claim } from "@/lib/types";

export async function GET() {
  const historicalClaims: Claim[] = [
    {
      id: "CLM-2001",
      worker_id: "SWG1999",
      trigger_type: "aqi",
      trigger_timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      claimed_pincode: "400001",
      platform: "swiggy",
      income_loss_hours: 8,
      payout_amount: 1250,
      payout_status: "approved",
      coverage_tier: "Silver",
      evidence: ["AQI above 320"],
      actual_value: 325,
      threshold_value: 300,
    },
    {
      id: "CLM-2002",
      worker_id: "SWG1999",
      trigger_type: "platform_downtime",
      trigger_timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      claimed_pincode: "400001",
      platform: "swiggy",
      income_loss_hours: 2,
      payout_amount: 360,
      payout_status: "approved",
      coverage_tier: "Silver",
      evidence: ["Platform down 48 mins"],
      actual_value: 48,
      threshold_value: 30,
    },
  ];

  const claimInput = {
    worker_id: "SWG1999",
    worker_gps_lat: 19.3,
    worker_gps_lng: 72.8,
    claimed_pincode: "400001",
    trigger_type: "platform_downtime",
    trigger_timestamp: new Date().toISOString(),
    claim_history: historicalClaims,
    zone_disruption_confirmed: false,
    total_workers_claiming_same_zone: 3,
    trigger_actual_value: 31,
    trigger_threshold: 30,
  };

  const fraud = analyzeFraud(claimInput);
  const explanation = generateExplainableReason(fraud);

  return NextResponse.json({ data: fraud, explanation });
}
