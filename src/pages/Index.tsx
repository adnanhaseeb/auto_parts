import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/products/ProductGrid";

const Index = () => {
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
};

export default Index;