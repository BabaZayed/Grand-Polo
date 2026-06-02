import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#5D3A1A]">
      <div className="text-center px-4 max-w-lg">
        <h1 className="font-heading text-7xl sm:text-8xl text-[#D4AF37] mb-4">404</h1>
        <p className="text-[#FFFAF3] text-xl sm:text-2xl font-heading mb-3">Page Not Found</p>
        <p className="text-[#B89B6E] text-base mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Explore our luxury equestrian community instead.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button className="gold-gradient text-[#2A1506] font-semibold px-8 py-3 rounded-md hover:opacity-90 gold-shimmer-hover">
              <Home className="w-4 h-4 mr-2" /> Return Home
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="outline" className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 px-8 py-3 rounded-md">
              <Search className="w-4 h-4 mr-2" /> View Properties
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="border-[#B89B6E]/50 text-[#B89B6E] hover:bg-[#B89B6E]/10 px-8 py-3 rounded-md">
              <ArrowLeft className="w-4 h-4 mr-2" /> Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
