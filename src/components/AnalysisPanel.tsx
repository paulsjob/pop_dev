import { StoryAnalysis } from '@/types/entities';
import { OutputRecommendations } from './OutputRecommendations';
import { ScoreCardGrid } from './ScoreCardGrid';

export function AnalysisPanel({ analysis }: { analysis: StoryAnalysis | null }) {
  return (
    <div className="panel space-y-4">
      <h2 className="section-title">Analysis</h2>
      {!analysis && <p className="text-sm text-slate-400">No analysis yet. Run Analyze Story to generate results.</p>}

      {analysis && (
        <>
          <Block title="Short summary" value={analysis.short_summary} />
          <Block title="Long summary" value={analysis.long_summary} />
          <Block title="Why it matters" value={analysis.why_it_matters} />
          <Block title="Practical" value={analysis.practical} />
          <Block title="Political" value={analysis.political} />
          <Block title="Audience" value={analysis.audience} />
          <Block title="Key entities" value={analysis.key_entities.join(', ')} />

          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Editorial scores</h3>
            <ScoreCardGrid scores={analysis.editorial_scores} />
          </div>

          <Block title="Recommended angles" value={analysis.recommended_angles.join('\n• ')} bulletize />
          <Block title="Final recommendation" value={analysis.final_recommendation} />

          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Recommended outputs</h3>
            <OutputRecommendations items={analysis.recommended_outputs} />
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
