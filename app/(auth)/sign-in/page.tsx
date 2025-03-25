import Link from "next/link";

import { getProducts } from "@/hooks/get-products";

import { AuthGoogleButton } from "@/components/auth-google-button";
import { FreeShippingCard } from "@/components/free-shipping-card";
import { InfoCard } from "@/components/info-card";

export default async function SignInPage() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-12">
      <section className="grid grid-cols-1 md:gap-8">
        <div className="space-y-6 p-4 py-8 md:px-8 rounded-xl lg:col-span-2">
          <h3 className="text-xl font-bold uppercase">Fazer Login</h3>

          <p className="text-muted-foreground">
            Entre com sua conta do Google para continuar utilizando a nossa
            plataforma.
          </p>

          <AuthGoogleButton />

          <p className="text-xs text-muted-foreground">
            Ao continuar, você concorda com os{" "}
            <Link href="/terms" className="hover:underline text-foreground">
              Termos de Serviços
            </Link>{" "}
            e a{" "}
            <Link href="/privacy" className="hover:underline text-foreground">
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
      </section>

      <InfoCard>
        Acesse sua conta para visualizar seus pedidos, favoritos e muito mais.
      </InfoCard>

      <FreeShippingCard products={products} />
    </main>
  );
}
