import { Loader2Icon } from "lucide-react";

export default function LoadingPage() {
  return (
    <main className="flex flex-col items-center gap-2 justify-center h-[calc(100dvh-96px)] text-muted-foreground">
      <Loader2Icon className="size-6 animate-spin" />
      <span className="text-sm">Carregando...</span>
    </main>
  );
}
