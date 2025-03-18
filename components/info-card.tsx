import { InfoIcon } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export function InfoCard({ children }: Props) {
  return (
    <div className="flex flex-col items-center text-center justify-center gap-4 p-8 bg-muted/50 rounded-xl text-muted-foreground">
      <InfoIcon className="size-6" />
      <p className="font-medium">{children}</p>
    </div>
  );
}
