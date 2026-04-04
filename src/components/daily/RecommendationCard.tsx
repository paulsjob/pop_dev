import { ReactNode } from 'react';

interface RecommendationCardProps {
  title: string;
  children: ReactNode;
}

export function RecommendationCard({ title, children }: RecommendationCardProps) {
  return (
    <section className="space-y-3 rounded-[1.7rem] border border-stone-200/80 bg-white/95 p-7 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <h3 className="text-xs uppercase tracking-[0.2em] text-stone-500">{title}</h3>
      <div className="text-[1.02rem] leading-[1.85] text-stone-700">{children}</div>
    </section>
  );
}
