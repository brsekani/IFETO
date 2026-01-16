import React from "react";

export default function CartPageLoader() {
  return (
    <div className="bg-[#FAFAFA] animate-pulse">
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-20 md:pt-6 pb-20 space-y-[17px]">
        {/* Title */}
        <div className="h-8 w-40 bg-gray-200 rounded" />

        <div className="flex items-start md:flex-row flex-col w-full gap-6">
          {/* Cart Items */}
          <div className="bg-white p-6 rounded-2xl w-full md:max-w-[732px] space-y-6">
            <div className="h-5 w-48 bg-gray-200 rounded" />

            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex gap-4 py-4 border-b">
                <div className="h-[58px] w-20 bg-gray-200 rounded" />

                <div className="flex-1 space-y-3">
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                  <div className="h-5 w-1/3 bg-gray-200 rounded" />
                  <div className="h-4 w-1/4 bg-gray-200 rounded" />

                  <div className="flex justify-between mt-4">
                    <div className="flex gap-2">
                      <div className="h-6 w-6 bg-gray-200 rounded" />
                      <div className="h-6 w-6 bg-gray-200 rounded" />
                      <div className="h-6 w-6 bg-gray-200 rounded" />
                    </div>

                    <div className="flex gap-4">
                      <div className="h-6 w-6 bg-gray-200 rounded" />
                      <div className="h-6 w-6 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-4 rounded-2xl w-full md:max-w-[524px] space-y-6">
            <div className="h-6 w-40 bg-gray-200 rounded" />

            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>
            ))}

            <div className="h-6 w-full bg-gray-300 rounded" />
            <div className="h-12 w-full bg-gray-300 rounded" />
            <div className="h-12 w-full bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
