import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="h-24">
      <div className="flex items-center h-full max-w-7xl mx-auto px-4 lg:px-8">
        <Link href="/">
          <div className="relative w-30 h-12">
            <Image
              src="/logo-horizontal.png"
              alt="bertalhia shopping"
              className="object-contain"
              fill
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
