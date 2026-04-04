interface TagChipGroupProps {
  tags: string[];
}

const signalIconMap: Record<string, string> = {
  breaking: '⚡',
  swing: '⏳',
  regional: '🗺️',
  transit: '🚆',
  education: '🎓',
  healthcare: '🩺',
  war: '🛡️',
  conflict: '🚨',
  economy: '💵',
  cost: '🧾',
  housing: '🏠',
  climate: '🌿',
  corporate: '🏢',
  monopoly: '🏗️',
  democracy: '🗳️',
  voting: '☑️',
  youth: '📱',
  urgency: '⏱️',
  risk: '⚠️',
  youtube: '▶️',
};

function iconForTag(tag: string) {
  const lower = tag.toLowerCase();
  const match = Object.entries(signalIconMap).find(([key]) => lower.includes(key));
  return match?.[1] ?? '✦';
}

export function TagChipGroup({ tags }: TagChipGroupProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {tags.map((tag, index) => {
        const confidence = Math.max(58, 92 - index * 6);
        return (
          <article key={tag} className="rounded-2xl border border-stone-200/70 bg-white p-4 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-50 text-lg">{iconForTag(tag)}</span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-stone-800">{tag}</p>
                <p className="text-[0.62rem] uppercase tracking-[0.2em] text-stone-500">Signal confidence {confidence}%</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
