import { EvidenceItem } from '@/types/entities';

export function EvidenceList({ items }: { items: EvidenceItem[] }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="rounded border border-slate-700 bg-slate-950 p-3 text-sm">
          <div className="font-medium">{item.title}</div>
          <div className="text-slate-300">{item.excerpt}</div>
          {item.source_url && (
            <a className="text-xs text-sky-300 hover:underline" href={item.source_url} target="_blank" rel="noreferrer">
              {item.source_url}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
