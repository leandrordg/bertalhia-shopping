import { notFound } from "next/navigation";

import { getOrdersByStripeCheckoutId } from "@/hooks/get-order-by-stripe-checkout-id";
import { getProducts } from "@/hooks/get-products";

import { FreeShippingCard } from "@/components/free-shipping-card";
import { InfoCard } from "@/components/info-card";
import { SuccessInfo } from "@/components/success-info";

interface Props {
  searchParams: Promise<{ session_id: string }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  const products = await getProducts();

  const order = await getOrdersByStripeCheckoutId(session_id);

  if (!order) return notFound();

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-12">
      <SuccessInfo order={order} />

      <InfoCard>
        Se você tiver alguma dúvida, entre em contato com o nosso suporte.
        Estamos sempre prontos para ajudar!
      </InfoCard>

      <FreeShippingCard products={products} />
    </main>
  );
}
