import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const productData = await req.json();

    // Validate required fields
    if (!productData.name || !productData.description || !productData.category || !productData.brand) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (productData.price <= 0) {
      return NextResponse.json(
        { error: 'Price must be greater than 0' },
        { status: 400 }
      );
    }

    if (productData.stockQuantity < 0) {
      return NextResponse.json(
        { error: 'Stock quantity cannot be negative' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if product with same ID already exists
    const existingProduct = await (Product as any).findOne({ id: productData.id });
    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with this ID already exists' },
        { status: 400 }
      );
    }

    // Create new product
    const product = new Product(productData);
    const savedProduct = await product.save();

    return NextResponse.json({ 
      message: 'Product created successfully',
      product: savedProduct
    }, { status: 201 });

  } catch (error: any) {
    console.error('Create product error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: `Validation error: ${validationErrors.join(', ')}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const products = await (Product as any).find({})
      .sort({ createdAt: -1 });

    return NextResponse.json({ products });

  } catch (error: any) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}