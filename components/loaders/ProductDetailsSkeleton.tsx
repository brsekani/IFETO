// components/ProductDetailsSkeleton.tsx

import Skeleton from "./Skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <div className="bg-[#FAFAFA]">
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-20 pt-6 pb-20">
        {/* Breadcrumbs */}
        <div className="flex gap-2 mb-6">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-6" />
          <Skeleton className="h-5 w-20" />
        </div>

        {/* Main section */}
        <div className="flex md:flex-row flex-col md:gap-20 gap-6">
          {/* Image */}
          <Skeleton className="w-full md:w-[400px] h-[350px]" />

          {/* Details */}
          <div className="flex-1 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />

            <Skeleton className="h-12 w-40" />

            <Skeleton className="h-12 w-full" />
          </div>
        </div>

        {/* Description */}
        <div className="mt-12 space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}
