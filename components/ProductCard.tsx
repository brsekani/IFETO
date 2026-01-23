import Image from "next/image";
import shoppingCart from "@/assets/icons/shopping-cart.svg";
import { formatPriceKeepSymbol } from "@/utils/formatPrice";
import { useAddToCart } from "@/hooks/useAddToCart";
import Link from "next/link";

export default function ProductCard({
  product,
  index,
}: {
  product: any;
  index: number;
}) {
  const { handleAddToCart, alreadyInCart, isLoading, isAuthenticated } =
    useAddToCart({ product });

  return (
    <div
      key={index}
      className="rounded-2xl border-[0.6px] border-[#EFEEEE] bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-w-[280px] max-w-[302px] w-full"
    >
      <Link href={`/products/${product.id}`}>
        <div className="w-full h-[150px] relative rounded-tr-2xl rounded-tl-2xl overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover pb-[14.56px]"
          />
        </div>

        <div className="px-4 ">
          <span className="inline-block bg-[#ADFFD0] text-[#2A2A2A] px-3 py-1.5 rounded-full text-[12px] leading-[18px] mb-4 w-fit truncate max-w-full">
            {product.category.name}
          </span>

          <div className="mb-4 space-y-2">
            <h3 className="md:text-[20px] text-[18px] md:leading-[30px] leading-7 font-medium text-[#2A2A2A] line-clamp-1">
              {product.name}
            </h3>
            <p className="md:text-[15px] text-[12px] md:leading-5 leading-[18px] text-[#787878] line-clamp-3">
              {product.description}
            </p>
          </div>
        </div>
      </Link>

      <div className="flex md:items-center items-start justify-between flex-col md:flex-row gap-2.5 md:gap-0 pb-4 px-4">
        <p className="md:text-[20px] text-[18px] leading-7 md:leading-[30px] md:font-medium font-semibold text-[#2A2A2A]">
          {formatPriceKeepSymbol(product.price)}
        </p>
        <button
          onClick={handleAddToCart}
          disabled={alreadyInCart || (isAuthenticated && isLoading)}
          className={`bg-[#27AE60] text-[#FFFFFF] text-[18px] leading-7 font-semibold cursor-pointer w-full md:w-fit md:px-5 py-2.5 rounded-[6px] flex items-center gap-1 justify-center disabled:cursor-default ${
            alreadyInCart
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-[#1F8A4E] cursor-pointer"
          }`}
        >
          <Image
            src={shoppingCart}
            alt=""
            className="w-4.5 h-4.5 block md:hidden"
          />{" "}
          <span>{alreadyInCart ? "In Cart" : "Add to Cart"}</span>
        </button>
      </div>
    </div>
  );
}
