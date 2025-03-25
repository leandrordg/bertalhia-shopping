export function validateProducts(products: Product[], cartItems: CartItem[]) {
  const productMap = new Map<string, Product>();

  products.forEach((product) => productMap.set(product.id, product));

  const activeProducts: CartItem[] = [];
  const inactiveProducts: CartItem[] = [];

  for (const item of cartItems) {
    const product = productMap.get(item.id);

    if (!product) continue;

    const variant = product.variants.find((v) => v.id === item.variantId);

    if (
      !variant ||
      item.quantity > variant.quantity ||
      item.price !== product.price
    ) {
      inactiveProducts.push({
        ...product,
        quantity: item.quantity,
        variantId: item.variantId,
      });
    } else {
      activeProducts.push({
        ...product,
        quantity: item.quantity,
        variantId: item.variantId,
      });
    }
  }

  return { activeProducts, inactiveProducts };
}
