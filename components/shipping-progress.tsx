export function ShippingProgress({ progress }: { progress: number }) {
  return (
    <div className="w-full max-w-xl bg-zinc-200 rounded-full h-2.5">
      <div
        className="bg-green-500 h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
