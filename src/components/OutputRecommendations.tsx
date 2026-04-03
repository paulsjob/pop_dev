import { OutputRecommendation } from '@/types/entities';

export function OutputRecommendations({ items }: { items: OutputRecommendation[] }) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={`${item.trigger_key}-${index}`} className="rounded border border-slate-700 bg-slate-950 p-3 text-sm">
          <div className="font-medium text-slate-200">{item.output_type}</div>
          <div className="text-xs text-slate-400">Confidence: {Math.round(item.confidence * 100)}%</div>
          <div className="text-xs text-sky-300">Trigger: {item.trigger_key}</div>
        </div>
      ))}
    </div>
  );
}
