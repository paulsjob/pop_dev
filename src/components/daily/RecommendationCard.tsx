import { ReactNode } from 'react';

interface RecommendationCardProps {
  title: string;
  children: ReactNode;
}

export function RecommendationCard({ title, children }: RecommendationCardProps) {
  return (
    <section className="space-y-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-sm uppercase tracking-[0.18em] text-slate-500">{title}</h3>
      <div className="text-lg leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}
