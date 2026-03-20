import { CoverageTierName, PlatformName } from "./types";

export const TRIGGER_THRESHOLDS = {
  rain: 50,
  heat: 44,
  AQI: 300,
  downtime_minutes: 30,
} as const;

export const COVERAGE_TIERS: Record<
  CoverageTierName,
  {
    dailyEarningRange: [number, number];
    weeklyPremium: number;
    payoutAmount: number;
  }
> = {
  Bronze: {
    dailyEarningRange: [300, 450],
    weeklyPremium: 12,
    payoutAmount: 900,
  },
  Silver: {
    dailyEarningRange: [450, 700],
    weeklyPremium: 22,
    payoutAmount: 1500,
  },
  Gold: {
    dailyEarningRange: [700, 1000],
    weeklyPremium: 38,
    payoutAmount: 2500,
  },
};

export const ZONE_RISK_SCORES: Record<
  string,
  {
    city: string;
    zone: string;
    pincode: string;
    score: number;
  }
> = {
  "400001": { city: "Mumbai", zone: "Fort", pincode: "400001", score: 0.61 },
  "400050": { city: "Mumbai", zone: "Bandra", pincode: "400050", score: 0.68 },
  "110001": { city: "Delhi", zone: "Connaught Place", pincode: "110001", score: 0.72 },
  "110070": { city: "Delhi", zone: "Vasant Kunj", pincode: "110070", score: 0.66 },
  "560001": { city: "Bengaluru", zone: "MG Road", pincode: "560001", score: 0.49 },
  "560095": { city: "Bengaluru", zone: "Koramangala", pincode: "560095", score: 0.57 },
  "600001": { city: "Chennai", zone: "George Town", pincode: "600001", score: 0.64 },
  "411001": { city: "Pune", zone: "Camp", pincode: "411001", score: 0.46 },
  "700001": { city: "Kolkata", zone: "BBD Bagh", pincode: "700001", score: 0.59 },
  "500001": { city: "Hyderabad", zone: "Abids", pincode: "500001", score: 0.53 },
};

export const PLATFORM_NAMES: PlatformName[] = ["swiggy", "zomato"];

export const FULL_PROJECT_TECH_STACK = {
  frontend: "Next.js 14 + TypeScript + Tailwind CSS + Shadcn UI",
  backend: "Next.js API Routes (Serverless)",
  database: "Supabase (PostgreSQL + Auth)",
  ml: "Python FastAPI microservice (XGBoost + Isolation Forest)",
  apis: "OpenWeatherMap, CPCB AQI mock, Razorpay sandbox",
  deploy: "Vercel (frontend) + Render (ML service)",
};
