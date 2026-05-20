import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#070B14]">
      <div className="text-center px-4">
        <h1 className="font-heading text-6xl text-[#C9A84C] mb-4">404</h1>
        <p className="text-[#8B8678] text-lg mb-8">Page not found</p>
        <Link href="/">
          <Button className="gold-gradient text-[#070B14] font-semibold px-8 py-3 rounded-md hover:opacity-90">
            Return Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
