import { NextResponse } from "next/server";

import { evaluateAllTriggers, initiateClaim } from "@/lib/trigger-engine";
import type { Worker } from "@/lib/types";

export async function GET() {
  const worker: Worker = {
    worker_id: "SWG1024",
    platform: "swiggy",
    pincode: "400001",
    city: "Mumbai",
    avg_daily_earning: 820,
    coverage_tier: "Silver",
    max_weekly_payout: 1500,
    active_days_per_week: 6,
  };

  const triggers = await evaluateAllTriggers(worker);
  const claim = await initiateClaim(worker, triggers);

  return NextResponse.json({ fired: triggers, claim });
}
