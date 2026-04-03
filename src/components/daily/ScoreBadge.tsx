interface ScoreBadgeProps {
  score: number;
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  const tone = score >= 8 ? 'bg-emerald-100 text-emerald-700' : score >= 6 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700';

  return <span className={`rounded-full px-3 py-1 text-sm ${tone}`}>Score {score.toFixed(1)}</span>;
}
