export function FilterDropdownListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between px-2 py-4 animate-pulse"
        >
          <div className="w-24 h-4 bg-gray-300 rounded" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
        </div>
      ))}
    </div>
  );
}
