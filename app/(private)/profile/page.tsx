import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getOrdersByUser } from "@/hooks/get-orders-by-user";
import { formatDate, formatPrice } from "@/utils/format";

import { FreeShippingCard } from "@/components/free-shipping-card";
import { InfoCard } from "@/components/info-card";
import { SignOutButton } from "@/components/sign-out-button";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) return redirect("/sign-in");

  const orders = await getOrdersByUser();

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-12">
      <h3 className="text-xl font-bold text-muted-foreground uppercase px-4 md:px-8">
        Minha conta
      </h3>

      <section className="space-y-12">
        <div className="bg-muted/50 p-4 py-8 md:p-8 rounded-xl overflow-clip flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="relative size-16 md:size-20 rounded-full overflow-clip">
              <Image
                src={session.user.image!}
                alt={session.user.name!}
                className="rounded-full"
                fill
              />
            </div>

            <div className="space-y-1">
              <p className="font-medium">{session.user.name}</p>

              <p className="text-sm text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </div>

          <SignOutButton />
        </div>
      </section>

      <h3 className="text-xl font-bold text-muted-foreground uppercase px-4 md:px-8">
        Meus pedidos ({orders.length})
      </h3>

      <section className="space-y-12">
        {!orders.length && (
          <InfoCard>Você ainda não possui nenhum pedido.</InfoCard>
        )}

        {orders.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            {orders.map((order) => {
              const { orderItems, id, total } = order;

              const orderTitle = `${orderItems[0].product.name} e mais ${
                orderItems.length - 1
              } items.`;

              return (
                <div
                  key={id}
                  className="flex flex-col gap-2 bg-muted/50 p-4 md:p-8 rounded-xl overflow-clip"
                >
                  <p className="text-xs text-muted-foreground">
                    {formatDate(order.createdAt, {
                      dateStyle: "full",
                      timeStyle: "short",
                    })}
                  </p>

                  <div className="flex flex-col gap-1.5">
                    <Link href={`/orders/${order.id}`} className="font-medium">
                      {orderTitle}
                    </Link>

                    <p className="font-medium text-muted-foreground">
                      {formatPrice(total)}
                    </p>
                  </div>

                  <div className="flex items-center *:not-first:-ml-4">
                    {orderItems
                      .slice(0, 8)
                      .map(({ id, product, productVariant }) => (
                        <Link
                          key={id}
                          href={`/products/${product.slug}?variant=${productVariant}`}
                        >
                          <div className="relative size-10 md:size-12 rounded-full overflow-clip bg-muted border-2 shrink-0">
                            <Image
                              src={product.images[0].url}
                              alt={product.name}
                              fill
                            />
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <FreeShippingCard />
    </main>
  );
}

{
  /* <div key={item.id} className="flex gap-4">
  <div className="relative size-24 rounded-xl overflow-clip">
    <Image src={item.product.images[0].url} alt={item.product.name} fill />
  </div>

  <div className="space-y-2">
    <p className="text-xs text-muted-foreground">{order.stripeCheckoutId}</p>

    <p className="font-medium">{item.product.name}</p>

    <p className="text-sm text-muted-foreground">
      {item.quantity}x {formatPrice(item.product.price)}/un -{" "}
      {item.product.variants[0].name}
    </p>

    <p className="font-medium">{formatPrice(order.total)}</p>
  </div>
</div>; */
}
