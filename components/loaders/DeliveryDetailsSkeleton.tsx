import React from "react";

export default function DeliveryDetailsSkeleton() {
  return (
    <div className="bg-[#FFFFFF] md:p-6 p-4 shadow-custom2 rounded-2xl space-y-4 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-48 bg-gray-200 rounded" />
        <div className="flex gap-2">
          <div className="h-8 w-24 bg-gray-200 rounded" />
          <div className="h-8 w-24 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="h-5 w-40 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
