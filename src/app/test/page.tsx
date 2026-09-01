import ProductService from "@/services/product.service";

export default async function TestPage() {
  const products = await ProductService.getProducts(5);

  return (
    <pre>{JSON.stringify(products, null, 2)}</pre>
  );
}