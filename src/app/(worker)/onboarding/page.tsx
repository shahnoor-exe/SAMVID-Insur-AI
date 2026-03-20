import { COVERAGE_TIERS, PLATFORM_NAMES } from "@/lib/constants";

export default function WorkerOnboardingPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12 text-slate-100">
      <h1 className="text-3xl font-semibold">Worker Onboarding</h1>
      <p className="mt-2 text-slate-300">
        Demo flow for Swiggy and Zomato workers to register and auto-map to a risk-based coverage tier.
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {Object.entries(COVERAGE_TIERS).map(([name, tier]) => (
          <article key={name} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <p className="text-xs tracking-[0.2em] text-amber-300 uppercase">{name}</p>
            <p className="mt-2 text-sm text-slate-300">
              Daily range: INR {tier.dailyEarningRange[0]} - {tier.dailyEarningRange[1]}
            </p>
            <p className="mt-2 text-sm text-slate-300">Weekly premium: INR {tier.weeklyPremium}</p>
            <p className="mt-2 text-sm text-slate-300">Payout amount: INR {tier.payoutAmount}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-teal-400/20 bg-teal-400/5 p-5">
        <p className="text-sm text-teal-100">Supported platforms: {PLATFORM_NAMES.join(", ")}</p>
      </section>
    </main>
  );
}
