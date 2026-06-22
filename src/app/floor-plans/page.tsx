import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ContactSection from "@/components/contact-section";

export const metadata: Metadata = {
  title: "Floor Plans | Grand Polo Club & Resort",
  description: "Explore Grand Polo floor plans — studio to 5-bedroom equestrian villas by Emaar. Register to download complete layout sets with detailed dimensions.",
};

const floorPlans = [
  { id: "studio", name: "Studio Layout", beds: "Studio", baths: "1", sqft: "400-550" },
  { id: "1br", name: "1 Bedroom Layout", beds: "1 Bed", baths: "1", sqft: "650-850" },
  { id: "1br-corner", name: "1 Bedroom Corner", beds: "1 Bed", baths: "1", sqft: "720-950" },
  { id: "2br", name: "2 Bedroom Layout", beds: "2 Beds", baths: "2", sqft: "950-1,350" },
  { id: "2br-corner", name: "2 Bedroom Corner", beds: "2 Beds", baths: "2", sqft: "1,100-1,550" },
  { id: "3br", name: "3 Bedroom Layout", beds: "3 Beds", baths: "3-4", sqft: "1,450-2,100" },
  { id: "4br", name: "4 Bedroom Penthouse", beds: "4 Beds", baths: "4-5", sqft: "2,200-3,500" },
  { id: "5br", name: "5 Bedroom Villa", beds: "5 Beds", baths: "5-6", sqft: "3,200-5,500" },
];

export default function FloorPlansPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-[#5D3A1A] text-center">
          <div className="container mx-auto px-4">
            <h1 className="font-heading text-4xl md:text-5xl text-[#D4AF37] mb-4">Floor Plans & Layouts</h1>
            <p className="text-[#FFFAF3]/80 text-lg max-w-2xl mx-auto">
              Explore meticulously designed floor plans for every lifestyle. Register to download complete layout sets with detailed dimensions.
            </p>
          </div>
        </section>

        {/* Floor Plan Cards */}
        <section className="py-20 bg-[#F5F0E8]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {floorPlans.map((plan) => (
                <div key={plan.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="h-48 bg-gradient-to-br from-[#5D3A1A] to-[#8B6B47] flex items-center justify-center relative">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                        <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                      </div>
                      <p className="text-white/90 text-sm font-medium">Layout Preview</p>
                      <p className="text-white/50 text-xs mt-1">Register to unlock</p>
                    </div>
                    <span className="absolute top-3 left-3 bg-[#D4AF37] text-[#2A1506] text-xs font-bold px-3 py-1 rounded-full">{plan.beds}</span>
                    <span className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">{plan.sqft} sqft</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg text-[#2A1506] font-semibold mb-2">{plan.name}</h3>
                    <div className="flex gap-4 mb-4 text-sm text-[#6B5B4F]">
                      <span className="flex items-center gap-1"><span className="text-[#D4AF37]">🛏</span> {plan.beds}</span>
                      <span className="flex items-center gap-1"><span className="text-[#D4AF37]">🛁</span> {plan.baths} Bath{parseInt(plan.baths) > 1 ? "s" : ""}</span>
                    </div>
                    <a href="/contact" className="block w-full text-center bg-gradient-to-r from-[#5D3A1A] to-[#8B6B47] text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
                      Register to Download
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center bg-gradient-to-r from-[#5D3A1A] to-[#8B6B47] rounded-3xl p-10 text-white">
              <h2 className="font-heading text-2xl md:text-3xl mb-4">Want Complete Floor Plan Sets?</h2>
              <p className="text-white/80 mb-6 max-w-lg mx-auto">Get instant access to all layouts with detailed dimensions, furniture placement, and investment analysis.</p>
              <a href="/contact" className="inline-block bg-[#D4AF37] text-[#2A1506] px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
                Download All Floor Plans
              </a>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
