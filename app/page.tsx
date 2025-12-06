import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/products/ProductGrid";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBanner />
      <Header />
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4">
        <ProductGrid />
      </main>
      
      <Footer />
    </div>
  );
}