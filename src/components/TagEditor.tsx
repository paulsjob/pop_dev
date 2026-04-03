import { useState } from 'react';
import { Tag, TagCategory } from '@/types/entities';

interface TagEditorProps {
  groups: { category: TagCategory; tags: Tag[] }[];
  selectedTagIds: string[];
  onToggle: (tagId: string) => void;
  onClearCategory: (categoryId: string) => void;
}

export function TagEditor({ groups, selectedTagIds, onToggle, onClearCategory }: TagEditorProps) {
  const [filter, setFilter] = useState('');

  return (
    <div className="space-y-3">
      <input
        className="input"
        placeholder="Filter tags..."
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />

      {groups.map((group) => {
        const visibleTags = group.tags.filter((tag) => tag.label.toLowerCase().includes(filter.toLowerCase()));
        const selectedInCategory = group.tags.filter((tag) => selectedTagIds.includes(tag.id)).length;

        return (
          <div key={group.category.id} className="rounded-md border border-slate-700 bg-slate-950/60 p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                {group.category.name} <span className="text-slate-500">({selectedInCategory})</span>
              </h4>
              {selectedInCategory > 0 && (
                <button
                  className="text-[11px] text-sky-300 hover:text-sky-200"
                  onClick={() => onClearCategory(group.category.id)}
                  type="button"
                >
                  Clear category
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {visibleTags.map((tag) => {
                const active = selectedTagIds.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    className={`rounded-md border px-2 py-1 text-xs transition ${
                      active
                        ? 'border-sky-500 bg-sky-900/30 text-sky-200'
                        : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500'
                    }`}
                    onClick={() => onToggle(tag.id)}
                    type="button"
                  >
                    {tag.label}
                  </button>
                );
              })}
              {visibleTags.length === 0 && <span className="text-xs text-slate-500">No matching tags in this category.</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
