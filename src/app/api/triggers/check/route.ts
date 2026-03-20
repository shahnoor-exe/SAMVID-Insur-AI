import { NextResponse } from "next/server";
import { evaluateAllTriggers } from "@/lib/trigger-engine";

export const POST = async (req: Request) => {
  try {
    console.log("[API] Trigger evaluation request");

    const body = await req.json();
    const { worker_id, policy_number, pincode, datetime } = body;

    if (!worker_id || !policy_number) {
      return NextResponse.json(
        { error: "Missing worker_id or policy_number" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Evaluate all 5 triggers
    const triggers = await evaluateAllTriggers({ 
      worker_id,
      platform: "swiggy",
      pincode,
      avg_daily_earning: 700,
      coverage_tier: "Silver",
    });

    // Check if any triggered
    const anyTriggered = triggers.some((t) => t.fired);

    console.log(`[API] Trigger evaluation complete: ${anyTriggered ? "TRIGGERED" : "NO TRIGGER"}`);

    return NextResponse.json(
      {
        worker_id,
        policy_number,
        triggers: triggers.map((t) => ({
          type: t.trigger_type,
          fired: t.fired,
          value: t.actual_value,
          threshold: t.threshold,
        })),
        any_triggered: anyTriggered,
        evaluation_time: new Date().toISOString(),
        success: true,
      },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    console.error("[API] Trigger evaluation error:", error);
    return NextResponse.json(
      { error: "Trigger evaluation failed", details: String(error) },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
};
