import { Tag, TagCategory } from '@/types/entities';

interface TagEditorProps {
  groups: { category: TagCategory; tags: Tag[] }[];
  selectedTagIds: string[];
  onToggle: (tagId: string) => void;
}

export function TagEditor({ groups, selectedTagIds, onToggle }: TagEditorProps) {
  return (
    <div className="space-y-3">
      {groups.map((group) => (
        <div key={group.category.id}>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{group.category.name}</h4>
          <div className="flex flex-wrap gap-2">
            {group.tags.map((tag) => {
              const active = selectedTagIds.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  className={`rounded-md border px-2 py-1 text-xs ${
                    active ? 'border-sky-500 bg-sky-900/30 text-sky-200' : 'border-slate-700 bg-slate-950 text-slate-300'
                  }`}
                  onClick={() => onToggle(tag.id)}
                  type="button"
                >
                  {tag.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
