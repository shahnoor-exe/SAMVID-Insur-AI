"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Zap, CloudRain, Heart, ArrowRight, Check, Sparkles, Radar, Activity, Globe } from "lucide-react";
import { FULL_PROJECT_TECH_STACK } from "@/lib/constants";

const mockPulse = [
  "🌧️ Rain trigger detected in Mumbai 400001 | 65mm rainfall",
  "🌡️ AQI advisory shifted to ORANGE in Delhi 110001 | 320 AQI",
  "💰 Auto-payout queued: Worker SWG1024 - ₹12,500 | Monsoon protection",
  "✅ Fraud score low: Claim CLM-1982 cleared | GPS verified",
  "📱 Platform downtime detected | Peak hours impact | 847 workers notified",
];

const features = [
  {
    icon: CloudRain,
    title: "5 Parametric Triggers",
    desc: "Rain, Heat, AQI, Civic Alerts, Platform Downtime",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Instant Auto-Payouts",
    desc: "Weather-triggered claims approved in seconds",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Heart,
    title: "ML Fraud Detection",
    desc: "6 anomaly flags with explainability",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: TrendingUp,
    title: "Zone Risk Scoring",
    desc: "20 cities mapped by hazard history",
    color: "from-emerald-500 to-teal-500",
  },
];

const stats = [
  { label: "Workers Protected", value: "1,247", suffix: "+", delay: 0 },
  { label: "Total Payouts", value: "₹2.15", suffix: "Cr", delay: 0.1 },
  { label: "Avg Payout Speed", value: "2", suffix: "mins", delay: 0.2 },
  { label: "Fraud Detection Rate", value: "99.2", suffix: "%", delay: 0.3 },
];

const microWins = [
  { title: "Auto-payout ready", meta: "<30s latency", accent: "from-orange-500 to-amber-500" },
  { title: "ML fraud sweep", meta: "6 anomaly flags", accent: "from-emerald-500 to-teal-500" },
  { title: "Weather grid", meta: "5 live triggers", accent: "from-cyan-500 to-blue-500" },
  { title: "Comms blast", meta: "847 workers notified", accent: "from-pink-500 to-rose-500" },
];

const journeySteps = [
  { label: "Trigger", detail: "Rain / AQI / Heat sensors fire", icon: CloudRain },
  { label: "Score", detail: "Risk + fraud scores merge", icon: Radar },
  { label: "Decide", detail: "Policy rules auto-evaluated", icon: Shield },
  { label: "Payout", detail: "UPI/IMPS pushed instantly", icon: Activity },
  { label: "Notify", detail: "SMS + App updates shipped", icon: Globe },
];

const kineticLoaders = [
  { title: "Parametric Engine", desc: "Rainfall + AQI stitched into payouts", icon: Sparkles },
  { title: "Fraud Watch", desc: "Device, geofence, pattern scoring", icon: Shield },
  { title: "Policy Sync", desc: "Re-rated every 24h with city hazards", icon: TrendingUp },
];

function AnimatedCounter({ value, suffix, duration = 2 }: { value: string; suffix: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const numValue = parseInt(value.replace("₹", "").replace(/,/g, ""));
    const isDecimal = value.includes(".");
    const maxValue = isDecimal ? Math.ceil(numValue * 100) / 100 : numValue;

    let currentValue = 0;
    const increment = maxValue / (duration * 60);
    const interval = setInterval(() => {
      currentValue += increment;
      if (currentValue >= maxValue) {
        currentValue = maxValue;
        clearInterval(interval);
      }
      if (isDecimal) {
        setDisplayValue((currentValue / 100).toFixed(2));
      } else {
        setDisplayValue(Math.floor(currentValue).toLocaleString());
      }
    }, 16);

    return () => clearInterval(interval);
  }, [value, suffix, duration]);

  return (
    <>
      {displayValue}
      <span className="text-sm font-medium text-orange-300">{suffix}</span>
    </>
  );
}

