export function ShippingProgress({
  totalPrice,
  freeShippingThreshold,
}: {
  totalPrice: number;
  freeShippingThreshold: number;
}) {
  const progress = Math.min((totalPrice / freeShippingThreshold) * 100, 100);

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      {progress >= 100 ? (
        <p className="text-sm text-green-600">
          Parabéns! Você ganhou <strong>FRETE GRÁTIS</strong>.
        </p>
      ) : (
        <p className="text-sm mb-2 text-gray-700">
          Você está <span className="font-bold">{Math.round(progress)}%</span>{" "}
          do caminho para o frete grátis!
        </p>
      )}

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-green-500 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
