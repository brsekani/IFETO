export default function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border-[0.6px] border-[#EFEEEE] bg-white shadow-sm flex flex-col justify-between md:min-w-[280px] min-w-[105px] w-full animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-[150px] bg-[#F2F2F2] rounded-t-2xl" />

      <div className="p-4 space-y-4">
        {/* Category */}
        <div className="w-24 h-5 bg-[#E5E5E5] rounded-full" />

        {/* Title */}
        <div className="space-y-2">
          <div className="w-3/4 h-4 bg-[#E5E5E5] rounded" />
          <div className="w-full h-3 bg-[#E5E5E5] rounded" />
          <div className="w-2/3 h-3 bg-[#E5E5E5] rounded" />
        </div>

        {/* Price + Button */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="w-16 h-4 bg-[#E5E5E5] rounded" />
          <div className="w-full md:w-28 h-9 bg-[#E5E5E5] rounded-md" />
        </div>
      </div>
    </div>
  );
}
