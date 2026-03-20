type SectionTitleProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function SectionTitle({ eyebrow, title, subtitle }: SectionTitleProps) {
  return (
    <div className="space-y-3">
      <p className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs tracking-[0.2em] text-amber-200 uppercase">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">{title}</h2>
      <p className="max-w-2xl text-sm text-slate-300 sm:text-base">{subtitle}</p>
    </div>
  );
}
