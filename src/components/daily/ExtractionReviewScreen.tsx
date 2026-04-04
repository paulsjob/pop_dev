interface InferredStoryInput {
  sourceType: string;
  sourceName: string;
  headline: string;
  rawText: string;
  url: string | null;
  confidence: number;
}

interface ExtractionReviewScreenProps {
  inference: InferredStoryInput;
  onUpdate: (next: InferredStoryInput) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function ExtractionReviewScreen({ inference, onUpdate, onContinue, onBack }: ExtractionReviewScreenProps) {
  return (
    <section className="mx-auto flex min-h-[84vh] w-full max-w-3xl flex-col justify-center gap-7">
      <div className="space-y-3 rounded-3xl border border-stone-200 bg-white px-6 py-5 shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
        <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Quick check</p>
        <h2 className="text-2xl font-medium tracking-tight text-stone-800">We inferred this from your pasted input.</h2>
        <p className="text-sm text-stone-500">
          Make any fast correction if needed, then continue.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-stone-600">
          Source type
          <select
            value={inference.sourceType}
            onChange={(event) => onUpdate({ ...inference, sourceType: event.target.value })}
            className="rounded-2xl border border-stone-200 px-4 py-3 text-stone-700 outline-none focus:border-stone-300"
          >
            <option value="url">URL</option>
            <option value="article">Article</option>
            <option value="summary">Summary</option>
            <option value="transcript">Transcript</option>
            <option value="email">Email</option>
            <option value="text">Text</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm text-stone-600">
          Source name
          <input
            value={inference.sourceName}
            onChange={(event) => onUpdate({ ...inference, sourceName: event.target.value })}
            className="rounded-2xl border border-stone-200 px-4 py-3 text-stone-700 outline-none focus:border-stone-300"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm text-stone-600">
        Headline
        <input
          value={inference.headline}
          onChange={(event) => onUpdate({ ...inference, headline: event.target.value })}
          className="rounded-2xl border border-stone-200 px-4 py-3 text-stone-700 outline-none focus:border-stone-300"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-stone-600">
        Raw text
        <textarea
          value={inference.rawText}
          onChange={(event) => onUpdate({ ...inference, rawText: event.target.value })}
          className="min-h-48 rounded-3xl border border-stone-200 px-4 py-3 text-stone-700 outline-none focus:border-stone-300"
        />
      </label>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="rounded-full border border-stone-300 px-5 py-2.5 text-sm text-stone-600 transition hover:bg-stone-50"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          className="rounded-full bg-stone-800 px-6 py-2.5 text-sm font-medium text-stone-50 transition hover:bg-stone-700"
        >
          Continue to analysis
        </button>
      </div>
    </section>
  );
}
