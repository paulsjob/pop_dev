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
          className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-slate-300"
        >
          <p className="text-base text-slate-800">{output.output_type}</p>
          <p className="mt-1 text-sm text-slate-500">Confidence {(output.confidence * 100).toFixed(0)}%</p>
        </button>
      ))}
    </div>
  );
}
