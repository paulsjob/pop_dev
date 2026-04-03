import { EvidenceItem, OutputRecommendation, StoryDecision } from '@/types/entities';
import { EvidenceList } from './EvidenceList';
import { OutputRecommendations } from './OutputRecommendations';
import { TagEditor } from './TagEditor';

interface DecisionPanelProps {
  decision: StoryDecision;
  onDecisionChange: (next: StoryDecision) => void;
  onSave: () => void;
  disabled: boolean;
  tagGroups: { category: { id: string; name: string }; tags: { id: string; label: string; category_id: string }[] }[];
  selectedTagIds: string[];
  onTagToggle: (tagId: string) => void;
  evidence: EvidenceItem[];
  outputs: OutputRecommendation[];
}

export function DecisionPanel({
  decision,
  onDecisionChange,
  onSave,
  disabled,
  tagGroups,
  selectedTagIds,
  onTagToggle,
  evidence,
  outputs,
}: DecisionPanelProps) {
  function patch(field: keyof StoryDecision, value: string) {
    onDecisionChange({ ...decision, [field]: value });
  }

  return (
    <div className="panel space-y-4">
      <h2 className="section-title">Decision / Tags / Evidence</h2>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Tags</h3>
        <TagEditor groups={tagGroups} selectedTagIds={selectedTagIds} onToggle={onTagToggle} />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="label">Decision</label>
          <select className="input" value={decision.decision} onChange={(event) => patch('decision', event.target.value)}>
            <option value="review">Review</option>
            <option value="approve">Approve</option>
            <option value="hold">Hold</option>
            <option value="reject">Reject</option>
          </select>
        </div>
        <div>
          <label className="label">Workflow status</label>
          <select
            className="input"
            value={decision.workflow_status}
            onChange={(event) => patch('workflow_status', event.target.value)}
          >
            <option value="analysis_ready">Analysis Ready</option>
            <option value="leader_review">Leader Review</option>
            <option value="decision_saved">Decision Saved</option>
          </select>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="label">Priority</label>
          <select className="input" value={decision.priority} onChange={(event) => patch('priority', event.target.value)}>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="label">Owner</label>
          <input className="input" value={decision.owner} onChange={(event) => patch('owner', event.target.value)} />
        </div>
      </div>

      <div>
        <label className="label">Leader notes</label>
        <textarea
          className="input min-h-24"
          value={decision.leader_notes}
          onChange={(event) => patch('leader_notes', event.target.value)}
        />
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Evidence</h3>
        <EvidenceList items={evidence} />
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Output recommendations</h3>
        <OutputRecommendations items={outputs} />
      </div>

      <button
        className="w-full rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
        onClick={onSave}
        disabled={disabled}
      >
        Save decision
      </button>
    </div>
  );
}
