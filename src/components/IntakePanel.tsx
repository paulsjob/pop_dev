import { Urgency } from '@/types/entities';

interface IntakePanelProps {
  values: {
    pasted_input: string;
    source_type: string;
    source_name: string;
    title: string;
    raw_text: string;
    urgency: Urgency;
    submission_notes: string;
  };
  hints: {
    detectedType: 'url' | 'text' | 'transcript' | null;
    detectedSourceName?: string;
    detectedTitle?: string;
    appliedFields: string[];
  };
  disabled: boolean;
  onChange: (field: keyof IntakePanelProps['values'], value: string) => void;
  onAnalyze: () => void;
  onSaveDraft: () => void;
}

export function IntakePanel({ values, hints, disabled, onChange, onAnalyze, onSaveDraft }: IntakePanelProps) {
  return (
    <div className="panel space-y-4">
      <h2 className="section-title">Intake</h2>

      <div className="rounded-md border border-sky-700/40 bg-sky-900/10 p-3">
        <label className="label">Paste URL, article, or transcript</label>
        <textarea
          className="input min-h-24"
          placeholder="Drop anything here and fields auto-fill as patterns are detected..."
          value={values.pasted_input}
          onChange={(event) => onChange('pasted_input', event.target.value)}
        />
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          {hints.detectedType && <span className="rounded bg-slate-800 px-2 py-1 text-slate-200">Detected: {hints.detectedType}</span>}
          {hints.detectedSourceName && (
            <span className="rounded bg-slate-800 px-2 py-1 text-slate-200">Source: {hints.detectedSourceName}</span>
          )}
          {hints.detectedTitle && <span className="rounded bg-slate-800 px-2 py-1 text-slate-200">Title found</span>}
          {hints.appliedFields.length > 0 && (
            <span className="rounded bg-emerald-900/40 px-2 py-1 text-emerald-200">Auto-filled: {hints.appliedFields.join(', ')}</span>
          )}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="label">Source type</label>
          <select
            className="input"
            value={values.source_type}
            onChange={(event) => onChange('source_type', event.target.value)}
          >
            <option value="url">URL</option>
            <option value="text">Text</option>
            <option value="transcript">Transcript</option>
          </select>
        </div>
        <div>
          <label className="label">Urgency</label>
          <select className="input" value={values.urgency} onChange={(event) => onChange('urgency', event.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      <div>
        <label className="label">Source name</label>
        <input className="input" value={values.source_name} onChange={(event) => onChange('source_name', event.target.value)} />
      </div>

      <div>
        <label className="label">Headline / title</label>
        <input className="input" value={values.title} onChange={(event) => onChange('title', event.target.value)} />
      </div>

      <div>
        <label className="label">Raw text</label>
        <textarea
          className="input min-h-28"
          value={values.raw_text}
          onChange={(event) => onChange('raw_text', event.target.value)}
        />
      </div>

      <div>
        <label className="label">Submission notes</label>
        <textarea
          className="input min-h-20"
          value={values.submission_notes}
          onChange={(event) => onChange('submission_notes', event.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          className="rounded-md bg-sky-600 px-3 py-2 text-sm font-medium hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={onAnalyze}
          disabled={disabled}
        >
          Analyze Story
        </button>
        <button
          className="rounded-md border border-slate-600 px-3 py-2 text-sm font-medium hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={onSaveDraft}
          disabled={disabled}
        >
          Save Draft
        </button>
      </div>
    </div>
  );
}
