import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Sample products data
    const sampleProducts = [
      {
        id: 'brake-pads-001',
        name: 'Premium Brake Pads Set',
        description: 'High-performance brake pads for superior stopping power',
        price: 149.99,
        originalPrice: 179.99,
        image: '/api/placeholder/300/200',
        category: 'Brake Parts',
        brand: 'AutoPro',
        inStock: true,
        stockQuantity: 25,
        featured: true,
        rating: 4.8,
        reviews: 124
      },
      {
        id: 'oil-filter-002',
        name: 'High Performance Oil Filter',
        description: 'Premium oil filter for engine protection',
        price: 89.50,
        image: '/api/placeholder/300/200',
        category: 'Engine Parts',
        brand: 'FilterMax',
        inStock: true,
        stockQuantity: 45,
        featured: false,
        rating: 4.6,
        reviews: 89
      },
      {
        id: 'led-headlights-003',
        name: 'LED Headlight Bulbs',
        description: 'Ultra-bright LED headlight replacement bulbs',
        price: 299.99,
        originalPrice: 349.99,
        image: '/api/placeholder/300/200',
        category: 'Lighting',
        brand: 'BrightLux',
        inStock: false,
        stockQuantity: 0,
        featured: true,
        rating: 4.9,
        reviews: 203
      },
      {
        id: 'carbon-mirrors-004',
        name: 'Carbon Fiber Side Mirrors',
        description: 'Lightweight carbon fiber replacement mirrors',
        price: 199.99,
        image: '/api/placeholder/300/200',
        category: 'Exterior',
        brand: 'CarbonTech',
        inStock: true,
        stockQuantity: 8,
        featured: false,
        rating: 4.7,
        reviews: 56
      },
      {
        id: 'spark-plugs-005',
        name: 'Platinum Spark Plugs',
        description: 'Long-lasting platinum spark plugs',
        price: 125.00,
        image: '/api/placeholder/300/200',
        category: 'Engine Parts',
        brand: 'IgnitePro',
        inStock: true,
        stockQuantity: 60,
        featured: false,
        rating: 4.5,
        reviews: 78
      },
      {
        id: 'air-filter-006',
        name: 'Performance Air Filter',
        description: 'High-flow performance air filter',
        price: 75.99,
        image: '/api/placeholder/300/200',
        category: 'Engine Parts',
        brand: 'AirMax',
        inStock: true,
        stockQuantity: 35,
        featured: false,
        rating: 4.4,
        reviews: 92
      },
      {
        id: 'suspension-kit-007',
        name: 'Sport Suspension Kit',
        description: 'Complete sport suspension upgrade kit',
        price: 899.99,
        originalPrice: 1099.99,
        image: '/api/placeholder/300/200',
        category: 'Suspension',
        brand: 'SuspensionPro',
        inStock: true,
        stockQuantity: 5,
        featured: true,
        rating: 4.8,
        reviews: 45
      },
      {
        id: 'exhaust-system-008',
        name: 'Performance Exhaust System',
        description: 'Cat-back performance exhaust system',
        price: 1299.99,
        image: '/api/placeholder/300/200',
        category: 'Exhaust',
        brand: 'ExhaustMax',
        inStock: true,
        stockQuantity: 3,
        featured: true,
        rating: 4.9,
        reviews: 67
      }
    ];

    // Sample users data
    const sampleUsers = [
      {
        name: 'John Smith',
        email: 'john.smith@example.com',
        password: 'password123',
        role: 'USER'
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        password: 'password123',
        role: 'USER'
      },
      {
        name: 'Mike Wilson',
        email: 'mike.wilson@example.com',
        password: 'password123',
        role: 'USER'
      },
      {
        name: 'Lisa Davis',
        email: 'lisa.davis@example.com',
        password: 'password123',
        role: 'USER'
      },
      {
        name: 'David Brown',
        email: 'david.brown@example.com',
        password: 'password123',
        role: 'USER'
      }
    ];

    // Clear existing data (optional)
    await (Product as any).deleteMany({});

    // Insert sample products
    await (Product as any).insertMany(sampleProducts);

    // Insert sample users (only if they don't exist)
    for (const userData of sampleUsers) {
      const existingUser = await (User as any).findOne({ email: userData.email });
      if (!existingUser) {
        const user = new User(userData);
        await user.save();
      }
    }

    return NextResponse.json({ 
      message: 'Sample data seeded successfully',
      seeded: {
        products: sampleProducts.length,
        users: sampleUsers.length
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Seed data error:', error);
    return NextResponse.json(
      { error: 'Failed to seed data' },
      { status: 500 }
    );
  }
}