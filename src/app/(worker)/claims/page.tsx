const claimRows = [
  { id: "CLM-2031", trigger: "Heavy Rain", payout: "INR 900", status: "Processing" },
  { id: "CLM-1982", trigger: "AQI Severe", payout: "INR 1500", status: "Approved" },
  { id: "CLM-1957", trigger: "Platform Downtime", payout: "INR 900", status: "Paid" },
];

export default function ClaimsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12 text-slate-100">
      <h1 className="text-3xl font-semibold">Claims & Payout Status</h1>
      <p className="mt-2 text-slate-300">Parametric claims are triggered automatically and routed to payout with fraud scoring.</p>

      <div className="mt-8 space-y-3">
        {claimRows.map((row) => (
          <article
            key={row.id}
            className="flex flex-col gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm text-slate-400">{row.id}</p>
              <p className="text-base text-white">{row.trigger}</p>
            </div>
            <p className="font-medium text-amber-300">{row.payout}</p>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-300">{row.status}</span>
          </article>
        ))}
      </div>
    </main>
  );
}