export default function Home() {
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const pulseTimer = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % mockPulse.length);
    }, 3000);

    return () => clearInterval(pulseTimer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-slate-950" suppressHydrationWarning>
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-orange-500/30 to-transparent blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-500/20 to-transparent blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-teal-500/10 to-transparent blur-3xl" />
      </div>

      {/* Hero Section */}
      <motion.section className="relative mx-auto w-full max-w-7xl px-6 pb-12 pt-20 sm:pt-32" initial="hidden" animate="visible" variants={containerVariants}>
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-orange-300 backdrop-blur">
            <Shield className="h-4 w-4" />
            Guidewire DEVTrails 2026 — Phase 1
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 variants={itemVariants} className="mt-8 text-center text-5xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-orange-400 sm:text-7xl">
          🛡️ SAMVID Insur AI
        </motion.h1>

        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-slate-300" suppressHydrationWarning>
          AI-powered <span className="font-bold text-orange-300">parametric income protection</span> for India&apos;s 6M+ gig workers. Automatic payouts triggered by weather, not paperwork.
        </p>

        <motion.p variants={itemVariants} className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-400">
          Complete interactive prototype with ML premium engine, 5-trigger system, fraud detection, and beautiful worker/admin dashboards.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-bold text-white shadow-lg shadow-orange-500/50 transition hover:shadow-orange-500/75 hover:scale-105"
          >
            Worker Demo
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 rounded-lg border border-orange-400/50 bg-orange-400/10 px-6 py-3 font-bold text-orange-200 transition hover:bg-orange-400/20 hover:scale-105"
          >
            Admin Analytics
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/onboarding" className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/50 px-6 py-3 font-semibold text-slate-200 transition hover:bg-slate-700/50 hover:scale-105">
            Try Onboarding
          </Link>
        </motion.div>
      </motion.section>

      {/* Live Pulse Ticker */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-amber-500/10 p-6 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-orange-500">
              <div className="h-2 w-2 rounded-full bg-orange-300 animate-pulse" />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-300">LIVE EVENT PULSE</p>
          </div>
          <motion.p key={pulseIndex} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="mt-4 text-lg font-semibold text-orange-100">
            {mockPulse[pulseIndex]}
          </motion.p>
        </div>
      </motion.section>

      {/* Kinetic loaders */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto w-full max-w-7xl px-6 pb-4"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <div className="pointer-events-none absolute -left-10 -top-16 h-40 w-40 rounded-full bg-orange-500/20 floating-blob" />
          <div className="pointer-events-none absolute -right-16 -bottom-10 h-48 w-48 rounded-full bg-cyan-500/15 floating-blob" />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">Realtime stack</p>
              <h2 className="text-3xl font-bold text-white">Animated system loaders</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-200 glow-border">
              <Sparkles className="h-4 w-4" /> Live on mock data
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {kineticLoaders.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-800/60 p-4 shadow-lg"
                >
                  <div className="absolute inset-0 shimmer-surface opacity-30" />
                  <div className="relative flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/70 text-orange-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-xs text-slate-300">{item.desc}</p>
                    </div>
                  </div>
                  <motion.div
                    aria-hidden
                    className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-900/70"
                    initial={{ scaleX: 0.2 }}
                    animate={{ scaleX: [0.2, 1, 0.4, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: stat.delay }}
              className="group rounded-2xl border border-orange-500/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 backdrop-blur transition hover:border-orange-500/50 hover:bg-slate-800/70"
            >
              <p className="text-sm uppercase tracking-widest text-slate-400 group-hover:text-orange-300 transition">{stat.label}</p>
              <p className="mt-4 text-4xl font-black text-white">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Micro-win rail */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50">
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-orange-200">
              <Zap className="h-4 w-4" /> Live system micro-wins
            </div>
            <p className="text-xs text-slate-400">Auto-updated every few seconds</p>
          </div>
          <div className="relative flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
            {microWins.map((win, idx) => (
              <motion.div
                key={win.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex flex-1 flex-col gap-2 rounded-xl border border-white/5 bg-slate-800/60 px-4 py-3"
              >
                <div className={`inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r ${win.accent} px-3 py-1 text-xs font-semibold text-white shadow-lg`}>
                  <span className="h-2 w-2 rounded-full bg-white/80" />
                  {win.meta}
                </div>
                <p className="text-sm font-semibold text-white">{win.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black text-white">Why SAMVID?</h2>
          <p className="mt-3 text-slate-400">Unique innovation meeting market urgency</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group rounded-2xl border border-orange-500/10 bg-slate-800/30 p-6 backdrop-blur transition hover:border-orange-500/30 hover:bg-slate-800/50"
              >
                <div className={`inline-flex rounded-lg bg-gradient-to-br ${feature.color} p-3 text-white shadow-lg transition group-hover:scale-110`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Decision journey */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="mb-10 flex flex-col gap-3 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Trigger → Payout → Notify</p>
          <h2 className="text-4xl font-black text-white">Cinematic decision rail</h2>
          <p className="text-slate-400">Every step animated so ops can trace what fired when</p>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          {journeySteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-left"
              >
                <div className="absolute inset-0 shimmer-surface opacity-20" />
                <div className="relative flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-orange-200">
                    <Icon className="h-4 w-4" />
                    <span>{step.label}</span>
                  </div>
                  <p className="text-sm text-slate-200">{step.detail}</p>
                  <motion.div
                    aria-hidden
                    className="h-1 w-full rounded-full bg-slate-800"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Tech Stack */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mx-auto w-full max-w-7xl gap-6 px-6 py-12 lg:grid lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-800/30 p-8 backdrop-blur">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-6 w-6 text-orange-400" />
            <h3 className="text-2xl font-bold text-white">Demo Stack</h3>
          </div>
          <p className="mb-6 text-sm text-slate-300">Production-ready frontend with mocked services</p>
          <ul className="space-y-3 text-sm text-slate-200">
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Next.js 16.2</strong> App Router + TypeScript
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Tailwind CSS</strong> + Framer Motion animations
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Recharts</strong> for interactive dashboards
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>10 API Routes</strong> with fraud/premium/trigger logic
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-amber-500/10 p-8 backdrop-blur">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-6 w-6 text-orange-400" />
            <h3 className="text-2xl font-bold text-white">Full Product</h3>
          </div>
          <p className="mb-6 text-sm text-slate-300">Planned production architecture</p>
          <ul className="space-y-3 text-sm text-orange-50">
            {Object.entries(FULL_PROJECT_TECH_STACK).slice(0, 4).map(([k, v]) => (
              <li key={k} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="capitalize">{k}:</strong> {v}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="rounded-3xl border border-orange-500/40 bg-gradient-to-r from-orange-500/20 via-amber-500/10 to-orange-500/20 p-12 text-center backdrop-blur">
          <h2 className="text-4xl font-black text-white">Ready to See SAMVID in Action?</h2>
          <p className="mt-4 text-lg text-slate-200">Complete working prototype with real data flows and animations</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-8 py-3 font-bold text-white shadow-lg shadow-orange-500/50 transition hover:bg-orange-600 hover:scale-105"
            >
              Launch Worker Dashboard
              <Zap className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com/shahnoor-exe/SAMVID-Insur-AI"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-8 py-3 font-bold text-white transition hover:bg-white/20 hover:scale-105"
            >
              View on GitHub
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="mx-auto w-full max-w-7xl px-6 py-12 text-center text-sm text-slate-500">
        <p>
          Built with ❤️ for India&apos;s gig workforce | <strong>SAMVID Insur AI</strong> by Code_Wrappers | Phase 1 Submission 2026
        </p>
      </footer>
    </main>
  );
}
