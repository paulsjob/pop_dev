import { ScoreBadge } from './ScoreBadge';

interface ResultsHeaderProps {
  headline: string;
  sourceType: string;
  recommendation: string;
  score: number;
  confidence: number;
}

export function ResultsHeader({ headline, sourceType, recommendation, score, confidence }: ResultsHeaderProps) {
  return (
    <header className="space-y-5 rounded-[2rem] border border-stone-200/80 bg-white/95 p-8 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{sourceType}</p>
      <h2 className="text-[2rem] font-medium leading-[1.2] tracking-[-0.01em] text-stone-800">{headline}</h2>
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs uppercase tracking-[0.14em] text-stone-700">{recommendation}</span>
        <ScoreBadge score={score} />
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs uppercase tracking-[0.14em] text-teal-800">
          Confidence {(confidence * 100).toFixed(0)}%
        </span>
      </div>
    </header>
  );
}
