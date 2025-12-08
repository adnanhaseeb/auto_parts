/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

// GET /api/products - Get all products with filtering
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '0');
    const search = searchParams.get('search');

    let query: any = {};

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Filter by featured
    if (featured === 'true') {
      query.featured = true;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    let productsQuery = (Product as any).find(query)
      .sort({ createdAt: -1 });

    // Apply limit if specified
    if (limit > 0) {
      productsQuery = productsQuery.limit(limit);
    }

    const products = await productsQuery;

    // Get unique categories for filter options
    const categories = await (Product as any).distinct('category');

    return NextResponse.json({ 
      products,
      categories: categories.sort()
    });

  } catch (error: any) {
    console.error('GET /api/products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const productData = await request.json();
    
    // Generate unique ID if not provided
    if (!productData.id) {
      productData.id = Date.now().toString();
    }
    
    const product = new (Product as any)(productData);
    const savedProduct = await product.save();
    
    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    console.error('POST /api/products error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Product with this ID already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}