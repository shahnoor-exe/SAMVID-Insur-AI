import { AdminMetricTile } from "@/components/admin/AdminMetricTile";

export default function AdminDashboardPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 text-slate-100">
      <h1 className="text-3xl font-semibold">Insurer Analytics Dashboard</h1>
      <p className="mt-2 text-slate-300">
        Operational command center for premiums, trigger events, fraud confidence, and payout SLAs.
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminMetricTile title="Active Workers" current="12,480" delta="+5.3%" />
        <AdminMetricTile title="Triggered Claims" current="284" delta="+13.1%" />
        <AdminMetricTile title="Fraud Flag Rate" current="2.8%" delta="-0.6%" />
        <AdminMetricTile title="Avg. Payout Time" current="4m 12s" delta="-18%" />
      </section>
    </main>
  );
}
