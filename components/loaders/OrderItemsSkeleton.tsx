import React from "react";

export default function OrderItemsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="flex gap-4 items-center p-2 lg:py-5 lg:px-6 border-b border-[#EFEEEE]"
        >
          {/* Image skeleton */}
          <div className="w-20 h-20 lg:w-[112px] lg:h-[112px] bg-gray-200 rounded lg:rounded-lg shrink-0" />

          {/* Content */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 lg:h-5 w-40 bg-gray-300 rounded" />
              <div className="h-4 lg:h-5 w-20 bg-gray-300 rounded" />
            </div>

            <div className="h-3 lg:h-4 w-24 bg-gray-200 rounded" />

            <div className="flex justify-end">
              <div className="h-5 lg:h-6 w-28 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
