export default function ContactSkeleton() {
  return (
    <div className="md:p-6 p-4 bg-[#E3FFEF4D] shadow-custom2 w-full animate-pulse">
      {/* Title */}
      <div className="h-6 w-24 bg-[#D1E8DC] rounded mb-4" />

      {/* Name */}
      <div className="h-5 w-40 bg-[#C0E4D0] rounded mb-2" />

      {/* Email */}
      <div className="h-4 w-56 bg-[#D1E8DC] rounded mb-1.5" />

      {/* Phone */}
      <div className="h-4 w-32 bg-[#D1E8DC] rounded" />
    </div>
  );
}
