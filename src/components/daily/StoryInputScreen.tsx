interface StoryInputScreenProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  onOpenSettings: () => void;
}

export function StoryInputScreen({ value, onChange, onAnalyze, onOpenSettings }: StoryInputScreenProps) {
  return (
    <section className="mx-auto flex min-h-[84vh] w-full max-w-3xl flex-col justify-center gap-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xs uppercase tracking-[0.24em] text-stone-500">MD Editorial Engine</h1>
        <button className="text-sm text-stone-500 transition hover:text-stone-700" onClick={onOpenSettings}>
          Settings
        </button>
      </div>

      <div className="space-y-5">
        <h2 className="max-w-2xl text-[2.45rem] font-medium leading-[1.12] tracking-[-0.01em] text-stone-800">
          Paste a link, post, transcript, or story text
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-stone-500">
          We&apos;ll detect the source, extract the content, and generate a full editorial recommendation.
        </p>
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Drop one URL, one post, one transcript, or one summary here..."
        className="min-h-72 w-full rounded-[2rem] border border-stone-200/90 bg-white/90 px-7 py-6 text-[1.03rem] leading-[1.82] text-stone-700 shadow-[0_8px_28px_rgba(15,23,42,0.06)] outline-none transition placeholder:text-stone-400 focus:border-stone-300 focus:shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
      />

      <div>
        <button
          onClick={onAnalyze}
          disabled={!value.trim()}
          className="rounded-full bg-stone-800 px-8 py-3 text-sm font-medium tracking-[0.03em] text-stone-50 transition enabled:hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300"
        >
          Analyze story
        </button>
      </div>
    </section>
  );
}
