import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="h-24 bg-background">
      <div className="flex items-center h-full max-w-7xl mx-auto px-4 lg:px-8">
        <Link href="/">
          <div className="relative w-32 h-10">
            <Image
              src="/logo-horizontal-two.png"
              alt="bertalhia shopping"
              className="object-contain mix-blend-multiply"
              fill
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
