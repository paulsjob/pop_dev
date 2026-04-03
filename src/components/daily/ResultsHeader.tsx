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
    <header className="space-y-4 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{sourceType}</p>
      <h2 className="text-3xl leading-tight text-slate-800">{headline}</h2>
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{recommendation}</span>
        <ScoreBadge score={score} />
        <span className="rounded-full bg-sky-50 px-3 py-1 text-sm text-sky-700">Confidence {(confidence * 100).toFixed(0)}%</span>
      </div>
    </header>
  );
}
