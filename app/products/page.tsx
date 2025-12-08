'use client'

import { useState, useEffect } from 'react';
import AnnouncementBanner from "@/src/components/layout/AnnouncementBanner";
import Header from "@/src/components/layout/Header";
import Navigation from "@/src/components/layout/Navigation";
import Footer from "@/src/components/layout/Footer";
import ProductGrid from "@/src/components/products/ProductGrid";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Search, Filter, Package } from "lucide-react";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    'Engine Parts',
    'Brake System',
    'Suspension',
    'Electrical',
    'Filters',
    'Transmission',
    'Exhaust System',
    'Body Parts'
  ];

  const brands = [
    'Bosch',
    'NGK',
    'Fram',
    'ACDelco',
    'Denso',
    'Motorcraft',
    'Champion',
    'Gates'
  ];

  useEffect(() => {
    fetchProductCount();
  }, [searchTerm, selectedCategory, selectedBrand]);

  const fetchProductCount = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedBrand) params.append('brand', selectedBrand);
      
      const response = await fetch(`/api/products?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setTotalProducts(data.total || 0);
      }
    } catch (error) {
      console.error('Error fetching product count:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedBrand('');
    setSortBy('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBanner />
      <Header />
      <Navigation />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted/30 py-8">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">Our Products</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse our complete collection of automotive parts and accessories. 
                Find exactly what you need for your vehicle.
              </p>
              {!isLoading && (
                <Badge variant="secondary" className="text-sm">
                  <Package className="w-3 h-3 mr-1" />
                  {totalProducts} products available
                </Badge>
              )}
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-6 border-b">
          <div className="container mx-auto px-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filter Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Category Filter */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Brand Filter */}
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Brands" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Brands</SelectItem>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Sort By */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Default</SelectItem>
                      <SelectItem value="price_low">Price: Low to High</SelectItem>
                      <SelectItem value="price_high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name: A to Z</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Clear Filters */}
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="whitespace-nowrap"
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <ProductGrid 
              searchTerm={searchTerm}
              category={selectedCategory}
              brand={selectedBrand}
              sortBy={sortBy}
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}