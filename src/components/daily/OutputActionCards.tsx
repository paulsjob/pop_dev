import { OutputRecommendation } from '@/types/entities';

interface OutputActionCardsProps {
  outputs: OutputRecommendation[];
  onGenerate: (trigger: string) => void;
}

export function OutputActionCards({ outputs, onGenerate }: OutputActionCardsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {outputs.map((output) => (
        <button
          key={output.trigger_key}
          onClick={() => onGenerate(output.trigger_key)}
          className="rounded-2xl border border-stone-200/90 bg-stone-50/45 p-4 text-left transition hover:border-stone-300 hover:bg-stone-50"
        >
          <p className="text-base font-medium text-stone-800">{output.output_type}</p>
          <p className="mt-1 font-mono text-xs tracking-[0.04em] text-stone-500">Confidence {(output.confidence * 100).toFixed(0)}%</p>
        </button>
      ))}
    </div>
  );
}
