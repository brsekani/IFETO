import ProductDetailsClients from "./ProductDetailsClients";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProductDetailsClients id={id} />;
}
