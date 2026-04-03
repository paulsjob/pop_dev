import { Tag, TagCategory } from '@/types/entities';

interface TagSystemPanelProps {
  categories: TagCategory[];
  tags: Tag[];
}

export function TagSystemPanel({ categories, tags }: TagSystemPanelProps) {
  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-sm uppercase tracking-[0.18em] text-slate-500">Tag system</h3>
      {categories.map((category) => (
        <div key={category.id} className="space-y-2">
          <h4 className="text-base text-slate-700">{category.name}</h4>
          <div className="flex flex-wrap gap-2">
            {tags
              .filter((tag) => tag.category_id === category.id)
              .map((tag) => (
                <span key={tag.id} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                  {tag.label}
                </span>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}
