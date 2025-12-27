import arrowRight from "@/assets/icons/arrow-right1.svg";
import arrowDown from "@/assets/icons/arrow-down-black.svg";
import Fruits from "@/assets/images/Fruits Image.png";
import ProductImageCarousel from "@/components/ProductImageCarousel";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import QuantityBox from "@/components/QuantityBox";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const options = [
  {
    id: "1kg",
    label: "1kg Half Paint Bucket",
    price: 24.99,
  },
  {
    id: "2kg",
    label: "2kg Paint Bucket",
    price: 44.99,
  },
  {
    id: "5kg",
    label: "5kg Paint Bucket",
    price: 89.99,
  },
];

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  return (
    <div className="bg-[#FAFAFA]">
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-20 pt-6 pb-20">
        <div className="flex">
          <div className="py-2 px-4 text-[16px] leading-6 font-semibold text-[#5A5A5A]">
            Home
          </div>
          <Image src={arrowRight} alt="arrowRight" />
          <div className="py-2 px-4 text-[16px] leading-6 font-semibold text-[#5A5A5A]">
            Grains
          </div>

          <Image src={arrowRight} alt="arrowRight" />
          <div className="py-2 px-4 text-[16px] leading-6 font-semibold text-[#27AE60]">
            Yellow Garri
          </div>
        </div>

        <div className="flex items-center gap-20 w-full">
          <ProductImageCarousel />
          <div className="text-[#2A2A2A] w-full">
            <div className="font-semibold">
              <h1 className="text-[36px] leading-11 tracking-[-2%]">
                Yellow Garri
              </h1>
              <p className="text-[18px] leading-7">
                $24.99 - $29.99 (2kg - 4Kg)
              </p>
            </div>

            <div className="grid gap-1 w-full">
              <Label
                htmlFor="options"
                className="text-[14px] leading-5 font-semibold"
              >
                Options ({options.length} options in stock)
              </Label>

              <Select defaultValue={options[0]?.id}>
                <SelectTrigger
                  id="options"
                  className="min-h-14 px-4 py-[18px] w-full [&>svg]:hidden"
                >
                  <SelectValue className="leading-[18px] text-[12px]" />

                  <Image
                    src={arrowDown}
                    alt="arrow"
                    className="ml-auto"
                    width={16}
                    height={16}
                  />
                </SelectTrigger>

                <SelectContent>
                  {options.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id}>
                      {opt.label} – ${opt.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <QuantityBox unitPrice={24.99} unitWeight={1} />

            <button>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
