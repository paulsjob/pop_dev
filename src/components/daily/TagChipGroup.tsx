interface TagChipGroupProps {
  tags: string[];
}

export function TagChipGroup({ tags }: TagChipGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="rounded-full bg-stone-100 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-stone-700">
          {tag}
        </span>
      ))}
    </div>
  );
}
