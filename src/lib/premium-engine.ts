import { COVERAGE_TIERS } from "./constants";
import type { CoverageTierName, PremiumInput, PremiumResult, Season } from "./types";

type ZoneRisk = {
  city: string;
  score: number; // 0-10 scale
};

const ZONE_RISK_LOOKUP: Record<string, ZoneRisk> = {
  // Mumbai
  "400001": { city: "Mumbai", score: 6.6 },
  "400050": { city: "Mumbai", score: 5.8 },
  // Delhi NCR
  "110001": { city: "Delhi", score: 7.2 },
  "201301": { city: "Noida", score: 6.2 },
  // Bengaluru
  "560001": { city: "Bengaluru", score: 4.9 },
  "560095": { city: "Bengaluru", score: 5.4 },
  // Chennai
  "600001": { city: "Chennai", score: 6.4 },
  // Pune
  "411001": { city: "Pune", score: 4.6 },
  // Hyderabad
  "500001": { city: "Hyderabad", score: 5.3 },
  // Kolkata
  "700001": { city: "Kolkata", score: 5.9 },
  // Ahmedabad
  "380001": { city: "Ahmedabad", score: 5.1 },
  // Jaipur
  "302001": { city: "Jaipur", score: 4.8 },
  // Lucknow
  "226001": { city: "Lucknow", score: 4.7 },
  // Kochi
  "682001": { city: "Kochi", score: 4.3 },
  // Thiruvananthapuram
  "695001": { city: "Thiruvananthapuram", score: 3.9 },
  // Bhopal
  "462001": { city: "Bhopal", score: 4.2 },
  // Chandigarh
  "160017": { city: "Chandigarh", score: 3.6 },
  // Indore
  "452001": { city: "Indore", score: 4.1 },
  // Surat
  "395003": { city: "Surat", score: 4.4 },
  // Nagpur
  "440001": { city: "Nagpur", score: 4.5 },
  // Guwahati
  "781001": { city: "Guwahati", score: 4.0 },
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function inferCoverageTier(avgDailyEarning: number): CoverageTierName {
  if (avgDailyEarning <= 500) return "Bronze";
  if (avgDailyEarning <= 850) return "Silver";
  return "Gold";
}

function basePremiumForZone(zoneScore: number): number {
  if (zoneScore < 3) return 15;
  if (zoneScore < 7) return 25;
  return 40;
}

function seasonMultiplier(season: Season): number {
  switch (season) {
    case "monsoon":
      return 1.4;
    case "summer":
      return 1.2;
    case "winter":
      return 0.9;
    case "post-monsoon":
    default:
      return 1;
  }
}

function disruptionMultiplier(historicalDays: number): number {
  const normalized = clamp(historicalDays / 30, 0, 1);
  return 1 + normalized * 0.35;
}

function deriveRiskMultiplier(zoneScore: number, season: Season, historicalDays: number): number {
  const base = clamp(0.8 + (zoneScore / 10) * 0.7, 0.8, 1.5);
  const seasonal = seasonMultiplier(season);
  const disruption = disruptionMultiplier(historicalDays);
  const combined = base * seasonal * disruption;
  return clamp(Number(combined.toFixed(3)), 0.8, 1.5);
}

function buildRiskReasons(input: PremiumInput, zoneScore: number, multiplier: number): string[] {
  const reasons: Array<{ reason: string; weight: number }> = [];

  reasons.push({ reason: `Zone risk at ${zoneScore.toFixed(1)} on 0-10 scale`, weight: zoneScore });
  reasons.push({ reason: `${input.current_season} season adjustment`, weight: seasonMultiplier(input.current_season) });
  reasons.push({ reason: `${input.historical_disruption_days} disruption days in last 30`, weight: input.historical_disruption_days });

  if (input.active_days_per_week >= 6) {
    reasons.push({ reason: "High activity (6-7 days/week) increases exposure", weight: 1.1 });
  }

  return reasons
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map((r) => r.reason)
    .concat([`Composite risk multiplier applied: ${multiplier.toFixed(2)}x`]);
}

export function getZoneRiskScore(pincode: string): number {
  const lookup = ZONE_RISK_LOOKUP[pincode];
  return lookup ? lookup.score : 5;
}

export function calculateWeeklyPremium(input: PremiumInput): PremiumResult {
  const zoneScore = input.zone_risk_score || getZoneRiskScore(input.pincode);
  const base_premium = basePremiumForZone(zoneScore);
  const coverage_tier = inferCoverageTier(input.avg_daily_earning);
  const risk_multiplier = deriveRiskMultiplier(zoneScore, input.current_season, input.historical_disruption_days);

  const rawPremium = base_premium * risk_multiplier;
  const discount_applied = zoneScore < 3 ? 2 : 0;
  const weekly_premium = clamp(Number((rawPremium - discount_applied).toFixed(2)), 0, 55);
  const max_weekly_payout = COVERAGE_TIERS[coverage_tier].payoutAmount;

  const seasonFactor = seasonMultiplier(input.current_season);
  const weather_risk = Number((base_premium * Math.max(seasonFactor - 1, 0)).toFixed(2));
  const aqi_risk = Number((base_premium * (zoneScore / 10) * 0.25).toFixed(2));
  const social_risk = Number((base_premium * (input.historical_disruption_days / 30) * 0.35).toFixed(2));
  const platform_risk = Number((base_premium * (input.active_days_per_week / 7) * 0.15).toFixed(2));

  const risk_explanation = buildRiskReasons(input, zoneScore, risk_multiplier);

  const now = new Date();
  const valid_from = now.toISOString();
  const valid_until = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();

  return {
    weekly_premium,
    base_premium: Number(base_premium.toFixed(2)),
    risk_multiplier,
    coverage_tier,
    max_weekly_payout,
    premium_breakdown: {
      weather_risk,
      aqi_risk,
      social_risk,
      platform_risk,
    },
    risk_explanation,
    discount_applied,
    valid_from,
    valid_until,
  };
}
