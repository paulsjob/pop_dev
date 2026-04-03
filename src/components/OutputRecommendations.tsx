import { OutputRecommendation } from '@/types/entities';

export function OutputRecommendations({
  items,
  onTrigger,
}: {
  items: OutputRecommendation[];
  onTrigger?: (triggerKey: string) => void;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={`${item.trigger_key}-${index}`} className="rounded border border-slate-700 bg-slate-950 p-3 text-sm">
          <div className="font-medium text-slate-200">{item.output_type}</div>
          <div className="text-xs text-slate-400">Confidence: {Math.round(item.confidence * 100)}%</div>
          <div className="mt-1 flex items-center justify-between gap-2">
            <div className="text-xs text-sky-300">Trigger: {item.trigger_key}</div>
            {item.trigger_key && onTrigger && (
              <button
                type="button"
                className="rounded border border-fuchsia-500/50 bg-fuchsia-950/50 px-2 py-1 text-xs font-medium text-fuchsia-200 hover:bg-fuchsia-900/60"
                onClick={() => onTrigger(item.trigger_key)}
              >
                Trigger POP
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
