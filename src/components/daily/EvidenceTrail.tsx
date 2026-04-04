import { EvidenceItem } from '@/types/entities';

interface EvidenceTrailProps {
  evidence: EvidenceItem[];
}

export function EvidenceTrail({ evidence }: EvidenceTrailProps) {
  return (
    <div className="space-y-3.5">
      {evidence.map((item, index) => (
        <details key={item.id} className="group rounded-2xl border border-stone-200/75 bg-white p-4 open:shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-50 text-sm">❝</span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-stone-800">{item.title}</p>
                <p className="text-[0.62rem] uppercase tracking-[0.18em] text-stone-500">Source {index + 1}</p>
              </div>
            </div>
            <span className="text-xs text-stone-500 transition group-open:rotate-180">⌄</span>
          </summary>
          <div className="mt-3 rounded-xl bg-stone-50/70 p-3.5 text-sm leading-7 text-stone-700">{item.excerpt}</div>
        </details>
      ))}
    </div>
  );
}
