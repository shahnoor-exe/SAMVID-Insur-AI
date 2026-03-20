import { NextResponse } from "next/server";
import { evaluateAllTriggers } from "@/lib/trigger-engine";

export const POST = async (req: Request) => {
  try {
    console.log("[API] Trigger simulation request");

    const body = await req.json();
    const { pincode, trigger_type_override, severity = "medium" } = body;

    if (!pincode) {
      return NextResponse.json(
        { error: "Missing pincode" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Evaluate triggers (with optional override for demo)
    let triggers = await evaluateAllTriggers({ 
      worker_id: "demo-worker",
      platform: "swiggy",
      pincode,
      avg_daily_earning: 700,
      coverage_tier: "Silver",
    });

    // If override provided, force that trigger to be true
    if (trigger_type_override) {
      triggers = triggers.map((t) =>
        t.trigger_type === trigger_type_override
          ? { ...t, fired: true, actual_value: (typeof t.threshold === 'number' ? t.threshold : 50) + 10 }
          : t
      );
    }

    const simulationResult = {
      simulation_id: `SIM-${Date.now()}`,
      pincode,
      severity,
      triggered_count: triggers.filter((t) => t.fired).length,
      triggers: triggers.map((t) => ({
        type: t.trigger_type,
        fired: t.fired,
        actual_value: t.actual_value,
        threshold: t.threshold,
        payout_if_claimed: t.fired ? `₹${Math.floor(Math.random() * 10000) + 5000}` : "₹0",
      })),
      estimated_total_payout: `₹${Math.floor(Math.random() * 50000) + 10000}`,
      recommended_action: triggers.some((t) => t.fired) ? "File claim now" : "No action needed",
      simulation_time: new Date().toISOString(),
      success: true,
    };

    console.log(`[API] Simulation result: ${simulationResult.triggered_count} triggers active`);

    return NextResponse.json(simulationResult, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    console.error("[API] Trigger simulation error:", error);
    return NextResponse.json(
      { error: "Trigger simulation failed", details: String(error) },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
};
