import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { finalizeOrder } from "@/actions/finalize-order";
import { stripe } from "@/lib/stripe";
import { env } from "@/utils/env";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const headerList = await headers();
    const signature = headerList.get("stripe-signature");

    if (!env.STRIPE_WEBHOOK_SECRET) {
      return new Response("The Stripe webhook secret is not set.", {
        status: 400,
      });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature as string,
      env.STRIPE_WEBHOOK_SECRET
    );

    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      const { metadata } = event.data.object;

      if (!metadata)
        throw new Error("Não foi possível obter os metadados do evento");

      const orderId = metadata.orderId;
      const items = JSON.parse(metadata.items);

      for (const item of items) {
        const variantId = item.variantId;
        const totalQuantity = item.totalQuantity as number;
        const selectedQuantity = item.selectedQuantity as number;

        await finalizeOrder(
          orderId,
          variantId,
          totalQuantity,
          selectedQuantity
        );
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
