/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

// GET /api/products - Get all products
export async function GET() {
  try {
    await connectToDatabase();
    const products = await (Product as any).find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
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
    await connectToDatabase();
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