'use client'

import AnnouncementBanner from "@/src/components/layout/AnnouncementBanner";
import Header from "@/src/components/layout/Header";
import Navigation from "@/src/components/layout/Navigation";
import Footer from "@/src/components/layout/Footer";
import ProductGrid from "@/src/components/products/ProductGrid";

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