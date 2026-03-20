import { COVERAGE_TIERS } from "@/lib/constants";

export default function PolicyPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12 text-slate-100">
      <h1 className="text-3xl font-semibold">Policy Management</h1>
      <p className="mt-2 text-slate-300">Upgrade, pause, or renew worker policies with transparent premium logic.</p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/80 text-slate-300">
            <tr>
              <th className="px-4 py-3">Tier</th>
              <th className="px-4 py-3">Daily Earning Range</th>
              <th className="px-4 py-3">Weekly Premium</th>
              <th className="px-4 py-3">Payout</th>
            </tr>
          </thead>
          <tbody className="bg-slate-950/80 text-slate-100">
            {Object.entries(COVERAGE_TIERS).map(([name, tier]) => (
              <tr key={name} className="border-t border-white/5">
                <td className="px-4 py-3">{name}</td>
                <td className="px-4 py-3">
                  INR {tier.dailyEarningRange[0]} - {tier.dailyEarningRange[1]}
                </td>
                <td className="px-4 py-3">INR {tier.weeklyPremium}</td>
                <td className="px-4 py-3">INR {tier.payoutAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
