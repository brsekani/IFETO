import React from "react";

export default function OrderReceiptSkeleton() {
  return (
    <div className="lg:mt-16 mt-6 shadow-custom2 p-4 lg:p-6 rounded-2xl bg-white animate-pulse">
      {/* Title */}
      <div className="h-6 w-40 bg-gray-200 rounded mb-4" />

      {/* Rows */}
      <div className="space-y-3">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex gap-3 items-center">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
