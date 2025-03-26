"use server";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { createOrder } from "@/hooks/create-order";
import { createOrderItem } from "@/hooks/create-order-item";
import { getProducts } from "@/hooks/get-products";
import { stripe } from "@/lib/stripe";
import { env } from "@/utils/env";
import { validateProducts } from "@/utils/validate-products";

export async function checkout(cartItems: CartItem[]) {
  const userSession = await auth();

  if (!userSession?.user) throw new Error("Usuário não autenticado");

  const products = await getProducts();

  const { activeProducts, inactiveProducts } = validateProducts(
    products,
    cartItems
  );

  if (inactiveProducts.length > 0)
    throw new Error("Alguns produtos do carrinho não estão mais disponíveis");

  const line_items = activeProducts.map((item) => {
    const cartItem = cartItems.find((cartItem) => cartItem.id === item.id)!;

    return {
      price_data: {
        currency: "brl",
        product_data: {
          name: item.name,
          description: item.description,
          images: item.images.map((image) => image.url),
          metadata: {
            productId: item.id,
            variantId: cartItem.variantId,
            selectedQuantity: cartItem.quantity,
            totalQuantity: item.quantity,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: cartItem.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    payment_method_types: ["card"],
    success_url: `${env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/cart`,
  });

  if (!session) throw new Error("Erro ao criar sessão de pagamento");

  const stripeCheckoutId = session.id;

  const order = await createOrder(
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    stripeCheckoutId,
    "created"
  );

  await stripe.checkout.sessions.update(stripeCheckoutId, {
    metadata: {
      orderId: order.id,
      items: JSON.stringify(
        line_items.map((item) => {
          return {
            productId: item.price_data.product_data.metadata.productId,
            variantId: item.price_data.product_data.metadata.variantId,
            selectedQuantity:
              item.price_data.product_data.metadata.selectedQuantity,
            totalQuantity: item.price_data.product_data.metadata.totalQuantity,
          };
        })
      ),
    },
  });

  for (const item of cartItems) {
    await createOrderItem(
      order.id,
      item.price * item.quantity,
      item.quantity,
      item.variantId,
      item.id
    );
  }

  redirect(session.url!);
}
