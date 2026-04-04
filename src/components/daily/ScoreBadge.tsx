interface ScoreBadgeProps {
  score: number;
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  const tone = score >= 8 ? 'bg-emerald-100 text-emerald-800' : score >= 6 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800';

  return <span className={`rounded-full px-3 py-1 font-mono text-xs tracking-[0.04em] ${tone}`}>Score {score.toFixed(1)}</span>;
}
