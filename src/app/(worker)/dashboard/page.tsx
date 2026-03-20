import { WorkerStatCard } from "@/components/worker/WorkerStatCard";

export default function WorkerDashboardPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 text-slate-100">
      <h1 className="text-3xl font-semibold">Worker Dashboard</h1>
      <p className="mt-2 text-slate-300">Real-time policy, trigger, and payout visibility for field workers.</p>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <WorkerStatCard label="Weekly Premium" value="INR 22" hint="Auto-calculated from city risk" tone="teal" />
        <WorkerStatCard label="Coverage" value="INR 1,500" hint="Silver parametric plan" tone="amber" />
        <WorkerStatCard label="Trigger Status" value="Armed" hint="Rain + AQI + platform downtime" tone="rose" />
      </section>
    </main>
  );
}
