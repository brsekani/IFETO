import React from "react";

export default function CartItemLoader() {
  return (
    <div className="flex md:gap-5 gap-3 border-t-[0.6px] border-[#CFCFCF] md:p-4 p-2.5 animate-pulse">
      {/* Image skeleton */}
      <div className="bg-[#EFEEEE] md:w-[84px] w-[49px] md:h-[57px] h-[38px] rounded-[6px]" />

      {/* Text skeleton */}
      <div className="flex-1 md:space-y-2 space-y-1">
        <div className="h-4 md:h-6 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 md:h-4 w-1/2 bg-gray-200 rounded" />
        <div className="h-4 md:h-6 w-1/4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
