import { EditorialScores } from '@/types/entities';

export function ScoreCardGrid({ scores }: { scores: EditorialScores }) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {Object.entries(scores).map(([key, value]) => (
        <div key={key} className="rounded border border-slate-700 bg-slate-950 p-2">
          <div className="text-[10px] uppercase tracking-wide text-slate-400">{key.replace('_', ' ')}</div>
          <div className="text-lg font-semibold text-sky-300">{value}</div>
        </div>
      ))}
    </div>
  );
}
