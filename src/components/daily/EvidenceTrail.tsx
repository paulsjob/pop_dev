import { EvidenceItem } from '@/types/entities';

interface EvidenceTrailProps {
  evidence: EvidenceItem[];
}

export function EvidenceTrail({ evidence }: EvidenceTrailProps) {
  return (
    <div className="space-y-3.5">
      {evidence.map((item) => (
        <article key={item.id} className="rounded-2xl border border-stone-200/80 bg-stone-50/60 p-4">
          <h4 className="text-[0.98rem] font-medium text-stone-800">{item.title}</h4>
          <p className="mt-1.5 text-sm leading-7 text-stone-600">{item.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
