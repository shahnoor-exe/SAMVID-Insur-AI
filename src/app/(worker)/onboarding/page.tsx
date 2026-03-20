"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { ChevronRight, Shield, DollarSign, CheckCircle2 } from "lucide-react";
import { getZoneRiskScore } from "@/lib/premium-engine";
import { COVERAGE_TIERS } from "@/lib/constants";
import type { CoverageTierName, PremiumResult } from "@/lib/types";

const CITIES = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Chennai",
  "Pune",
  "Hyderabad",
  "Ahmedabad",
  "Kolkata",
];

const CITY_PINCODES: Record<string, string> = {
  Mumbai: "400001",
  Delhi: "110001",
  Bengaluru: "560001",
  Chennai: "600001",
  Pune: "411001",
  Hyderabad: "500001",
  Ahmedabad: "380001",
  Kolkata: "700001",
};

const MOCK_WORKERS: Record<string, { name: string; platform: string; city: string }> = {
  SWG1024: { name: "Ramesh Kumar", platform: "Swiggy", city: "Mumbai" },
  ZMT7712: { name: "Priya Singh", platform: "Zomato", city: "Bengaluru" },
  SWG2015: { name: "Vikram Patel", platform: "Swiggy", city: "Delhi" },
};

interface StepProps {
  isActive: boolean;
  number: number;
  title: string;
}

