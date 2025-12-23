export default function FilterDropdownSkeleton() {
  return (
    <div
      className="
        flex items-center gap-2
        border border-[#E5E5E5]
        rounded-lg
        px-5 py-2.5
        w-fit
        animate-pulse
      "
    >
      {/* Icon */}
      <div className="w-[18px] h-[18px] bg-gray-300 rounded" />

      {/* Text */}
      <div className="w-10 h-4 bg-gray-300 rounded" />

      {/* Arrow */}
      <div className="w-[16px] h-[16px] bg-gray-300 rounded" />
    </div>
  );
}
