"use server";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
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

  const line_items = activeProducts.map((item) => ({
    price_data: {
      currency: "brl",
      product_data: {
        name: item.name,
        description: item.description,
        images: item.images.map((image) => image.url),
        metadata: {
          userId: userSession.user?.id!,
          variantId: cartItems.find((cartItem) => cartItem.id === item.id)!.id,
          productId: item.id,
        },
      },
      unit_amount: item.price * 100,
    },
    quantity: cartItems.find((cartItem) => cartItem.id === item.id)?.quantity!,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `${env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/cart`,
  });

  if (!session) throw new Error("Erro ao criar sessão de pagamento");

  redirect(`${session.url}`);
}
