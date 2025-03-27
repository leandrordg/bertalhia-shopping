"use server";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { createOrder } from "@/hooks/create-order";
import { createOrderItem } from "@/hooks/create-order-item";
import { getProducts } from "@/hooks/get-products";
import { stripe } from "@/lib/stripe";
import {
  DEFAULT_SHIPPING_PRICE,
  FREE_SHIPPING_THRESHOLD,
} from "@/utils/config";
import { env } from "@/utils/env";
import { validateProducts } from "@/utils/validate-products";
import type { Stripe } from "stripe";

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

  const cartItemsMap = new Map(cartItems.map((item) => [item.id, item]));

  const line_items = activeProducts.map(
    ({ id, name, description, images, price, variants }) => {
      const cartItem = cartItemsMap.get(id);

      if (!cartItem) throw new Error("Produto não encontrado no carrinho");

      const { variantId, quantity } = cartItem;
      const totalQuantity = variants.find((variant) => variant.id === variantId)
        ?.quantity!;

      return {
        price_data: {
          currency: "brl",
          product_data: {
            name,
            description,
            images: images.map(({ url }) => url),
            metadata: {
              productId: id,
              variantId,
              selectedQuantity: quantity,
              totalQuantity,
            },
          },
          unit_amount: price * 100,
        },
        quantity,
      };
    }
  );

  const totalPrice = line_items.reduce(
    (acc, item) => (acc + item.price_data.unit_amount * item.quantity) / 100,
    0
  );

  const hasFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;

  const shipping_options:
    | Stripe.Checkout.SessionCreateParams.ShippingOption[]
    | undefined = [];

  if (totalPrice >= FREE_SHIPPING_THRESHOLD) {
    shipping_options.push({
      shipping_rate_data: {
        display_name: "Frete Grátis",
        type: "fixed_amount",
        fixed_amount: { amount: 0, currency: "brl" },
      },
    });
  } else {
    shipping_options.push({
      shipping_rate_data: {
        display_name: "Frete Padrão",
        type: "fixed_amount",
        fixed_amount: { amount: DEFAULT_SHIPPING_PRICE * 100, currency: "brl" },
      },
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    payment_method_types: ["card"],
    shipping_options,
    shipping_address_collection: {
      allowed_countries: ["BR"],
    },
    success_url: `${env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/cart`,
  });

  if (!session) throw new Error("Erro ao criar sessão de pagamento");

  const stripeCheckoutId = session.id;

  const order = await createOrder(
    hasFreeShipping ? totalPrice : totalPrice + DEFAULT_SHIPPING_PRICE,
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
