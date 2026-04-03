interface StoryInputScreenProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  onOpenSettings: () => void;
}

export function StoryInputScreen({ value, onChange, onAnalyze, onOpenSettings }: StoryInputScreenProps) {
  return (
    <section className="mx-auto flex min-h-[82vh] w-full max-w-3xl flex-col justify-center gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-sm uppercase tracking-[0.2em] text-slate-500">MD Editorial Engine</h1>
        <button className="text-sm text-slate-500 transition hover:text-slate-700" onClick={onOpenSettings}>
          Settings
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-4xl leading-tight text-slate-800">Paste a link, post, transcript, or story text</h2>
        <p className="text-lg text-slate-500">
          We&apos;ll detect the source, extract the content, and generate a full editorial recommendation.
        </p>
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Drop one URL, one post, one transcript, or one summary here..."
        className="min-h-64 w-full rounded-3xl border border-slate-200 bg-white p-6 text-lg leading-relaxed text-slate-700 shadow-sm outline-none transition focus:border-slate-400"
      />

      <div>
        <button
          onClick={onAnalyze}
          disabled={!value.trim()}
          className="rounded-full bg-slate-800 px-7 py-3 text-base text-white transition enabled:hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Analyze story
        </button>
      </div>
    </section>
  );
}
