import type { Claim, ClaimInput, FraudAnalysis, FraudFlag, FraudFlagType } from "./types";

type Coordinates = { lat: number; lng: number };

const PINCODE_COORDINATES: Record<string, Coordinates> = {
  "400001": { lat: 18.9388, lng: 72.8354 },
  "110001": { lat: 28.6304, lng: 77.2177 },
  "560001": { lat: 12.9716, lng: 77.5946 },
  "600001": { lat: 13.0843, lng: 80.2705 },
  "411001": { lat: 18.5204, lng: 73.8567 },
  "500001": { lat: 17.385, lng: 78.4867 },
  "700001": { lat: 22.5726, lng: 88.3639 },
  "380001": { lat: 23.0225, lng: 72.5714 },
  "302001": { lat: 26.9124, lng: 75.7873 },
  "682001": { lat: 9.9312, lng: 76.2673 },
  "695001": { lat: 8.5241, lng: 76.9366 },
  "226001": { lat: 26.8467, lng: 80.9462 },
  "462001": { lat: 23.2599, lng: 77.4126 },
  "160017": { lat: 30.7333, lng: 76.7794 },
  "452001": { lat: 22.7196, lng: 75.8577 },
  "395003": { lat: 21.1702, lng: 72.8311 },
  "440001": { lat: 21.1458, lng: 79.0882 },
  "781001": { lat: 26.1445, lng: 91.7362 },
  "248001": { lat: 30.3165, lng: 78.0322 },
  "641001": { lat: 11.0168, lng: 76.9558 },
};

const toRad = (deg: number) => (deg * Math.PI) / 180;

function distanceKm(coordsA: Coordinates, coordsB: Coordinates): number {
  const R = 6371; // Earth radius in km
  const dLat = toRad(coordsB.lat - coordsA.lat);
  const dLon = toRad(coordsB.lng - coordsA.lng);
  const lat1 = toRad(coordsA.lat);
  const lat2 = toRad(coordsB.lat);

  const a = Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getPincodeCoordinates(pincode: string): Coordinates {
  return PINCODE_COORDINATES[pincode] ?? { lat: 19.076, lng: 72.8777 }; // default to Mumbai
}

function addFlag(flags: FraudFlag[], type: FraudFlagType, score: number, detail: string) {
  flags.push({ type, score, detail });
}

function withinSameWeek(tsA: string, tsB: string): boolean {
  const a = new Date(tsA);
  const b = new Date(tsB);
  const diffDays = Math.abs((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
}

/**
 * Simulated Isolation Forest-style fraud analysis for parametric claims.
 */
export function analyzeFraud(claim: ClaimInput): FraudAnalysis {
  const flags: FraudFlag[] = [];

  const workerCoords = { lat: claim.worker_gps_lat, lng: claim.worker_gps_lng };
  const claimedCoords = getPincodeCoordinates(claim.claimed_pincode);
  const distance = distanceKm(workerCoords, claimedCoords);

  if (distance > 5) {
    addFlag(flags, "GPS_MISMATCH", 40, `GPS ${distance.toFixed(1)}km away from claimed pincode ${claim.claimed_pincode}`);
  }

  if (claim.claim_history.length > 8) {
    addFlag(flags, "SERIAL_CLAIMER", 30, `Filed ${claim.claim_history.length} claims in last 12 weeks`);
  }

  if (!claim.zone_disruption_confirmed && claim.total_workers_claiming_same_zone < 5) {
    addFlag(flags, "ZONE_NOT_CONFIRMED", 25, "Zone disruption not peer-confirmed (under 5 workers)");
  }

  const duplicateWeek = claim.claim_history.some(
    (h: Claim) => h.trigger_type === claim.trigger_type && withinSameWeek(h.trigger_timestamp, claim.trigger_timestamp),
  );
  if (duplicateWeek) {
    addFlag(flags, "DUPLICATE_CLAIM", 50, "Duplicate trigger claimed within same week");
  }

  if (
    typeof claim.trigger_actual_value === "number" &&
    typeof claim.trigger_threshold === "number" &&
    Math.abs(claim.trigger_actual_value - claim.trigger_threshold) / claim.trigger_threshold <= 0.02
  ) {
    addFlag(flags, "THRESHOLD_GAMING", 20, "Claimed value within 2% of threshold");
  }

  const triggerHour = new Date(claim.trigger_timestamp).getHours();
  const peakHours = triggerHour >= 19 && triggerHour <= 22;
  if (claim.trigger_type.includes("platform") && !peakHours) {
    addFlag(flags, "OFF_HOURS_CLAIM", 35, "Platform downtime claim outside 7-10PM peak hours");
  }

  const fraud_score = Math.min(100, flags.reduce((sum, f) => sum + f.score, 5));

  let risk_level: FraudAnalysis["risk_level"] = "low";
  if (fraud_score >= 76) risk_level = "critical";
  else if (fraud_score >= 51) risk_level = "high";
  else if (fraud_score >= 26) risk_level = "medium";

  const is_approved = risk_level === "low" || risk_level === "medium";
  const recommendation =
    risk_level === "critical"
      ? "Reject and enable appeal"
      : risk_level === "high"
        ? "Manual review"
        : risk_level === "medium"
          ? "Approve with flag"
          : "Auto-approve";

  return {
    fraud_score,
    risk_level,
    is_approved,
    flags,
    evidence: flags.map((f) => f.detail),
    recommendation,
    appeal_available: risk_level === "critical" || risk_level === "high",
  };
}

/**
 * Returns a worker-friendly explanation for surfaced fraud flags.
 */
export function generateExplainableReason(analysis: FraudAnalysis): string {
  if (!analysis.flags.length) return "Your claim is clean and auto-approved.";

  const bullets = analysis.flags.map((flag) => `- ${flag.detail}`);
  return [`We reviewed your claim and noticed:`, ...bullets, `Outcome: ${analysis.recommendation}.`].join("\n");
}
