import { StoryAnalysis, EvidenceItem } from '@/types/entities';
import { EvidenceTrail } from './EvidenceTrail';
import { OutputActionCards } from './OutputActionCards';
import { RecommendationCard } from './RecommendationCard';
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

  return (
    <section className="mx-auto w-full max-w-4xl space-y-6 pb-14">
      <ResultsHeader
        headline={headline}
        sourceType={sourceType}
        recommendation={analysis.final_recommendation}
        score={analysis.editorial_scores.overall_score}
        confidence={confidence}
      />

      <RecommendationCard title="What this is">{analysis.long_summary || analysis.short_summary}</RecommendationCard>
      <RecommendationCard title="Why it matters">{analysis.why_it_matters}</RecommendationCard>
      <RecommendationCard title="Recommended action">{analysis.final_recommendation}</RecommendationCard>
      <RecommendationCard title="Recommended angles">
        <ul className="list-disc space-y-1 pl-5">
          {analysis.recommended_angles.map((angle) => (
            <li key={angle}>{angle}</li>
          ))}
        </ul>
      </RecommendationCard>

      <RecommendationCard title="Suggested outputs">
        <OutputActionCards outputs={analysis.recommended_outputs} onGenerate={onGeneratePop} />
      </RecommendationCard>

      <RecommendationCard title="Suggested tags">
        <TagChipGroup tags={suggestedTags} />
      </RecommendationCard>

      <RecommendationCard title="Evidence trail">
        <EvidenceTrail evidence={evidence} />
      </RecommendationCard>

      <div className="flex flex-wrap items-center gap-2.5 pt-4">
        <button onClick={onApprove} className="rounded-full bg-stone-800 px-5 py-2.5 text-sm font-medium text-stone-50 transition hover:bg-stone-700">
          Approve
        </button>
        <button
          onClick={onEdit}
          className="rounded-full border border-stone-300 bg-white/95 px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:border-stone-400"
        >
          Edit
        </button>
        <button
          onClick={onPass}
          className="rounded-full border border-stone-300 bg-white/95 px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:border-stone-400"
        >
          Pass
        </button>
        <button
          onClick={() => onGeneratePop('manual_pop_generation')}
          className="rounded-full border border-teal-200 bg-teal-50/90 px-5 py-2.5 text-sm font-medium text-teal-800 transition hover:bg-teal-100"
        >
          Generate POP
        </button>
        <button onClick={onAnalyzeAnother} className="rounded-full px-4 py-2.5 text-sm text-stone-500 transition hover:text-stone-700">
          Analyze another
        </button>
      </div>
    </section>
  );
}
