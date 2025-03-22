import Image from "next/image";
import Link from "next/link";

import { getOrderById } from "@/hooks/get-order-by-id";
import {
  DEFAULT_SHIPPING_PRICE,
  FREE_SHIPPING_THRESHOLD,
} from "@/utils/config";
import { formatDate, formatPrice } from "@/utils/format";

import { FreeShippingCard } from "@/components/free-shipping-card";
import { CalendarIcon, ChevronRightIcon } from "lucide-react";

interface Props {
  params: Promise<{ orderId: string }>;
}

export default async function OrderIdPage({ params }: Props) {
  const { orderId } = await params;

  const order = await getOrderById(orderId);

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-12">
      <h3 className="text-xl font-bold text-muted-foreground uppercase px-4 md:px-8">
        Visualizando pedido
      </h3>

      <div className="flex flex-wrap items-center gap-4 px-4 md:px-8">
        <p className="text-xs text-muted-foreground">ID: {order.id}</p>

        <p className="text-xs text-muted-foreground">
          <CalendarIcon className="size-4 inline-block -mt-0.5 mr-1" />
          {formatDate(order.createdAt, {
            dateStyle: "full",
            timeStyle: "short",
          })}
        </p>
      </div>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8 lg:items-start">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {order.orderItems.map((item) => {
            const selectedVariant = item.product.variants.find(
              (v) => v.id === item.productVariant
            );

            return (
              <div
                key={item.id}
                className="flex gap-4 md:gap-8 p-4 md:p-8 md:items-center rounded-xl hover:bg-muted/50"
              >
                <Link
                  href={`/products/${item.product.slug}?variant=${item.productVariant}`}
                >
                  <div className="relative size-12 sm:size-20 md:size-28 shrink-0">
                    <Image
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      className="object-contain mix-blend-multiply"
                      fill
                    />
                  </div>
                </Link>

                <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-center flex-1">
                  <div className="flex-[3] space-y-1.5">
                    <p className="text-sm">{selectedVariant?.name}</p>

                    <h2 className="text-lg font-semibold">
                      {item.product.name}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      Qtd: {item.quantity} unidades.
                    </p>
                    <Link
                      href={`/reviews/new?product=${item.product.id}`}
                      className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                    >
                      Avaliar produto
                      <ChevronRightIcon className="size-4 inline-block -mt-0.5 ml-1" />
                    </Link>
                  </div>
                  <div className="md:text-right shrink-0 md:space-y-1.5 md:min-w-32">
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(item.product.price)}/un
                    </p>
                    <p className="text-lg font-bold tracking-tight">
                      {formatPrice(item.total)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="lg:col-span-1 bg-muted/50 p-4 py-8 md:p-8 rounded-xl overflow-clip space-y-4">
          <p className="text-xs text-muted-foreground">
            ID de pagamento: {order.stripeCheckoutId}
          </p>

          <h4 className="text-lg font-bold text-muted-foreground uppercase">
            Resumo da compra
          </h4>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Frete</span>
            <span className="text-green-600 font-medium">
              {order.total > FREE_SHIPPING_THRESHOLD
                ? "Grátis"
                : formatPrice(DEFAULT_SHIPPING_PRICE)}
            </span>
          </div>

          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </aside>
      </section>

      <FreeShippingCard />
    </main>
  );
}
