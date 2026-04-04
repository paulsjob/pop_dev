import { StoryAnalysis, EvidenceItem } from '@/types/entities';
import { EvidenceTrail } from './EvidenceTrail';
import { OutputActionCards } from './OutputActionCards';
import { ResultsHeader } from './ResultsHeader';
import { TagChipGroup } from './TagChipGroup';

interface ResultsScreenProps {
  sourceType: string;
  headline: string;
  analysis: StoryAnalysis;
  suggestedTags: string[];
  evidence: EvidenceItem[];
  onApprove: () => void;
  onEdit: () => void;
  onPass: () => void;
  onGeneratePop: (trigger: string) => void;
  onAnalyzeAnother: () => void;
}

const actionLadder = ['Must Act', 'Strong', 'Test', 'Monitor', 'Pass'];

const actionStyles: Record<string, string> = {
  'Must Act': 'border-rose-300 bg-rose-50 text-rose-800',
  Strong: 'border-amber-300 bg-amber-50 text-amber-800',
  Test: 'border-sky-300 bg-sky-50 text-sky-800',
  Monitor: 'border-stone-300 bg-stone-50 text-stone-700',
  Pass: 'border-emerald-300 bg-emerald-50 text-emerald-800',
};

function inferAction(recommendation: string) {
  const lower = recommendation.toLowerCase();
  if (lower.includes('must') || lower.includes('urgent')) return 'Must Act';
  if (lower.includes('strong') || lower.includes('publish')) return 'Strong';
  if (lower.includes('test') || lower.includes('pilot')) return 'Test';
  if (lower.includes('monitor') || lower.includes('watch')) return 'Monitor';
  return 'Pass';
}

export function ResultsScreen({
  sourceType,
  headline,
  analysis,
  suggestedTags,
  evidence,
  onApprove,
  onEdit,
  onPass,
  onGeneratePop,
  onAnalyzeAnother,
}: ResultsScreenProps) {
  const confidence = Math.max(...analysis.recommended_outputs.map((output) => output.confidence), 0.72);
  const dominantSignal = suggestedTags[0];
  const selectedAction = inferAction(analysis.final_recommendation);

  const whyCards = [
    { title: 'People Impact', body: analysis.practical },
    { title: 'Political Stakes', body: analysis.political },
    { title: 'Audience Relevance', body: analysis.audience },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl space-y-9 pb-16">
      <ResultsHeader
        headline={headline}
        sourceType={sourceType}
        recommendation={analysis.final_recommendation}
        score={analysis.editorial_scores.overall_score}
        confidence={confidence}
        dominantSignal={dominantSignal ? { label: dominantSignal, icon: '✦' } : undefined}
      />

      <section className="rounded-[2rem] border border-stone-200/60 bg-white/95 p-7 md:p-8">
        <h3 className="text-[0.7rem] uppercase tracking-[0.24em] text-stone-500">Story snapshot</h3>
        <p className="mt-4 text-lg leading-9 text-stone-700">{analysis.short_summary || analysis.long_summary}</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-[0.7rem] uppercase tracking-[0.24em] text-stone-500">Story signals</h3>
        <TagChipGroup tags={suggestedTags} />
      </section>

      <section className="space-y-4">
        <h3 className="text-[0.7rem] uppercase tracking-[0.24em] text-stone-500">Why it matters</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {whyCards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-stone-200/70 bg-white p-5">
              <p className="text-[0.64rem] uppercase tracking-[0.22em] text-stone-500">{card.title}</p>
              <p className="mt-3 text-sm leading-7 text-stone-700">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-[0.7rem] uppercase tracking-[0.24em] text-stone-500">Recommended action</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {actionLadder.map((action) => {
            const active = action === selectedAction;
            return (
              <article
                key={action}
                className={`rounded-2xl border p-4 text-center text-sm ${
                  active ? actionStyles[action] : 'border-stone-200/70 bg-white text-stone-500'
                }`}
              >
                <p className="text-[0.62rem] uppercase tracking-[0.18em]">{active ? 'System pick' : 'Option'}</p>
                <p className="mt-2 font-medium">{action}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-[0.7rem] uppercase tracking-[0.24em] text-stone-500">Output suggestions</h3>
        <OutputActionCards outputs={analysis.recommended_outputs} onGenerate={onGeneratePop} />
      </section>

      <section className="space-y-4">
        <h3 className="text-[0.7rem] uppercase tracking-[0.24em] text-stone-500">Evidence</h3>
        <EvidenceTrail evidence={evidence} />
      </section>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button onClick={onApprove} className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-800">
          Approve
        </button>
        <button onClick={onEdit} className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-400">
          Edit
        </button>
        <button onClick={onPass} className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-400">
          Pass
        </button>
        <button
          onClick={() => onGeneratePop('manual_pop_generation')}
          className="rounded-full border border-teal-200 bg-teal-50 px-6 py-3 text-sm font-medium text-teal-800 transition hover:bg-teal-100"
        >
          Generate POP
        </button>
        <button onClick={onAnalyzeAnother} className="rounded-full px-4 py-3 text-sm text-stone-500 transition hover:text-stone-700">
          Analyze another
        </button>
      </div>
    </section>
  );
}
