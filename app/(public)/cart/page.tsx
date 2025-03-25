import { getProducts } from "@/hooks/get-products";

import { CartCheckout } from "@/components/cart-checkout";
import { CartProductList } from "@/components/cart-product-list";
import { FreeShippingCard } from "@/components/free-shipping-card";
import { ProductCard } from "@/components/product-card";

export default async function CartPage() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-12">
      <CartProductList products={products} />

      <FreeShippingCard products={products} />

      <CartCheckout products={products} />

      {products.length > 0 && (
        <div className="space-y-12">
          <div className="flex items-center gap-4">
            <hr className="flex-1" />
            <h3 className="text-xl font-bold text-muted-foreground text-center uppercase">
              Explorar
            </h3>
            <hr className="flex-1" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
