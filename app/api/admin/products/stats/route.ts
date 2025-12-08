import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

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

    // Get product statistics
    const totalProducts = await (Product as any).countDocuments();
    const inStockProducts = await (Product as any).countDocuments({ inStock: true });
    const outOfStockProducts = await (Product as any).countDocuments({ inStock: false });
    const featuredProducts = await (Product as any).countDocuments({ featured: true });

    // Get products by category
    const productsByCategory = await (Product as any).aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Get recent products (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newProductsThisMonth = await (Product as any).countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Calculate growth percentage
    const previousMonthProducts = totalProducts - newProductsThisMonth;
    const productGrowthPercent = previousMonthProducts > 0 
      ? ((newProductsThisMonth / previousMonthProducts) * 100).toFixed(1)
      : '100.0';

    // Get low stock products (less than 10 items)
    const lowStockProducts = await (Product as any)
      .find({ stockQuantity: { $lt: 10, $gt: 0 } }, 'name stockQuantity')
      .sort({ stockQuantity: 1 })
      .limit(10);

    return NextResponse.json({
      productStats: {
        total: totalProducts,
        inStock: inStockProducts,
        outOfStock: outOfStockProducts,
        featured: featuredProducts,
        newThisMonth: newProductsThisMonth,
        growthPercent: productGrowthPercent
      },
      productsByCategory,
      lowStockProducts
    });

  } catch (error: any) {
    console.error('Product stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}