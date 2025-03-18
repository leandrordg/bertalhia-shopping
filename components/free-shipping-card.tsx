import { TruckIcon } from "lucide-react";

export function FreeShippingCard() {
  return (
    <div className="flex flex-col gap-4 items-center text-center bg-green-100 border-green-300 text-green-700 p-8 rounded-xl">
      <TruckIcon className="size-6" />
      <p>
        Entrega <span className="font-bold">GRÁTIS</span> para todo o Brasil.
      </p>

      <p className="text-sm">
        Adquira frete grátis comprando produtos acima de{" "}
        <span className="font-bold">R$ 200,00</span>, válido para todo o Brasil.
      </p>
    </div>
  );
}
