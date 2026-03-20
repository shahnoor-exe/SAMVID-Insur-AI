"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const kpiData = [
  { label: "Active Workers", value: "1,247", delta: "+5.3%", trend: "up", color: "from-blue-500 to-blue-600" },
  { label: "Active Policies", value: "892", delta: "+2.1%", trend: "up", color: "from-green-500 to-green-600" },
  { label: "Claims Paid", value: "₹4,32,000", delta: "+13.1%", trend: "up", color: "from-orange-500 to-orange-600" },
  { label: "Loss Ratio", value: "67%", delta: "-2.8%", trend: "down", color: "from-red-500 to-red-600" },
];

const triggerData = [
  { zone: "Mumbai-Central", pincode: "400001", trigger: "Rain", severity: "High", workers: 47, claims: 38, status: "Active" },
  { zone: "Delhi-North", pincode: "110001", trigger: "AQI", severity: "Critical", workers: 62, claims: 52, status: "Active" },
  { zone: "Bengaluru-East", pincode: "560001", trigger: "Heat", severity: "Medium", workers: 23, claims: 12, status: "Watch" },
  { zone: "Chennai-South", pincode: "600001", trigger: "Rain", severity: "Low", workers: 15, claims: 3, status: "Resolved" },
  { zone: "Pune-West", pincode: "411001", trigger: "Civic", severity: "Medium", workers: 8, claims: 5, status: "Active" },
];

const forecastData = [
  { city: "Mumbai", risk: 78, reserve: "₹2.4L", alert: "High" },
  { city: "Delhi", risk: 65, reserve: "₹1.8L", alert: "Medium" },
  { city: "Bengaluru", risk: 45, reserve: "₹1.2L", alert: "Low" },
  { city: "Chennai", risk: 72, reserve: "₹2.1L", alert: "High" },
  { city: "Pune", risk: 58, reserve: "₹1.5L", alert: "Medium" },
  { city: "Hyderabad", risk: 42, reserve: "₹1.1L", alert: "Low" },
  { city: "Ahmedabad", risk: 35, reserve: "₹0.85L", alert: "Low" },
];

const fraudData = [
  { worker: "SWG1999", amount: 1200, score: 82, risk: "Critical", flags: 4, action: "reject" },
  { worker: "ZMT2847", amount: 850, score: 58, risk: "High", flags: 2, action: "review" },
  { worker: "SWG1556", amount: 650, score: 31, risk: "Medium", flags: 1, action: "approve" },
  { worker: "ZMT3012", amount: 1500, score: 45, risk: "Medium", flags: 2, action: "review" },
];

const revenueData = [
  { week: "W1", premium: 65000, payout: 42000 },
  { week: "W2", premium: 72000, payout: 48000 },
  { week: "W3", premium: 68000, payout: 45000 },
  { week: "W4", premium: 71000, payout: 47000 },
  { week: "W5", premium: 74000, payout: 49000 },
  { week: "W6", premium: 76000, payout: 51000 },
  { week: "W7", premium: 78000, payout: 52000 },
  { week: "W8", premium: 82000, payout: 55000 },
];

const triggerDistribution = [
  { name: "Rain", value: 45, color: "#3b82f6" },
  { name: "Heat", value: 22, color: "#f59e0b" },
  { name: "AQI", value: 18, color: "#a855f7" },
  { name: "Civic", value: 12, color: "#ef4444" },
  { name: "Platform", value: 3, color: "#ec4899" },
];

const heatmapData = {
  cities: ["Mumbai", "Delhi", "Bengaluru", "Chennai", "Pune"],
  weeks: ["W1", "W2", "W3", "W4"],
  data: [
    [8, 12, 15, 10],
    [6, 9, 11, 8],
    [4, 6, 5, 7],
    [5, 8, 9, 6],
    [3, 5, 6, 4],
  ],
};

