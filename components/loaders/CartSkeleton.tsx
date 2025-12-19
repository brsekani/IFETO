import React from "react";

export default function CartSkeleton() {
  return (
    <div className="flex flex-col h-screen animate-pulse">
      {/* Header */}
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-6 w-6 bg-gray-200 rounded" />
      </div>

      {/* Select all */}
      <div className="px-6 py-[18px] flex items-center gap-3">
        <div className="w-6 h-6 bg-gray-200 rounded" />
        <div className="h-4 w-40 bg-gray-200 rounded" />
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="px-6 py-4 flex items-center gap-4 border-b">
            {/* Checkbox + image */}
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-gray-200 rounded" />
              <div className="bg-gray-200 w-20 h-[58px] rounded" />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3">
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-5 w-1/3 bg-gray-200 rounded" />

              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 bg-gray-200 rounded" />
                  <div className="w-7 h-7 bg-gray-200 rounded" />
                  <div className="w-6 h-6 bg-gray-200 rounded" />
                </div>

                <div className="w-6 h-6 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 space-y-3">
        <div className="h-4 w-20 bg-gray-200 rounded ml-auto" />
        <div className="h-6 w-32 bg-gray-200 rounded ml-auto" />
        <div className="h-12 w-full bg-gray-200 rounded" />
        <div className="h-12 w-full bg-gray-200 rounded" />
      </div>
    </div>
  );
}
