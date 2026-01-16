export default function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#EFEEEE] bg-white shadow-sm flex flex-col min-w-[105px] md:min-w-[280px] animate-pulse">
      {/* Image */}
      <div className="h-[150px] bg-gray-200 rounded-t-2xl" />

      <div className="p-4 space-y-3">
        {/* Category pill */}
        <div className="h-4 w-24 bg-gray-200 rounded-full" />

        {/* Title */}
        <div className="h-5 w-3/4 bg-gray-200 rounded" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-5/6 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 flex items-center justify-between gap-3">
        <div className="h-5 w-16 bg-gray-200 rounded" />
        <div className="h-10 w-full md:w-28 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
}