function getHeatColor(intensity: number) {
  if (intensity === 0) return "bg-white";
  if (intensity < 5) return "bg-yellow-100";
  if (intensity < 10) return "bg-orange-200";
  return "bg-red-400";
}

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 px-6 py-6 backdrop-blur">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold">Insurer Analytics Dashboard</h1>
          <p className="text-slate-400 mt-1">Operational command center for premiums, triggers, and payouts</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 space-y-8">
        {/* SECTION 1: KPI Header */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 bg-gradient-to-br ${kpi.color} bg-opacity-10 border border-${kpi.color.split(" ")[1]}/30 rounded-xl`}
            >
              <p className="text-sm text-slate-400 mb-2">{kpi.label}</p>
              <p className="text-3xl font-bold mb-2">{kpi.value}</p>
              <div className="flex items-center gap-2">
                {kpi.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
                <span className={kpi.trend === "up" ? "text-green-400" : "text-red-400"}>{kpi.delta}</span>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* SECTION 2: Live Trigger Monitor */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
          <h2 className="text-xl font-bold">Live Trigger Monitor</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4">Zone</th>
                  <th className="text-left py-3 px-4">Trigger Type</th>
                  <th className="text-left py-3 px-4">Severity</th>
                  <th className="text-left py-3 px-4">Workers</th>
                  <th className="text-left py-3 px-4">Claims</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {triggerData.map((trigger, idx) => (
                  <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800/30">
                    <td className="py-3 px-4">{trigger.zone}</td>
                    <td className="py-3 px-4">{trigger.trigger}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          trigger.severity === "Critical"
                            ? "bg-red-500/20 text-red-400"
                            : trigger.severity === "High"
                              ? "bg-orange-500/20 text-orange-400"
                              : trigger.severity === "Medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {trigger.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4">{trigger.workers}</td>
                    <td className="py-3 px-4 font-semibold">{trigger.claims}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          trigger.status === "Active"
                            ? "bg-red-500/20 text-red-400"
                            : trigger.status === "Watch"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {trigger.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* SECTION 3: Predictive Forecast */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
          <h2 className="text-xl font-bold">Next Week Risk Forecast</h2>

          <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl mb-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-300 text-sm">
              🌊 Monsoon Front approaching Maharashtra — High exposure expected. Reserve emergency capital.
            </p>
          </div>

          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="city" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: "8px" }} />
                <Bar dataKey="risk" fill="#f97316" name="Disruption Risk %" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {forecastData.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-sm">
                <p className="font-semibold">{item.city}</p>
                <p className="text-orange-400 text-xs mt-1">{item.risk}% rain risk • Reserve {item.reserve}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 4: Fraud Queue */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Fraud Queue</h2>
            <select className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-sm">
              <option>All Risk Levels</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4">Worker ID</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Fraud Score</th>
                  <th className="text-left py-3 px-4">Risk Level</th>
                  <th className="text-left py-3 px-4">Flags</th>
                  <th className="text-left py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {fraudData.map((fraud, idx) => (
                  <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-semibold">{fraud.worker}</td>
                    <td className="py-3 px-4">₹{fraud.amount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={
                          fraud.score > 75 ? "text-red-400" : fraud.score > 50 ? "text-orange-400" : "text-yellow-400"
                        }
                      >
                        {fraud.score}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          fraud.risk === "Critical"
                            ? "bg-red-500/20 text-red-400"
                            : fraud.risk === "High"
                              ? "bg-orange-500/20 text-orange-400"
                              : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {fraud.risk}
                      </span>
                    </td>
                    <td className="py-3 px-4">{fraud.flags}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {fraud.action === "reject" && (
                          <button className="px-3 py-1 text-xs bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded">
                            Reject
                          </button>
                        )}
                        {fraud.action === "review" && (
                          <button className="px-3 py-1 text-xs bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 rounded">
                            Review
                          </button>
                        )}
                        {fraud.action === "approve" && (
                          <button className="px-3 py-1 text-xs bg-green-500/20 text-green-300 hover:bg-green-500/30 rounded">
                            Approve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* SECTION 5: Portfolio Analytics */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-4">
          <h2 className="text-xl font-bold">Portfolio Analytics</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Revenue vs Payout */}
            <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
              <h3 className="text-sm font-semibold mb-4">Premium Revenue vs Claims Payout</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="week" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: "8px" }} />
                  <Legend />
                  <Line type="monotone" dataKey="premium" stroke="#f97316" strokeWidth={2} name="Premium Revenue" />
                  <Line type="monotone" dataKey="payout" stroke="#10b981" strokeWidth={2} name="Claims Payout" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Trigger Distribution */}
            <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
              <h3 className="text-sm font-semibold mb-4">Claims by Trigger Type</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={triggerDistribution} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name}: ${entry.value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                    {triggerDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.section>

        {/* SECTION 6: Zone Heatmap */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-4">
          <h2 className="text-xl font-bold">Zone Heatmap — Claim Intensity</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">City</th>
                  {heatmapData.weeks.map((week) => (
                    <th key={week} className="text-center py-3 px-4 font-semibold">
                      {week}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {heatmapData.cities.map((city, cityIdx) => (
                  <tr key={city} className="border-t border-slate-700">
                    <td className="py-3 px-4 font-semibold">{city}</td>
                    {heatmapData.data[cityIdx].map((intensity, weekIdx) => (
                      <td key={`${cityIdx}-${weekIdx}`} className="text-center py-3 px-4">
                        <div className={`inline-block w-12 h-12 rounded flex items-center justify-center font-bold ${getHeatColor(intensity)}`}>
                          {intensity}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
