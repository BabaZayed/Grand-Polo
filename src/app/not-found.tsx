import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#5D3A1A]">
      <div className="text-center px-4">
        <h1 className="font-heading text-6xl text-[#D4AF37] mb-4">404</h1>
        <p className="text-[#8B6B47] text-lg mb-8">Page not found</p>
        <Link href="/">
          <Button className="gold-gradient text-[#2A1506] font-semibold px-8 py-3 rounded-md hover:opacity-90">
            Return Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
