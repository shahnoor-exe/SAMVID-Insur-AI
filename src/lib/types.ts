export type PlatformName = "swiggy" | "zomato";

export type CoverageTierName = "Bronze" | "Silver" | "Gold";

export type Season = "summer" | "monsoon" | "winter" | "post-monsoon";

export interface Worker {
  id?: string;
  worker_id: string;
  name?: string;
  phone?: string;
  platform: PlatformName;
  zone?: string;
  pincode: string;
  city?: string;
  avg_daily_earning: number;
  coverage_tier: CoverageTierName;
  max_weekly_payout?: number;
  active_days_per_week?: number;
  historical_disruption_days?: number;
  current_season?: Season;
  created_at?: string;
}

export interface Policy {
  id: string;
  worker_id: string;
  tier: CoverageTierName;
  weekly_premium: number;
  coverage_amount: number;
  start_date: string;
  end_date: string;
  status: "active" | "inactive" | "expired";
  created_at: string;
}

export type TriggerType = "rain" | "heat" | "aqi" | "civic" | "platform_downtime";

export interface Trigger {
  id: string;
  trigger_type: TriggerType;
  zone: string;
  pincode: string;
  threshold_value: number | string;
  actual_value: number | string;
  fired_at: string;
  status: "fired" | "resolved";
}

export interface TriggerResult {
  fired: boolean;
  trigger_type: TriggerType;
  threshold: number | string;
  actual_value: number | string;
  income_loss_hours: number;
  payout_multiplier: number;
  evidence: string;
}

export interface PremiumInput {
  pincode: string;
  city: string;
  platform: string;
  avg_daily_earning: number;
  active_days_per_week: number;
  historical_disruption_days: number;
  current_season: Season;
  zone_risk_score: number;
}

export interface PremiumBreakdown {
  weather_risk: number;
  aqi_risk: number;
  social_risk: number;
  platform_risk: number;
}

export interface PremiumResult {
  weekly_premium: number;
  base_premium: number;
  risk_multiplier: number;
  coverage_tier: CoverageTierName;
  max_weekly_payout: number;
  premium_breakdown: PremiumBreakdown;
  risk_explanation: string[];
  discount_applied: number;
  valid_from: string;
  valid_until: string;
}

export interface Claim {
  id: string;
  worker_id: string;
  trigger_type: TriggerType | string;
  trigger_timestamp: string;
  claimed_pincode: string;
  platform: PlatformName;
  income_loss_hours: number;
  payout_amount: number;
  payout_status: "approved" | "pending" | "rejected" | "processing";
  coverage_tier: CoverageTierName;
  evidence: string[];
  upi_result?: UPIPayoutResult;
  actual_value?: number;
  threshold_value?: number;
}

export interface ClaimInput {
  worker_id: string;
  worker_gps_lat: number;
  worker_gps_lng: number;
  claimed_pincode: string;
  trigger_type: string;
  trigger_timestamp: string;
  claim_history: Claim[];
  zone_disruption_confirmed: boolean;
  total_workers_claiming_same_zone: number;
  trigger_actual_value?: number;
  trigger_threshold?: number;
}

export type FraudFlagType =
  | "GPS_MISMATCH"
  | "SERIAL_CLAIMER"
  | "ZONE_NOT_CONFIRMED"
  | "DUPLICATE_CLAIM"
  | "THRESHOLD_GAMING"
  | "OFF_HOURS_CLAIM";

export interface FraudFlag {
  type: FraudFlagType;
  score: number;
  detail: string;
}

export interface FraudAnalysis {
  fraud_score: number;
  risk_level: "low" | "medium" | "high" | "critical";
  is_approved: boolean;
  flags: FraudFlag[];
  evidence: string[];
  recommendation: string;
  appeal_available: boolean;
}

export interface WeatherData {
  pincode: string;
  city: string;
  temperature_celsius: number;
  rainfall_mm: number;
  weather_condition: string;
  timestamp: string;
  is_disruption: boolean;
  disruption_type: string | null;
}

export interface AQIData {
  pincode: string;
  city: string;
  aqi_value: number;
  aqi_category: "Good" | "Moderate" | "Poor" | "Very Poor" | "Severe";
  pm25: number;
  pm10: number;
  timestamp: string;
  is_hazardous: boolean;
}

export interface PlatformStatus {
  platform: PlatformName;
  status: "online" | "degraded" | "down";
  downtime_minutes: number;
  affected_zones: string[];
  timestamp: string;
}

export interface CivicAlert {
  pincode: string;
  city: string;
  alert_type: "curfew" | "strike" | "none";
  severity: "low" | "medium" | "high";
  affected_hours: number;
  timestamp: string;
  is_active: boolean;
}

export interface IMDForecast {
  pincode: string;
  forecast_date: string;
  max_temp: number;
  min_temp: number;
  rainfall_probability: number;
  aqi_forecast: number;
  alert_level: "green" | "yellow" | "orange" | "red";
  advisory: string;
}

export interface UPIPayoutResult {
  transaction_id: string;
  worker_id: string;
  amount: number;
  upi_id: string;
  status: "success" | "pending" | "failed";
  timestamp: string;
  message: string;
}
