import { getOrderById } from "@/hooks/get-order-by-id";
import { getProducts } from "@/hooks/get-products";
import { cn } from "@/lib/cn";
import {
  DEFAULT_SHIPPING_PRICE,
  FREE_SHIPPING_THRESHOLD,
} from "@/utils/config";
import { formatDate, formatOrderStatus, formatPrice } from "@/utils/format";

import { FreeShippingCard } from "@/components/free-shipping-card";
import { InfoCard } from "@/components/info-card";
import { ProductOrderCard } from "@/components/product-order-card";
import { CalendarIcon } from "lucide-react";

interface Props {
  params: Promise<{ orderId: string }>;
}

export default async function OrderIdPage({ params }: Props) {
  const { orderId } = await params;

  const products = await getProducts();
  const order = await getOrderById(orderId);

  const subtotal = order.orderItems.reduce(
    (acc, { total, quantity }) => acc + total * quantity,
    0
  );

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-4 md:space-y-8 lg:space-y-12">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-muted-foreground uppercase px-4 md:px-8 break-words">
          Visualizando pedido{" "}
          <span className="text-foreground">#{order.id}</span>
        </h3>

        <div className="flex flex-wrap items-center gap-4 px-4 md:px-8">
          <div
            className={cn(
              "text-xs px-3 py-0.5 rounded-xl w-fit",
              order.orderStatus !== "processing" && "bg-blue-100 text-blue-600",
              order.orderStatus === "created" &&
                "bg-muted text-muted-foreground",
              order.orderStatus === "succeeded" && "bg-green-100 text-green-600"
            )}
          >
            {formatOrderStatus(order.orderStatus)}
          </div>

          <p className="text-xs text-muted-foreground">
            <CalendarIcon className="size-4 inline-block -mt-0.5 mr-1" />
            {formatDate(order.createdAt, {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </p>

          <p className="text-xs text-muted-foreground">
            {order.orderItems.length === 1
              ? "1 produto adquirido."
              : `${order.orderItems.length} produtos adquiridos.`}
          </p>
        </div>

        {(order.orderStatus === "created" ||
          order.orderStatus === "processing") && (
          <div className="my-8">
            <InfoCard>
              Seu pedido está sendo processado. Assim que o pagamento for
              confirmado, enviaremos um e-mail com o código de rastreio.
            </InfoCard>
          </div>
        )}
      </div>

      <section className="flex flex-col lg:flex-row">
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

        <aside className="flex-1 lg:max-w-md border p-4 py-8 md:p-8 rounded-xl overflow-clip space-y-4">
          <p className="text-xs text-muted-foreground truncate">
            ID de pagamento: {order.stripeCheckoutId}
          </p>

          <h4 className="text-lg font-bold text-muted-foreground uppercase">
            Resumo da compra
          </h4>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Subtotal ({order.orderItems.length})
            </span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
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
