"use client";

import { motion } from "framer-motion";
import { Bell, CloudRain, Thermometer, Wind, AlertTriangle, Smartphone } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const weeklyData = [
  { day: "Mon", protected: 650, claimed: 0 },
  { day: "Tue", protected: 780, claimed: 0 },
  { day: "Wed", protected: 900, claimed: 600 },
  { day: "Thu", protected: 720, claimed: 0 },
  { day: "Fri", protected: 850, claimed: 450 },
  { day: "Sat", protected: 950, claimed: 0 },
  { day: "Sun", protected: 780, claimed: 0 },
];

const recentClaims = [
  { date: "March 15", trigger: "Heavy Rain", amount: 600, status: "credited" },
  { date: "March 8", trigger: "AQI Severe", amount: 450, status: "credited" },
  { date: "March 6", trigger: "Platform Down", amount: 0, status: "processing" },
];

export default function WorkerDashboardPage() {
  const handleTriggerDemo = () => {
    console.log("Simulating rain trigger...");
    alert("🌧️ Rain Trigger Fired! Claim initiated for ₹600");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* SECTION 1: Header */}
      <div className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/80 backdrop-blur px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Ramesh Kumar</h1>
            <p className="text-sm text-slate-400">🛵 Swiggy • Mumbai</p>
          </div>
          <div className="flex items-center gap-4">
            <motion.div animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="relative">
              <Bell className="h-6 w-6 text-slate-400 cursor-pointer hover:text-orange-400" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                2
              </span>
            </motion.div>
            <motion.div
              animate={{ backgroundColor: ["#10b981", "#059669", "#10b981"] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white"
            >
              ● Policy Active
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 space-y-8">
        {/* SECTION 2: Protection Status Card */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h2 className="text-xl font-bold">Your Protection This Week आपकी साप्ताहिक सुरक्षा</h2>
          <div className="p-8 bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-2xl">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <p className="text-sm text-orange-300 mb-2">Coverage Status</p>
                <p className="text-3xl font-bold text-orange-400">🥈 Silver</p>
                <p className="text-sm text-slate-300 mt-2">Active • Expires in 4 days</p>
              </div>

              <div>
                <p className="text-sm text-orange-300 mb-2">Weekly Premium</p>
                <p className="text-3xl font-bold text-orange-400">₹25</p>
                <p className="text-sm text-slate-300 mt-2">Max payout: ₹1,500/week</p>
              </div>

              <div>
                <p className="text-sm text-orange-300 mb-2">Earnings Protected</p>
                <p className="text-3xl font-bold text-green-400">₹4,680</p>
                <p className="text-sm text-slate-300 mt-2">This month so far</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 pt-6 border-t border-orange-500/20">
              <p className="text-xs text-slate-400 mb-2">Days Remaining</p>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                  initial={{ width: 0 }}
                  animate={{ width: "57%" }}
                  transition={{ duration: 1 }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">4 of 7 days used • Renew on March 21</p>
            </div>
          </div>
        </motion.section>

        {/* SECTION 3: Live Disruption Monitor */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
          <h2 className="text-xl font-bold">Live Disruption Monitor लाइव मॉनिटर</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Rain */}
            <div className="p-4 bg-slate-800/50 border border-blue-500/20 rounded-xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <CloudRain className="h-6 w-6 text-blue-400" />
                  <div>
                    <p className="font-semibold">Rain Status</p>
                    <p className="text-sm text-blue-300">28mm — Safe</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">Safe</span>
              </div>
            </div>

            {/* Heat */}
            <div className="p-4 bg-slate-800/50 border border-yellow-500/20 rounded-xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Thermometer className="h-6 w-6 text-yellow-400" />
                  <div>
                    <p className="font-semibold">Heat Status</p>
                    <p className="text-sm text-yellow-300">38°C — Moderate</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded text-xs">Moderate</span>
              </div>
            </div>

            {/* AQI */}
            <div className="p-4 bg-slate-800/50 border border-purple-500/20 rounded-xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Wind className="h-6 w-6 text-purple-400" />
                  <div>
                    <p className="font-semibold">AQI Status</p>
                    <p className="text-sm text-purple-300">AQI 187 — Poor</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">Poor</span>
              </div>
            </div>

            {/* Civic */}
            <div className="p-4 bg-slate-800/50 border border-slate-600/20 rounded-xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-slate-400" />
                  <div>
                    <p className="font-semibold">Civic Alert</p>
                    <p className="text-sm text-slate-400">No Alerts</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">Clear</span>
              </div>
            </div>

            {/* Platform */}
            <div className="p-4 bg-slate-800/50 border border-orange-500/20 rounded-xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-6 w-6 text-orange-400" />
                  <div>
                    <p className="font-semibold">Platform Status</p>
                    <p className="text-sm text-green-300">Swiggy — Online</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">Online</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl mt-4">
            <p className="text-xs text-slate-400">Simulated Live Data — Updated 2 min ago</p>
            <button
              onClick={handleTriggerDemo}
              className="px-4 py-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-lg text-sm font-semibold transition"
            >
              🔴 TRIGGER DEMO
            </button>
          </div>
        </motion.section>

        {/* SECTION 4: Forecast Alert Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-red-300 mb-2">⚠️ Heavy rain expected tomorrow in your zone</p>
              <p className="text-sm text-slate-300 mb-4">
                IMD forecast shows 75% probability of rainfall &gt; 50mm. Consider upgrading your coverage.
              </p>
              <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-sm font-semibold text-white transition">
                Upgrade to Gold ₹38/week
              </button>
            </div>
          </div>
        </motion.section>

        {/* SECTION 5: Recent Claims Timeline */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
          <h2 className="text-xl font-bold">Recent Claims दावे की रिपोर्ट</h2>
          <div className="space-y-3">
            {recentClaims.map((claim, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 p-4 bg-slate-800/50 border border-slate-700 rounded-xl"
              >
                <div className="text-2xl">{claim.status === "credited" ? "✅" : "🔄"}</div>
                <div className="flex-1">
                  <p className="font-semibold">{claim.trigger}</p>
                  <p className="text-sm text-slate-400">{claim.date}</p>
                </div>
                <div className="text-right">
                  {claim.amount > 0 && <p className="font-bold text-green-400">₹{claim.amount}</p>}
                  <p className="text-xs text-slate-400 capitalize">{claim.status}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <button className="w-full py-2 text-orange-400 hover:text-orange-300 text-sm font-semibold">View All Claims →</button>
        </motion.section>

        {/* SECTION 6: This Month's Impact + Chart */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-4">
          <h2 className="text-xl font-bold">This Month&apos;s Impact इस महीने का प्रभाव</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/50 border border-blue-500/20 rounded-xl text-center">
              <p className="text-3xl font-bold text-blue-400">3</p>
              <p className="text-sm text-slate-300 mt-2">Disruption Days Covered</p>
            </div>
            <div className="p-4 bg-slate-800/50 border border-green-500/20 rounded-xl text-center">
              <p className="text-3xl font-bold text-green-400">₹3,200</p>
              <p className="text-sm text-slate-300 mt-2">Income Protected</p>
            </div>
            <div className="p-4 bg-slate-800/50 border border-slate-600/20 rounded-xl text-center">
              <p className="text-3xl font-bold text-slate-300">0</p>
              <p className="text-sm text-slate-300 mt-2">Claims Rejected</p>
            </div>
          </div>

          {/* Chart */}
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
            <h3 className="text-sm font-semibold mb-4">Weekly Earnings Protection Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="protected" stroke="#f97316" strokeWidth={2} name="Protected" />
                <Line type="monotone" dataKey="claimed" stroke="#10b981" strokeWidth={2} name="Claimed" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
