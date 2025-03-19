import { getProducts } from "@/hooks/get-products";

import { CartCheckout } from "@/components/cart-checkout";
import { CartProductList } from "@/components/cart-product-list";
import { FreeShippingCard } from "@/components/free-shipping-card";

export default async function CartPage() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-12">
      <CartProductList />

      <FreeShippingCard />

      <CartCheckout products={products} />
    </main>
  );
}
