'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  _id?: string;
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  inStock: boolean;
  featured?: boolean;
  rating?: number;
  reviews?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id' | '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProduct: (id: string) => Product | undefined;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products
  const refreshProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new product
  const addProduct = async (productData: Omit<Product, 'id' | '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...productData,
          id: Date.now().toString(), // Generate unique ID
        }),
      });

      if (response.ok) {
        const newProduct = await response.json();
        setProducts(prev => [...prev, newProduct]);
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  // Update a product
  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(prev => 
          prev.map(p => p.id === id ? updatedProduct : p)
        );
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  // Delete a product
  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  // Get a specific product
  const getProduct = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  };

  // Load products on mount
  useEffect(() => {
    refreshProducts();
  }, []);

  const value: ProductContextType = {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    refreshProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}