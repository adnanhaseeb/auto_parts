'use client'

import { useState, useEffect } from 'react';
import AnnouncementBanner from "@/src/components/layout/AnnouncementBanner";
import Header from "@/src/components/layout/Header";
import Navigation from "@/src/components/layout/Navigation";
import Footer from "@/src/components/layout/Footer";
import ProductGrid from "@/src/components/products/ProductGrid";
import ProductCard from "@/src/components/products/ProductCard";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Star, TrendingUp, Package, Truck, Shield } from "lucide-react";
import Link from "next/link";
import { Product } from '@/src/contexts/ProductContext';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products?featured=true&limit=8');
      if (response.ok) {
        const data = await response.json();
        setFeaturedProducts(data.products || []);
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBanner />
      <Header />
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">
                Premium Auto Parts
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover high-quality automotive parts from trusted brands. Everything you need to keep your vehicle running at its best.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="#featured">Shop Featured Products</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#categories">Browse Categories</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <Package className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">Quality Parts</h3>
                <p className="text-sm text-muted-foreground">Premium automotive parts from trusted manufacturers</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <Truck className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">Fast Shipping</h3>
                <p className="text-sm text-muted-foreground">Quick delivery to get you back on the road</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">Warranty</h3>
                <p className="text-sm text-muted-foreground">All parts come with manufacturer warranty</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <Star className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">Expert Support</h3>
                <p className="text-sm text-muted-foreground">Get help from our automotive specialists</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="featured" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="secondary" className="mb-2">
                <TrendingUp className="w-3 h-3 mr-1" />
                Featured Products
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Popular This Month</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover our most popular automotive parts, handpicked for quality and performance.
              </p>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-muted rounded-lg mb-3"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : featuredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {featuredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
                <div className="text-center">
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#all-products">View All Products</Link>
                  </Button>
                </div>
              </>
            ) : (
              <Card className="text-center p-12">
                <CardContent>
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Featured Products Yet</h3>
                  <p className="text-muted-foreground">
                    Our team is working hard to add amazing products. Check back soon!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* All Products Section */}
        <section id="all-products" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Browse All Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our complete collection of automotive parts and accessories.
              </p>
            </div>
            <ProductGrid />
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-bold">Stay Updated</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Get the latest news about new products, special offers, and automotive tips.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-md text-foreground"
                />
                <Button size="lg" variant="secondary">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}