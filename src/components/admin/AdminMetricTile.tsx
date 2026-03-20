type AdminMetricTileProps = {
  title: string;
  current: string;
  delta: string;
};

export function AdminMetricTile({ title, current, delta }: AdminMetricTileProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 transition duration-300 hover:border-teal-400/40">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{title}</p>
      <div className="mt-2 flex items-end justify-between">
        <p className="text-xl font-semibold text-slate-100">{current}</p>
        <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs text-emerald-300">{delta}</span>
      </div>
    </div>
  );
}
