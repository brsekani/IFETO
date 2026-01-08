export default function OrderSummarySkeleton() {
  return (
    <div className="bg-[#E3FFEF4D] p-4 md:space-y-4 space-y-3 rounded-md animate-pulse">
      {/* Subtotal */}
      <div className="flex justify-between">
        <div className="h-4 w-24 bg-[#D1E8DC] rounded" />
        <div className="h-4 w-20 bg-[#D1E8DC] rounded" />
      </div>

      {/* Weight */}
      <div className="flex justify-between">
        <div className="h-4 w-16 bg-[#D1E8DC] rounded" />
        <div className="h-4 w-12 bg-[#D1E8DC] rounded" />
      </div>

      {/* Weight fee */}
      <div className="flex justify-between">
        <div className="h-4 w-28 bg-[#D1E8DC] rounded" />
        <div className="h-4 w-16 bg-[#D1E8DC] rounded" />
      </div>

      {/* Total */}
      <div className="flex justify-between pt-2">
        <div className="h-6 w-20 bg-[#C0E4D0] rounded" />
        <div className="h-6 w-24 bg-[#C0E4D0] rounded" />
      </div>
    </div>
  );
}
