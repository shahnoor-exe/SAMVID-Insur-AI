"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { SectionTitle } from "@/components/shared/SectionTitle";
import { FULL_PROJECT_TECH_STACK } from "@/lib/constants";

const mockPulse = [
  "Rain trigger detected in Mumbai 400001",
  "AQI advisory shifted to ORANGE in Delhi 110001",
  "Auto-payout queued: Worker SWG1024 - INR 900",
  "Fraud score low: Claim CLM-1982 cleared",
];

export default function Home() {
  const [pulseIndex, setPulseIndex] = useState(0);
  const [liveCoverage, setLiveCoverage] = useState(12480);

  useEffect(() => {
    const pulseTimer = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % mockPulse.length);
    }, 2200);

    const liveTimer = setInterval(() => {
      setLiveCoverage((prev) => prev + Math.floor(Math.random() * 6));
    }, 1800);

    return () => {
      clearInterval(pulseTimer);
      clearInterval(liveTimer);
    };
  }, []);

  return (
    <main className="relative isolate min-h-screen overflow-hidden">
      <div className="hero-mesh pointer-events-none absolute inset-0 -z-20" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,145,77,0.22),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(15,118,110,0.22),transparent_40%),radial-gradient(circle_at_60%_80%,rgba(96,165,250,0.14),transparent_40%)]" />

      <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-14 sm:pt-20">
        <p className="fade-in rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-amber-200 w-fit">
          SAMVID Insur AI by Code_Wrappers
        </p>

        <h1 className="slide-up mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
          AI-Powered Parametric Income Shield for India&apos;s Delivery Workforce
        </h1>

        <p className="slide-up-delay mt-6 max-w-3xl text-sm text-slate-200 sm:text-lg">
          A complete working prototype with interactive dashboards, trigger simulation, and policy intelligence for
          Swiggy and Zomato workers facing rain, heat, AQI, and platform downtime risk.
        </p>

        <div className="slide-up-delay-2 mt-8 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="rounded-full border border-teal-300/40 bg-teal-300/15 px-5 py-2 text-sm font-medium text-teal-100 transition hover:-translate-y-0.5"
          >
            Open Worker Demo
          </Link>
          <Link
            href="/admin/dashboard"
            className="rounded-full border border-amber-300/40 bg-amber-300/15 px-5 py-2 text-sm font-medium text-amber-100 transition hover:-translate-y-0.5"
          >
            Open Admin Demo
          </Link>
          <a
            href="https://github.com/shahnoor-exe/SAMVID-Insur-AI"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5"
          >
            GitHub Repository
          </a>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-slate-900/75 p-5 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Live Covered Workers</p>
            <p className="mt-3 text-3xl font-semibold text-white">{liveCoverage.toLocaleString()}</p>
            <p className="mt-2 text-xs text-emerald-300">+ Real-time demo ticker</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-slate-900/75 p-5 backdrop-blur md:col-span-2">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">SAMVID Event Pulse</p>
            <p className="ticker mt-3 text-base text-amber-200">{mockPulse[pulseIndex]}</p>
            <p className="mt-2 text-xs text-slate-400">Updates every ~2.2s for storytelling demos and judging panels.</p>
          </article>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-6 pb-16 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <SectionTitle
            eyebrow="Demo Version Stack"
            title="What This Working Prototype Uses"
            subtitle="Production-minded frontend architecture with mocked services for rapid hackathon deployment."
          />
          <ul className="mt-6 space-y-3 text-sm text-slate-200">
            <li>Frontend: Next.js App Router + TypeScript + Tailwind CSS animations</li>
            <li>Backend: Next.js API routes for premium, claims, fraud, and alerts</li>
            <li>Mock Integrations: Weather, AQI, civic alerts, IMD forecast, UPI payout</li>
            <li>UI Theme: Animated gradients, live pulse ticker, route-level dashboards</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-teal-300/25 bg-teal-300/5 p-6">
          <SectionTitle
            eyebrow="Full Build Stack"
            title="Tech Stack for Complete Product Version"
            subtitle="Clearly defined target stack shown inside the demo, exactly as planned for post-demo development."
          />
          <ul className="mt-6 space-y-2 text-sm text-teal-50">
            {Object.entries(FULL_PROJECT_TECH_STACK).map(([k, v]) => (
              <li key={k}>
                <span className="font-semibold capitalize">{k}:</span> {v}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
