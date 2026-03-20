type WorkerStatCardProps = {
  label: string;
  value: string;
  hint: string;
  tone?: "teal" | "amber" | "rose";
};

const toneClassMap = {
  teal: "from-teal-400/30 to-cyan-300/10",
  amber: "from-amber-400/30 to-orange-300/10",
  rose: "from-rose-400/30 to-fuchsia-300/10",
};

export function WorkerStatCard({ label, value, hint, tone = "teal" }: WorkerStatCardProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/15 bg-slate-900/70 p-5 backdrop-blur transition-transform duration-300 hover:-translate-y-1 ${toneClassMap[tone]}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br opacity-40" />
      <p className="relative text-xs uppercase tracking-[0.18em] text-slate-300">{label}</p>
      <p className="relative mt-3 text-2xl font-semibold text-white">{value}</p>
      <p className="relative mt-2 text-sm text-slate-300">{hint}</p>
    </article>
  );
}
