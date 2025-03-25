import { getOrderById } from "@/hooks/get-order-by-id";
import { getProducts } from "@/hooks/get-products";
import {
  DEFAULT_SHIPPING_PRICE,
  FREE_SHIPPING_THRESHOLD,
} from "@/utils/config";
import { formatDate, formatPrice } from "@/utils/format";

import { FreeShippingCard } from "@/components/free-shipping-card";
import { InfoCard } from "@/components/info-card";
import { ProductOrderCard } from "@/components/product-order-card";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";

interface Props {
  params: Promise<{ orderId: string }>;
}

export default async function OrderIdPage({ params }: Props) {
  const { orderId } = await params;

  const products = await getProducts();
  const order = await getOrderById(orderId);

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-12">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-muted-foreground uppercase px-4 md:px-8 break-words">
          Visualizando pedido{" "}
          <span className="text-foreground">#{order.id}</span>
        </h3>

        <div className="flex flex-wrap items-center gap-2 px-4 md:px-8">
          <p className="text-xs text-muted-foreground">
            <CalendarIcon className="size-4 inline-block -mt-0.5 mr-1" />
            {formatDate(order.createdAt, {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </p>

          <span className="text-xs text-muted-foreground">•</span>

          <p className="text-xs text-muted-foreground">
            {order.orderItems.length}{" "}
            {order.orderItems.length === 1 ? "produto" : "produtos"} adquiridos
          </p>
        </div>
      </div>

      <section className="flex flex-col md:flex-row">
        <div className="grid grid-cols-1 divide-y flex-[2]">
          {order.orderItems.map(({ product, productVariant, quantity }) => (
            <ProductOrderCard
              key={product.id}
              product={product}
              variant={productVariant}
              quantity={quantity}
            />
          ))}
        </div>

        <aside className="flex-1 border bg-muted/20 p-4 py-8 md:p-8 rounded-xl overflow-clip space-y-4">
          <p className="text-xs text-muted-foreground">
            ID de pagamento: {order.stripeCheckoutId}
          </p>

          <h4 className="text-lg font-bold text-muted-foreground uppercase">
            Resumo da compra
          </h4>

          {order.orderItems.map(({ product, productVariant, quantity }) => (
            <div
              key={product.id}
              className="flex items-start gap-1 border rounded-xl overflow-clip p-2 bg-white"
            >
              <div className="relative size-10">
                <Image src={product.images[0].url} alt={product.name} fill />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  {
                    product.variants.find(
                      (variant) => variant.id === productVariant
                    )!.name
                  }
                </p>
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-xs text-muted-foreground">
                  {quantity}x {formatPrice(product.price)}
                </p>
              </div>
            </div>
          ))}

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Subtotal ({order.orderItems.length})
            </span>
            <span className="font-medium">
              {formatPrice(order.total + DEFAULT_SHIPPING_PRICE)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Frete</span>
            <span className="text-green-600 font-medium">
              {order.total > FREE_SHIPPING_THRESHOLD
                ? `Grátis (-${formatPrice(DEFAULT_SHIPPING_PRICE)})`
                : formatPrice(DEFAULT_SHIPPING_PRICE)}
            </span>
          </div>

          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </aside>
      </section>

      <InfoCard>
        O prazo de entrega é de até 7 dias úteis após a confirmação do
        pagamento.
        <br />
        <br /> Pagamentos realizados via PIX são confirmados no mesmo dia. O
        código de rastreio será enviado para o e-mail cadastrado.
        <br />
        <br /> Caso tenha alguma dúvida, entre em contato conosco.
      </InfoCard>

      <FreeShippingCard products={products} />
    </main>
  );
}
