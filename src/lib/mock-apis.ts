import { TRIGGER_THRESHOLDS, ZONE_RISK_SCORES } from "./constants";
import type {
  AQIData,
  CivicAlert,
  IMDForecast,
  PlatformName,
  PlatformStatus,
  UPIPayoutResult,
  WeatherData,
} from "./types";

const CITY_BY_PINCODE: Record<string, string> = {
  "400001": "Mumbai",
  "110001": "Delhi",
  "560001": "Bengaluru",
  "600001": "Chennai",
  "411001": "Pune",
};

function randomInRange(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function cityForPincode(pincode: string): string {
  return CITY_BY_PINCODE[pincode] ?? ZONE_RISK_SCORES[pincode]?.city ?? "Mumbai";
}

/**
 * Returns mock weather data with realistic India metro variations.
 */
export async function getWeatherData(pincode: string): Promise<WeatherData> {
  const city = cityForPincode(pincode);
  const disruption = Math.random() < 0.3;

  const baselineByCity: Record<string, { temp: [number, number]; rain: [number, number] }> = {
    Mumbai: { temp: [27, 35], rain: [0, 110] },
    Delhi: { temp: [15, 46], rain: [0, 65] },
    Bengaluru: { temp: [18, 33], rain: [0, 72] },
    Chennai: { temp: [25, 41], rain: [0, 95] },
    Pune: { temp: [18, 36], rain: [0, 80] },
  };

  const base = baselineByCity[city] ?? baselineByCity.Mumbai;
  const rainfall = randomInRange(base.rain[0], base.rain[1]);
  const temperature = randomInRange(base.temp[0], base.temp[1]);

  const disruptionType = disruption
    ? rainfall >= TRIGGER_THRESHOLDS.rain
      ? "heavy_rain"
      : temperature >= TRIGGER_THRESHOLDS.heat
        ? "heatwave"
        : "local_flooding"
    : null;

  return {
    pincode,
    city,
    temperature_celsius: temperature,
    rainfall_mm: rainfall,
    weather_condition: pick(["Clear", "Cloudy", "Thunderstorm", "Rain", "Haze"]),
    timestamp: new Date().toISOString(),
    is_disruption: disruption,
    disruption_type: disruptionType,
  };
}

/**
 * Returns mock AQI data with CPCB-style category mapping.
 */
export async function getAQIData(pincode: string): Promise<AQIData> {
  const city = cityForPincode(pincode);
  const aqi = Math.round(randomInRange(38, 390));

  let category: AQIData["aqi_category"] = "Good";
  if (aqi > 300) category = "Severe";
  else if (aqi > 200) category = "Very Poor";
  else if (aqi > 100) category = "Poor";
  else if (aqi > 50) category = "Moderate";

  return {
    pincode,
    city,
    aqi_value: aqi,
    aqi_category: category,
    pm25: Math.round(aqi * randomInRange(0.35, 0.65)),
    pm10: Math.round(aqi * randomInRange(0.55, 0.95)),
    timestamp: new Date().toISOString(),
    is_hazardous: aqi >= TRIGGER_THRESHOLDS.AQI,
  };
}

/**
 * Simulates Swiggy/Zomato platform status with occasional downtime.
 */
export async function checkPlatformStatus(platform: PlatformName): Promise<PlatformStatus> {
  const downtime = Math.random() < 0.1;
  const degraded = !downtime && Math.random() < 0.18;

  return {
    platform,
    status: downtime ? "down" : degraded ? "degraded" : "online",
    downtime_minutes: downtime ? Math.round(randomInRange(15, 120)) : degraded ? Math.round(randomInRange(5, 28)) : 0,
    affected_zones: downtime || degraded ? ["Mumbai-Central", "Delhi-North", "Bengaluru-East"] : [],
    timestamp: new Date().toISOString(),
  };
}

/**
 * Returns civic disruption alerts for strike/curfew conditions.
 */
export async function getCivicAlerts(pincode: string): Promise<CivicAlert> {
  const city = cityForPincode(pincode);
  const roll = Math.random();

  const alertType: CivicAlert["alert_type"] = roll < 0.08 ? "curfew" : roll < 0.18 ? "strike" : "none";
  const severity: CivicAlert["severity"] =
    alertType === "curfew" ? "high" : alertType === "strike" ? pick(["medium", "high"]) : "low";

  return {
    pincode,
    city,
    alert_type: alertType,
    severity,
    affected_hours: alertType === "none" ? 0 : Math.round(randomInRange(3, 16)),
    timestamp: new Date().toISOString(),
    is_active: alertType !== "none",
  };
}

/**
 * Returns 24h IMD-style forecast with advisory output.
 */
export async function getIMDForecast(pincode: string): Promise<IMDForecast> {
  const city = cityForPincode(pincode);
  const rainProb = Math.round(randomInRange(8, 95));
  const heatMax = Math.round(randomInRange(27, 45));
  const aqiForecast = Math.round(randomInRange(65, 360));

  const alertLevel: IMDForecast["alert_level"] =
    rainProb > 80 || heatMax > 43 || aqiForecast > 320
      ? "red"
      : rainProb > 60 || heatMax > 41 || aqiForecast > 260
        ? "orange"
        : rainProb > 35 || aqiForecast > 180
          ? "yellow"
          : "green";

  const advisoryByLevel: Record<IMDForecast["alert_level"], string> = {
    green: `Normal delivery operations expected in ${city}.`,
    yellow: `Plan shorter delivery routes and hydration breaks in ${city}.`,
    orange: `Avoid low-lying zones and limit peak-hour exposure in ${city}.`,
    red: `Pause non-essential trips in high-risk pockets of ${city}.`,
  };

  return {
    pincode,
    forecast_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    max_temp: heatMax,
    min_temp: Math.max(15, heatMax - Math.round(randomInRange(6, 12))),
    rainfall_probability: rainProb,
    aqi_forecast: aqiForecast,
    alert_level: alertLevel,
    advisory: advisoryByLevel[alertLevel],
  };
}

/**
 * Simulates UPI payout transfer status for approved claims.
 */
export async function simulateUPIPayout(worker_id: string, amount: number): Promise<UPIPayoutResult> {
  const roll = Math.random();
  const status: UPIPayoutResult["status"] = roll < 0.82 ? "success" : roll < 0.94 ? "pending" : "failed";

  return {
    transaction_id: `SAMVID-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    worker_id,
    amount,
    upi_id: `${worker_id.toLowerCase()}@okbank`,
    status,
    timestamp: new Date().toISOString(),
    message:
      status === "success"
        ? "Payout credited to worker wallet."
        : status === "pending"
          ? "Payout queued with PSP partner."
          : "Payout failed due to PSP timeout. Retry initiated.",
  };
}
