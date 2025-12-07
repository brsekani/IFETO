import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductSectionProps {
  title: string;
  link: string;
  products: Product[];
}

export default function ProductSection({
  title,
  products,
  link,
}: ProductSectionProps) {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 md:px-20">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[20px] md:text-[32px] md:leading-[38px] leading-[30px] font-semibold text-[#2A2A2A]">
          {title}
        </h2>
        <Link
          href={link}
          className="text-[#27AE60] text-[16px] md:text-[18px] md:leading-7 leading-6 font-medium hover:underline"
        >
          View all
        </Link>
      </div>

      {/* GRID */}
      <div className="flex items-center overflow-x-scroll gap-6">
        {products.map((product, index) => (
          <ProductCard product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
