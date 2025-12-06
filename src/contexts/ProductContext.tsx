import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  sku: string;
  description?: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Denso Iridium Spark Plug',
    price: 850,
    originalPrice: 1200,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
    category: 'Engine Parts',
    inStock: true,
    sku: 'SP-001',
    description: 'High-quality iridium spark plug for better fuel efficiency'
  },
  {
    id: '2',
    name: 'Bosch Brake Pads Set',
    price: 3500,
    originalPrice: 4200,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=300&fit=crop',
    category: 'Brake System',
    inStock: true,
    sku: 'BP-002',
    description: 'Premium brake pads for superior stopping power'
  },
  {
    id: '3',
    name: 'NGK Ignition Coil',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300&h=300&fit=crop',
    category: 'Electrical',
    inStock: true,
    sku: 'IC-003',
    description: 'OEM quality ignition coil for reliable performance'
  },
  {
    id: '4',
    name: 'Mann Oil Filter',
    price: 450,
    originalPrice: 600,
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=300&h=300&fit=crop',
    category: 'Filters',
    inStock: false,
    sku: 'OF-004',
    description: 'Premium oil filter for engine protection'
  },
  {
    id: '5',
    name: 'Timing Belt Kit',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=300&h=300&fit=crop',
    category: 'Engine Parts',
    inStock: true,
    sku: 'TB-005',
    description: 'Complete timing belt kit with tensioner and pulleys'
  },
  {
    id: '6',
    name: 'LED Headlight Bulb H4',
    price: 1800,
    originalPrice: 2500,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=300&fit=crop',
    category: 'Lighting',
    inStock: true,
    sku: 'HL-006',
    description: 'Bright LED headlight bulbs with 6000K color temperature'
  },
  {
    id: '7',
    name: 'Radiator Coolant 4L',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop',
    category: 'Fluids',
    inStock: true,
    sku: 'RC-007',
    description: 'Long-life radiator coolant for all vehicles'
  },
  {
    id: '8',
    name: 'Wiper Blade Set',
    price: 650,
    originalPrice: 800,
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=300&h=300&fit=crop',
    category: 'Accessories',
    inStock: true,
    sku: 'WB-008',
    description: 'Frameless wiper blades for clear visibility'
  },
];

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updatedFields } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
