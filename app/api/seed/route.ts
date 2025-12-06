/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

// POST /api/seed - Add sample products to the database
export async function POST() {
  try {
    await connectToDatabase();
    
    // Clear existing products
    await (Product as any).deleteMany({});
    
    // Sample products
    const sampleProducts = [
      {
        id: '1',
        name: 'Denso Iridium Spark Plug',
        description: 'High-quality iridium spark plug for better fuel efficiency and performance',
        price: 850,
        originalPrice: 1200,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
        category: 'Engine Parts',
        brand: 'Denso',
        inStock: true,
        featured: true,
        rating: 4.8,
        reviews: 127
      },
      {
        id: '2',
        name: 'Bosch Brake Pads Set',
        description: 'Premium brake pads for superior stopping power and safety',
        price: 3500,
        originalPrice: 4200,
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=300&fit=crop',
        category: 'Brake System',
        brand: 'Bosch',
        inStock: true,
        featured: false,
        rating: 4.6,
        reviews: 89
      },
      {
        id: '3',
        name: 'NGK Ignition Coil',
        description: 'Reliable ignition coil for consistent engine performance',
        price: 2800,
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300&h=300&fit=crop',
        category: 'Electrical',
        brand: 'NGK',
        inStock: true,
        featured: false,
        rating: 4.7,
        reviews: 156
      },
      {
        id: '4',
        name: 'Castrol Engine Oil 10W-40',
        description: 'High-performance engine oil for maximum protection',
        price: 1200,
        originalPrice: 1500,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
        category: 'Fluids',
        brand: 'Castrol',
        inStock: false,
        featured: true,
        rating: 4.9,
        reviews: 234
      },
      {
        id: '5',
        name: 'Michelin Wiper Blades',
        description: 'All-weather wiper blades for clear visibility',
        price: 450,
        image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=300&h=300&fit=crop',
        category: 'Accessories',
        brand: 'Michelin',
        inStock: true,
        featured: false,
        rating: 4.4,
        reviews: 78
      },
      {
        id: '6',
        name: 'K&N Air Filter',
        description: 'High-flow air filter for improved engine performance',
        price: 1800,
        originalPrice: 2100,
        image: 'https://images.unsplash.com/photo-1558049815-19c6c2168c7f?w=300&h=300&fit=crop',
        category: 'Engine Parts',
        brand: 'K&N',
        inStock: true,
        featured: true,
        rating: 4.5,
        reviews: 112
      }
    ];
    
    // Insert sample products
    const insertedProducts = await (Product as any).insertMany(sampleProducts);
    
    return NextResponse.json({
      message: 'Sample products seeded successfully',
      count: insertedProducts.length,
      products: insertedProducts
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed products' },
      { status: 500 }
    );
  }
}