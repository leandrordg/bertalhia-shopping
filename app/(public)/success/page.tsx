import Link from "next/link";

import { getProducts } from "@/hooks/get-products";

import { FreeShippingCard } from "@/components/free-shipping-card";
import { InfoCard } from "@/components/info-card";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon } from "lucide-react";

export default async function SuccessPage() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-12">
      <div className="flex flex-col items-center text-center justify-center px-4 md:px-8 gap-4">
        <CheckCircleIcon className="size-12 text-green-600" />

        <h3 className="text-xl font-bold uppercase px-4 md:px-8">
          Pedido realizado com sucesso
        </h3>

        <p className="text-sm text-muted-foreground">
          Obrigado por comprar conosco! Seu pedido foi realizado com sucesso. Em
          breve você receberá um e-mail com as informações de entrega.
        </p>

        <Button asChild>
          <Link href="/">Voltar para a página inicial</Link>
        </Button>
      </div>

      <InfoCard>
        Se você tiver alguma dúvida, entre em contato com o nosso suporte.
        Estamos sempre prontos para ajudar!
      </InfoCard>

      <FreeShippingCard products={products} />
    </main>
  );
}
