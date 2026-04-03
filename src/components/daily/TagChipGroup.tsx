interface TagChipGroupProps {
  tags: string[];
}

export function TagChipGroup({ tags }: TagChipGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700">
          {tag}
        </span>
      ))}
    </div>
  );
}
