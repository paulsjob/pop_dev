import { useState } from 'react';
import { EvidenceItem } from '@/types/entities';

export function EvidenceList({ items }: { items: EvidenceItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div key={item.id} className="rounded border border-slate-700 bg-slate-950 p-3 text-sm">
            <div className="font-medium">{item.title}</div>
            <div className="text-slate-300">{item.excerpt}</div>
            <div className="mt-2 flex items-center justify-between gap-2">
              {item.source_url ? (
                <a className="text-xs text-sky-300 hover:underline" href={item.source_url} target="_blank" rel="noreferrer">
                  {item.source_url}
                </a>
              ) : (
                <span className="text-xs text-slate-500">No source URL</span>
              )}
              <button
                type="button"
                className="rounded border border-slate-600 px-2 py-1 text-xs text-slate-200 hover:bg-slate-800"
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                {isOpen ? 'Hide Evidence' : 'View Evidence'}
              </button>
            </div>
            {isOpen && (
              <div className="mt-2 rounded border border-slate-700 bg-slate-900 p-2 text-xs text-slate-300">
                Mock evidence viewer: this would open the full excerpt, source context, and extraction metadata.
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
