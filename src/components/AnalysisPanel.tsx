import { StoryAnalysis } from '@/types/entities';
import { OutputRecommendations } from './OutputRecommendations';
import { ScoreCardGrid } from './ScoreCardGrid';

export function AnalysisPanel({
  analysis,
  onTriggerPop,
}: {
  analysis: StoryAnalysis | null;
  onTriggerPop: (triggerKey: string) => void;
}) {
  return (
    <div className="panel space-y-4">
      <h2 className="section-title">Analysis</h2>
      {!analysis && <p className="text-sm text-slate-400">No analysis yet. Run Analyze Story to generate results.</p>}

      {analysis && (
        <>
          <div className="grid gap-3 md:grid-cols-2">
            <FocusCard title="Short summary" value={analysis.short_summary} />
            <FocusCard title="Why it matters" value={analysis.why_it_matters} />
          </div>

          <Block title="Long summary" value={analysis.long_summary} />

          <div className="grid gap-3 md:grid-cols-2">
            <FocusCard title="Practical" value={analysis.practical} />
            <FocusCard title="Political" value={analysis.political} />
          </div>

          <Block title="Audience" value={analysis.audience} />

          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Key entities</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.key_entities.map((entity) => (
                <span key={entity} className="rounded-full border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-slate-200">
                  {entity}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Editorial scores</h3>
            <ScoreCardGrid scores={analysis.editorial_scores} />
          </div>

          <Block title="Recommended angles" value={analysis.recommended_angles.join('\n• ')} bulletize />
          <Block title="Final recommendation" value={analysis.final_recommendation} />

          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Recommended outputs</h3>
            <OutputRecommendations items={analysis.recommended_outputs} onTrigger={onTriggerPop} />
          </div>
        </>
      )}
    </div>
  );
}

function Block({ title, value, bulletize }: { title: string; value: string; bulletize?: boolean }) {
  return (
    <div>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</h3>
      <p className="whitespace-pre-line text-sm text-slate-200">{bulletize ? `• ${value}` : value}</p>
    </div>
  );
}

function FocusCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-700 bg-slate-950/70 p-3">
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</h3>
      <p className="text-sm text-slate-200">{value}</p>
    </div>
  );
}
