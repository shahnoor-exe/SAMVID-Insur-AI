import { COVERAGE_TIERS, TRIGGER_THRESHOLDS } from "./constants";
import { checkPlatformStatus, getAQIData, getCivicAlerts, getWeatherData, simulateUPIPayout } from "./mock-apis";
import type { Claim, TriggerResult, Worker } from "./types";

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

const isPeakHours = () => {
  const hour = new Date().getHours();
  return hour >= 19 && hour <= 22;
};

export async function checkRainTrigger(pincode: string): Promise<TriggerResult> {
  console.log(`[trigger] Checking rain for ${pincode}`);
  await delay();
  const weather = await getWeatherData(pincode);
  const fired = weather.rainfall_mm > TRIGGER_THRESHOLDS.rain;

  return {
    fired,
    trigger_type: "rain",
    threshold: TRIGGER_THRESHOLDS.rain,
    actual_value: weather.rainfall_mm,
    income_loss_hours: fired ? 8 : 0,
    payout_multiplier: fired ? 1 : 0,
    evidence: fired
      ? `Rainfall ${weather.rainfall_mm}mm in ${weather.city}`
      : `Rainfall ${weather.rainfall_mm}mm below ${TRIGGER_THRESHOLDS.rain}mm threshold`,
  };
}

export async function checkHeatTrigger(pincode: string): Promise<TriggerResult> {
  console.log(`[trigger] Checking heat for ${pincode}`);
  await delay();
  const weather = await getWeatherData(pincode);
  const fired = weather.temperature_celsius > TRIGGER_THRESHOLDS.heat;

  return {
    fired,
    trigger_type: "heat",
    threshold: TRIGGER_THRESHOLDS.heat,
    actual_value: weather.temperature_celsius,
    income_loss_hours: fired ? 4 : 0,
    payout_multiplier: fired ? 0.8 : 0,
    evidence: fired
      ? `Heatwave ${weather.temperature_celsius}°C in ${weather.city}`
      : `Temperature ${weather.temperature_celsius}°C below ${TRIGGER_THRESHOLDS.heat}°C threshold`,
  };
}

export async function checkAQITrigger(pincode: string): Promise<TriggerResult> {
  console.log(`[trigger] Checking AQI for ${pincode}`);
  await delay();
  const aqi = await getAQIData(pincode);
  const fired = aqi.aqi_value > TRIGGER_THRESHOLDS.AQI;

  return {
    fired,
    trigger_type: "aqi",
    threshold: TRIGGER_THRESHOLDS.AQI,
    actual_value: aqi.aqi_value,
    income_loss_hours: fired ? 8 : 0,
    payout_multiplier: fired ? 1 : 0,
    evidence: fired
      ? `AQI ${aqi.aqi_value} (${aqi.aqi_category}) in ${aqi.city}`
      : `AQI ${aqi.aqi_value} below severe threshold`,
  };
}

export async function checkCivicTrigger(pincode: string): Promise<TriggerResult> {
  console.log(`[trigger] Checking civic alerts for ${pincode}`);
  await delay();
  const civic = await getCivicAlerts(pincode);
  const fired = civic.is_active && civic.alert_type !== "none";

  return {
    fired,
    trigger_type: "civic",
    threshold: `active ${civic.alert_type}`,
    actual_value: civic.affected_hours,
    income_loss_hours: fired ? civic.affected_hours : 0,
    payout_multiplier: fired ? 1 : 0,
    evidence: fired
      ? `${civic.alert_type} alert (${civic.severity}) for ${civic.affected_hours}h in ${civic.city}`
      : `No active civic alerts in ${civic.city}`,
  };
}

export async function checkPlatformDowntimeTrigger(platform: string): Promise<TriggerResult> {
  console.log(`[trigger] Checking platform downtime for ${platform}`);
  await delay();
  const status = await checkPlatformStatus(platform as Worker["platform"]);
  const peak = isPeakHours();
  const fired = status.status === "down" && status.downtime_minutes > TRIGGER_THRESHOLDS.downtime_minutes && peak;
  const income_loss_hours = fired ? Math.max(0.5, Math.min(3, status.downtime_minutes / 60)) : 0;

  return {
    fired,
    trigger_type: "platform_downtime",
    threshold: `${TRIGGER_THRESHOLDS.downtime_minutes} minutes during 7-10PM`,
    actual_value: status.downtime_minutes,
    income_loss_hours,
    payout_multiplier: fired ? 0.75 : 0,
    evidence: fired
      ? `${platform} down ${status.downtime_minutes} mins in peak hours`
      : `${platform} status ${status.status} (${status.downtime_minutes} mins)` + (peak ? "" : " outside peak hours"),
  };
}

export async function evaluateAllTriggers(workerData: Worker): Promise<TriggerResult[]> {
  console.log(`[trigger] Evaluating triggers for worker ${workerData.worker_id}`);
  const [rain, heat, aqi, civic, platform] = await Promise.all([
    checkRainTrigger(workerData.pincode),
    checkHeatTrigger(workerData.pincode),
    checkAQITrigger(workerData.pincode),
    checkCivicTrigger(workerData.pincode),
    checkPlatformDowntimeTrigger(workerData.platform),
  ]);

  const fired = [rain, heat, aqi, civic, platform].filter((trigger) => trigger.fired);
  console.log(`[trigger] Fired triggers: ${fired.map((t) => t.trigger_type).join(", ") || "none"}`);
  return fired;
}

export function calculatePayout(trigger: TriggerResult, worker: Worker): number {
  const hourly = worker.avg_daily_earning / 8;
  const gross = hourly * trigger.income_loss_hours * (trigger.payout_multiplier || 1);
  const cap = worker.max_weekly_payout ?? COVERAGE_TIERS[worker.coverage_tier].payoutAmount;
  const payout = Math.min(cap, gross);

  console.log(
    `[trigger] Calculated payout for ${worker.worker_id} on ${trigger.trigger_type}: ₹${payout.toFixed(2)} (cap ₹${cap})`,
  );

  return Number(payout.toFixed(2));
}

export async function initiateClaim(worker: Worker, triggers: TriggerResult[]): Promise<Claim> {
  const firedTriggers = triggers.filter((t) => t.fired);
  console.log(`[trigger] Initiating claim for ${worker.worker_id} with ${firedTriggers.length} triggers`);

  const totalPayout = firedTriggers.reduce((sum, trigger) => sum + calculatePayout(trigger, worker), 0);
  const evidence = firedTriggers.map((t) => t.evidence);

  const claim: Claim = {
    id: `CLM-${Date.now()}`,
    worker_id: worker.worker_id,
    trigger_type: firedTriggers.map((t) => t.trigger_type).join("+"),
    trigger_timestamp: new Date().toISOString(),
    claimed_pincode: worker.pincode,
    platform: worker.platform,
    income_loss_hours: firedTriggers.reduce((sum, t) => sum + t.income_loss_hours, 0),
    payout_amount: Number(totalPayout.toFixed(2)),
    payout_status: "pending",
    coverage_tier: worker.coverage_tier,
    evidence,
    actual_value: firedTriggers[0]?.actual_value as number | undefined,
    threshold_value: firedTriggers[0]?.threshold as number | undefined,
  };

  if (claim.payout_amount > 0) {
    console.log(`[trigger] Simulating UPI payout for ${worker.worker_id} amount ₹${claim.payout_amount}`);
    claim.upi_result = await simulateUPIPayout(worker.worker_id, claim.payout_amount);
    claim.payout_status = claim.upi_result.status === "failed" ? "rejected" : claim.upi_result.status === "pending" ? "processing" : "approved";
  }

  return claim;
}
