import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductSectionSkeleton({
  cards = 5,
}: {
  cards?: number;
}) {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 md:px-20 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-48 bg-gray-200 rounded" />
        <div className="h-5 w-20 bg-gray-200 rounded" />
      </div>

      {/* Cards */}
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: cards }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
