import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    console.log("[API] Forecast alerts request");

    const { searchParams } = new URL(req.url);
    const pincode = searchParams.get("pincode");
    const days_ahead = parseInt(searchParams.get("days_ahead") || "7", 10);

    if (!pincode) {
      return NextResponse.json(
        { error: "Missing pincode parameter" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Mock forecast data
    const forecastAlerts = [
      {
        alert_id: "ALERT-001",
        pincode,
        trigger_type: "rain",
        trigger_value_forecast: 72,
        threshold: 50,
        probability: 0.85,
        severity: "high",
        forecast_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        estimated_payout: "₹12000",
        action: "Monitor closely",
      },
      {
        alert_id: "ALERT-002",
        pincode,
        trigger_type: "heat",
        trigger_value_forecast: 43.5,
        threshold: 44,
        probability: 0.45,
        severity: "medium",
        forecast_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        estimated_payout: "₹8000",
        action: "Monitor",
      },
      {
        alert_id: "ALERT-003",
        pincode,
        trigger_type: "aqi",
        trigger_value_forecast: 320,
        threshold: 300,
        probability: 0.65,
        severity: "medium",
        forecast_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        estimated_payout: "₹9500",
        action: "Monitor",
      },
    ];

    const high_risk_alerts = forecastAlerts.filter((a) => a.severity === "high");

    console.log(`[API] Forecast returned ${forecastAlerts.length} alerts for pincode ${pincode}`);

    return NextResponse.json(
      {
        pincode,
        days_ahead,
        alerts: forecastAlerts,
        high_risk_count: high_risk_alerts.length,
        overall_risk_level: high_risk_alerts.length > 0 ? "high" : "medium",
        forecast_generated_at: new Date().toISOString(),
        success: true,
      },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    console.error("[API] Forecast error:", error);
    return NextResponse.json(
      { error: "Forecast generation failed", details: String(error) },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
};
