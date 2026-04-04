import { OutputRecommendation } from '@/types/entities';

interface OutputActionCardsProps {
  outputs: OutputRecommendation[];
  onGenerate: (trigger: string) => void;
}

const outputIconMap: Record<string, string> = {
  youtube: '🎬',
  vertical: '📱',
  short: '🎞️',
  thread: '🧵',
  brief: '🗒️',
  graphic: '🧩',
  pop: '✨',
};

function iconForOutput(label: string) {
  const lower = label.toLowerCase();
  const match = Object.entries(outputIconMap).find(([key]) => lower.includes(key));
  return match?.[1] ?? '🛠️';
}

export function OutputActionCards({ outputs, onGenerate }: OutputActionCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {outputs.map((output) => (
        <button
          key={output.trigger_key}
          onClick={() => onGenerate(output.trigger_key)}
          className="group rounded-[1.4rem] border border-stone-200/70 bg-white p-5 text-left transition hover:border-stone-300 hover:shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
        >
          <div className="flex items-start justify-between gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-50 text-xl">{iconForOutput(output.output_type)}</span>
            <span className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[0.64rem] uppercase tracking-[0.15em] text-stone-600">
              {(output.confidence * 100).toFixed(0)}%
            </span>
          </div>
          <p className="mt-4 text-base font-medium text-stone-900">{output.output_type}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-500">Trigger output</p>
        </button>
      ))}
    </div>
  );
}