function StepIndicator({ isActive, number, title }: StepProps) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg border-2 transition-all ${
          isActive ? "bg-orange-500 border-orange-500 text-white" : "border-slate-600 text-slate-400"
        }`}
        animate={isActive ? { scale: 1.1 } : { scale: 1 }}
      >
        {number}
      </motion.div>
      <p className="mt-2 text-xs text-center text-slate-400">{title}</p>
    </div>
  );
}

export default function WorkerOnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 1
  const [workerId, setWorkerId] = useState("");
  const [phone, setPhone] = useState("");
  const [workerData, setWorkerData] = useState<{ name: string; platform: string; city: string } | null>(null);

  // Step 2
  const [city, setCity] = useState(CITIES[0]);
  const [pincode, setPincode] = useState(CITY_PINCODES[CITIES[0]]);
  const [zoneRisk, setZoneRisk] = useState(getZoneRiskScore(pincode));

  // Step 3
  const [avgEarnings, setAvgEarnings] = useState(500);
  const [activeDays, setActiveDays] = useState(5);
  const [coverageTier, setCoverageTier] = useState<CoverageTierName>("Silver");

  // Step 4
  const [premiumResult, setPremiumResult] = useState<PremiumResult | null>(null);
  const [policyActive, setPolicyActive] = useState(false);

  const handleFetchWorker = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const found = MOCK_WORKERS[workerId as keyof typeof MOCK_WORKERS];
    if (found) {
      setWorkerData(found);
      setCity(found.city);
      const newPincode = CITY_PINCODES[found.city];
      setPincode(newPincode);
      setZoneRisk(getZoneRiskScore(newPincode));
    }
    setLoading(false);
  };

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    const newPincode = CITY_PINCODES[newCity];
    setPincode(newPincode);
    setZoneRisk(getZoneRiskScore(newPincode));
  };

  const handleProceedStep3 = () => {
    if (avgEarnings <= 500) setCoverageTier("Bronze");
    else if (avgEarnings <= 850) setCoverageTier("Silver");
    else setCoverageTier("Gold");
    
    // Create mock premium result
    const mockResult: PremiumResult = {
      weekly_premium: 38,
      base_premium: 35,
      risk_multiplier: 1.4,
      coverage_tier: avgEarnings <= 500 ? "Bronze" : avgEarnings <= 850 ? "Silver" : "Gold",
      max_weekly_payout: 50000,
      premium_breakdown: {
        weather_risk: 15,
        aqi_risk: 8,
        social_risk: 10,
        platform_risk: 2,
      },
      risk_explanation: ["High-risk monsoon zone", "Silver coverage tier", "₹38/week premium"],
      discount_applied: -2,
      valid_from: new Date().toISOString(),
      valid_until: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    };
    
    setPremiumResult(mockResult);
    setStep(4);
  };

  const handleActivatePolicy = async () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setPolicyActive(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // In real app, redirect to dashboard
  };

  // Risk color
  const getRiskColor = (score: number) => {
    if (score < 3) return "from-green-500 to-green-600";
    if (score < 7) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 px-4 py-4 backdrop-blur">
        <div className="mx-auto max-w-2xl flex items-center gap-2">
          <Shield className="h-6 w-6 text-orange-500" />
          <h1 className="text-2xl font-bold text-orange-500">SAMVID InsurAI</h1>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Progress Bar */}
        <div className="mb-12 flex justify-between items-center">
          {[1, 2, 3, 4].map((num) => (
            <div key={num}>
              <StepIndicator isActive={step >= num} number={num} title={["Identity", "Zone", "Earnings", "Policy"][num - 1]} />
              {num < 4 && (
                <motion.div
                  className="h-1 w-16 bg-slate-700 my-6"
                  animate={step > num ? { backgroundColor: "#f97316" } : {}}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Identity */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              key="step1"
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Worker Identity अपनी पहचान</h2>
              <p className="text-slate-400">Let&apos;s start by fetching your profile</p>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium mb-2 block">Worker ID (e.g., SWG1024)</span>
                  <input
                    type="text"
                    value={workerId}
                    onChange={(e) => setWorkerId(e.target.value.toUpperCase())}
                    placeholder="SWG1024"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium mb-2 block">Mobile Number (verify OTP)</span>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </label>
              </div>

              {workerData && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
                >
                  <p className="text-green-400 font-semibold">✓ Profile found: {workerData.name}</p>
                  <p className="text-sm text-green-300 mt-1">Platform: {workerData.platform} • City: {workerData.city}</p>
                </motion.div>
              )}

              <motion.button
                onClick={handleFetchWorker}
                disabled={!workerId || loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-semibold text-white hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? "Fetching..." : "Fetch Profile & Continue"} {!loading && <ChevronRight className="h-5 w-5" />}
              </motion.button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              key="step2"
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Your Delivery Zone आपका क्षेत्र</h2>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium mb-2 block">City</span>
                  <select
                    value={city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-orange-500"
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-medium mb-2 block">Pincode</span>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-orange-500"
                  />
                </label>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Zone Risk Score</p>
                <div className="flex items-center gap-4">
                  <motion.div
                    className={`flex-1 h-3 rounded-full bg-gradient-to-r ${getRiskColor(zoneRisk)}`}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                  />
                  <span className="text-2xl font-bold text-orange-500">{zoneRisk.toFixed(1)}/10</span>
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <p className="text-blue-300 text-sm">
                  💧 Your zone historically experiences disruption {Math.ceil(zoneRisk * 1.5)} times per monsoon season.
                  Your earnings need protection!
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-4 border border-slate-600 rounded-xl font-semibold text-white hover:bg-slate-800"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-semibold text-white hover:from-orange-600 hover:to-orange-700 flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              key="step3"
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Your Earnings Profile आपकी आय</h2>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium mb-2 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" /> Average Daily Earnings
                  </span>
                  <input
                    type="range"
                    min="200"
                    max="1500"
                    value={avgEarnings}
                    onChange={(e) => setAvgEarnings(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-2xl font-bold text-orange-500 mt-2">₹{avgEarnings}/day</p>
                </label>

                <label className="block">
                  <span className="text-sm font-medium mb-2 block">Active Days Per Week</span>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={activeDays}
                    onChange={(e) => setActiveDays(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-lg font-semibold text-orange-500 mt-2">{activeDays} days/week</p>
                </label>
              </div>

              <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
                <p className="text-sm font-medium mb-3">Your Coverage Tier</p>
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  {coverageTier === "Bronze" ? "🥉" : coverageTier === "Silver" ? "🥈" : "🥇"} {coverageTier}
                </div>
                <p className="text-sm text-slate-300">
                  Max Payout: ₹{COVERAGE_TIERS[coverageTier].payoutAmount}/week
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 px-4 border border-slate-600 rounded-xl font-semibold text-white hover:bg-slate-800"
                >
                  Back
                </button>
                <button
                  onClick={handleProceedStep3}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-semibold text-white hover:from-orange-600 hover:to-orange-700 flex items-center justify-center gap-2"
                >
                  Calculate Premium <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && premiumResult && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              key="step4"
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Your First Policy आपकी पहली पॉलिसी</h2>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-2xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-orange-300 mb-1">Coverage Tier</p>
                    <p className="text-2xl font-bold">
                      {premiumResult.coverage_tier === "Bronze" ? "🥉" : premiumResult.coverage_tier === "Silver" ? "🥈" : "🥇"}{" "}
                      {premiumResult.coverage_tier}
                    </p>
                  </div>
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-green-400">
                    ✓ Active
                  </motion.div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-orange-500/20">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Weekly Premium</p>
                    <p className="text-2xl font-bold text-orange-300">₹{premiumResult.weekly_premium}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Max Payout/Week</p>
                    <p className="text-2xl font-bold text-orange-300">₹{premiumResult.max_weekly_payout}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 mb-4">🛡️ Protected by 5 Parametric Triggers:</p>
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">🌧️ Rain</span>
                  <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs">🌡️ Heat</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">💨 AQI</span>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">🚫 Civic</span>
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs">📱 Platform</span>
                </div>

                <p className="text-xs text-slate-400">Valid: {new Date(premiumResult.valid_from).toLocaleDateString()} - {new Date(premiumResult.valid_until).toLocaleDateString()}</p>
              </motion.div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 px-4 border border-slate-600 rounded-xl font-semibold text-white hover:bg-slate-800"
                >
                  Back
                </button>
                <button
                  onClick={handleActivatePolicy}
                  disabled={policyActive}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl font-semibold text-white hover:from-green-600 hover:to-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {policyActive ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" /> Policy Active!
                    </>
                  ) : (
                    <>
                      Activate Protection — Pay ₹{premiumResult.weekly_premium}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
