import { EvidenceItem } from '@/types/entities';

interface EvidenceTrailProps {
  evidence: EvidenceItem[];
}

export function EvidenceTrail({ evidence }: EvidenceTrailProps) {
  return (
    <div className="space-y-4">
      {evidence.map((item) => (
        <article key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h4 className="text-base text-slate-800">{item.title}</h4>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
