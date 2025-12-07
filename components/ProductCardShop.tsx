import Image from "next/image";
import shoppingCart from "@/assets/icons/shopping-cart.svg";

export default function ProductCardShop({
  product,
  index,
}: {
  product: any;
  index: number;
}) {
  return (
    <div
      key={index}
      className="rounded-2xl border-[0.6px] border-[#EFEEEE] bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between md:min-w-[280px] min-w-[105px] w-full"
    >
      <div className="w-full h-[150px] relative ">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain py-[14.56px] px-[13.78px]"
        />
      </div>

      <div className="p-4">
        <span className="inline-block bg-[#ADFFD0] text-[#2A2A2A] px-[7.93px] md:px-3 py-[3.96px] md:py-1.5 rounded-full text-[12px] leading-[18px] mb-4 w-fit truncate">
          {product.category}
        </span>

        <div className="mb-4 space-y-2">
          <h3 className="md:text-[20px] text-[14px] md:leading-[30px] leading-5 font-medium text-[#2A2A2A]">
            {product.name}
          </h3>
          <p className="text-[11.89px] md:text-[15px] md:leading-5 text-[#787878] line-clamp-3">
            {product.description}
          </p>
        </div>

        <div className="flex md:items-center items-start justify-between flex-col md:flex-row gap-[15.89px] md:gap-0">
          <p className="md:text-[20px] text-[12px] leading-[18px] md:leading-[30px] md:font-medium font-semibold text-[#2A2A2A]">
            ${product.price}
          </p>
          <button className="bg-[#27AE60] hover:bg-[#1F8A4E] text-[#FFFFFF] md:text-[18px] text-[14px] leading-7 font-semibold cursor-pointer w-full md:w-fit md:px-5 md:py-2.5 py-1.5 rounded-[6px] flex items-center gap-1 justify-center">
            <Image
              src={shoppingCart}
              alt=""
              className="w-3.5 h-3.5 block md:hidden"
            />{" "}
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
