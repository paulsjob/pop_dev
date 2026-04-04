import { ScoreBadge } from './ScoreBadge';

interface ResultsHeaderProps {
  headline: string;
  sourceType: string;
  recommendation: string;
  score: number;
  confidence: number;
  dominantSignal?: { label: string; icon: string };
}

export function ResultsHeader({ headline, sourceType, recommendation, score, confidence, dominantSignal }: ResultsHeaderProps) {
  return (
    <header className="space-y-7 rounded-[2.25rem] border border-stone-200/60 bg-white/95 p-9 shadow-[0_18px_44px_rgba(15,23,42,0.05)] md:p-11">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="space-y-3">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-stone-500">{sourceType}</p>
          <h2 className="max-w-3xl text-[2.1rem] font-semibold leading-[1.15] tracking-[-0.02em] text-stone-900 md:text-[2.5rem]">{headline}</h2>
        </div>
        {dominantSignal ? (
          <div className="inline-flex items-center gap-3 rounded-2xl border border-stone-200/70 bg-stone-50/70 px-4 py-3 text-sm text-stone-700">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl">{dominantSignal.icon}</span>
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.22em] text-stone-500">Dominant signal</p>
              <p className="font-medium text-stone-800">{dominantSignal.label}</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-stone-700">{recommendation}</span>
        <ScoreBadge score={score} />
        <span className="rounded-full border border-teal-200/70 bg-teal-50 px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-teal-800">
          Confidence {(confidence * 100).toFixed(0)}%
        </span>
      </div>
    </header>
  );
}
