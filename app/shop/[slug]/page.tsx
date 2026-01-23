// app/shop/[slug]/page.tsx
import ShopClientSlug from "./ShopClientSlug";

export default async function ShopCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ShopClientSlug slug={slug} />;
}
