// CartLoading.tsx
const CartLoading = () => {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* Cart items */}
      {[1, 2, 3].map((_, i) => (
        <div key={i} className="flex gap-4 border-b py-4 md:px-6">
          <div className="h-20 w-20 bg-gray-200 rounded-md" />

          <div className="flex-1 space-y-3">
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
            <div className="h-4 w-1/4 bg-gray-200 rounded" />
          </div>

          <div className="h-10 w-24 bg-gray-200 rounded" />
        </div>
      ))}

      {/* Summary */}
      <div className="mt-8 rounded-lg border p-6 space-y-4">
        <div className="h-4 w-1/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        <div className="h-12 w-full bg-gray-300 rounded-md" />
      </div>
    </div>
  );
};

export default CartLoading;
