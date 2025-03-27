import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getOrdersByUser } from "@/hooks/get-orders-by-user";
import { getProducts } from "@/hooks/get-products";
import { cn } from "@/lib/cn";
import { formatDate, formatOrderStatus, formatPrice } from "@/utils/format";

import { FreeShippingCard } from "@/components/free-shipping-card";
import { InfoCard } from "@/components/info-card";
import { SignOutButton } from "@/components/sign-out-button";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) return redirect("/sign-in");

  const products = await getProducts();
  const orders = await getOrdersByUser();

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-4 md:space-y-8 lg:space-y-12">
      <h3 className="text-xl font-bold text-muted-foreground uppercase px-4 md:px-8">
        Minha conta
      </h3>

      <section className="space-y-12">
        <div className="p-4 py-8 md:p-8 rounded-xl overflow-clip flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="relative size-12 rounded-full overflow-clip">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
            {orders.map((order) => {
              const { orderItems, id, total } = order;

              const orderTitle =
                orderItems.length > 1
                  ? `${orderItems[0].product.name} e mais ${
                      orderItems.length - 1
                    } items.`
                  : orderItems[0].product.name;

              return (
                <Link
                  key={id}
                  href={`/orders/${order.id}`}
                  className={cn(
                    "flex flex-col gap-2 p-4 py-8 md:px-8 rounded-xl overflow-clip hover:bg-muted/50 transition-colors",
                    orders.length === 1 && "md:col-span-2"
                  )}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <div
                      className={cn(
                        "text-xs px-3 py-0.5 rounded-xl w-fit",
                        order.orderStatus !== "processing" &&
                          "bg-blue-100 text-blue-600",
                        order.orderStatus === "created" &&
                          "bg-muted text-muted-foreground",
                        order.orderStatus === "succeeded" &&
                          "bg-green-100 text-green-600"
                      )}
                    >
                      {formatOrderStatus(order.orderStatus)}
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {formatDate(order.createdAt, {
                        dateStyle: "full",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <p className="font-medium">{orderTitle}</p>

                    <p className="font-medium text-muted-foreground">
                      {formatPrice(total)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <FreeShippingCard products={products} />
    </main>
  );
}
