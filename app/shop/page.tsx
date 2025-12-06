import ProductCard from "@/components/ProductCard";
import ProductCardShop from "@/components/ProductCardShop";

export default function page() {
  const products = [
    {
      id: 1,
      name: "Irish Potatoes",
      price: 24.99,
      category: "Tubers & Nuts",
      description:
        "Premium Irish potatoes with a mild, earthy flavor. Excellent for mashing, roasting, or boiling.",
      image: "/images/products/irish-potatoes.png",
    },
    {
      id: 2,
      name: "Cabbage",
      price: 24.99,
      category: "Fruits & Vegetables",
      description:
        "Fresh, firm heads perfect for coleslaw, stir-fries, or steaming. Adds bulk and crunch to any meal.",
      image: "/images/products/cabbage.png",
    },
    {
      id: 3,
      name: "Okro",
      price: 24.99,
      category: "Fruits & Vegetables",
      description:
        "Perfect for soups, stews, and thickening sauces. Essential for traditional Nigerian dishes.",
      image: "/images/products/irish-potatoes.png",
    },
    {
      id: 4,
      name: "Yellow Garri",
      price: 24.99,
      category: "Grains",
      description:
        "Toasted fermented cassava flakes. Suitable for soaking or making Eba.",
      image: "/images/products/irish-potatoes.png",
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-20 pt-8 pb-20">
      <h1 className="text-[32px] leading-[38px] text-[#2A2A2A] font-semibold">
        All Items
      </h1>

      <div className="grid grid-cols-2 xl:grid-cols-4 md:gap-6 gap-3">
        {products.map((product, index) => (
          <ProductCardShop product={product} index={index} />
        ))}
      </div>
    </div>
  );
}
