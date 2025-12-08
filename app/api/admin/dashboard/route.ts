import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
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

    // User Statistics
    const totalUsers = await (User as any).countDocuments();
    const adminUsers = await (User as any).countDocuments({ role: 'ADMIN' });
    const regularUsers = await (User as any).countDocuments({ role: 'USER' });

    // Product Statistics  
    const totalProducts = await (Product as any).countDocuments();
    const inStockProducts = await (Product as any).countDocuments({ inStock: true });
    const outOfStockProducts = await (Product as any).countDocuments({ inStock: false });

    // Monthly growth calculations
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const newUsersThisMonth = await (User as any).countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });
    
    const newProductsThisMonth = await (Product as any).countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Calculate growth percentages
    const previousMonthUsers = totalUsers - newUsersThisMonth;
    const userGrowthPercent = previousMonthUsers > 0 
      ? ((newUsersThisMonth / previousMonthUsers) * 100).toFixed(1)
      : '100.0';

    const previousMonthProducts = totalProducts - newProductsThisMonth;
    const productGrowthPercent = previousMonthProducts > 0 
      ? ((newProductsThisMonth / previousMonthProducts) * 100).toFixed(1)
      : '100.0';

    // Mock order and revenue data (replace with actual order model when available)
    const mockOrdersToday = Math.floor(Math.random() * 20) + 10;
    const mockRevenue = (Math.random() * 5000 + 10000).toFixed(2);
    const mockRevenueGrowth = (Math.random() * 30 + 5).toFixed(1);

    // Recent activity
    const recentUsers = await (User as any)
      .find({}, 'name email role createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentProducts = await (Product as any)
      .find({}, 'name price category createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    // Product categories breakdown
    const categoryStats = await (Product as any).aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalValue: { $sum: '$price' }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ]);

    return NextResponse.json({
      overview: {
        users: {
          total: totalUsers,
          admins: adminUsers,
          regular: regularUsers,
          newThisMonth: newUsersThisMonth,
          growthPercent: userGrowthPercent
        },
        products: {
          total: totalProducts,
          inStock: inStockProducts,
          outOfStock: outOfStockProducts,
          newThisMonth: newProductsThisMonth,
          growthPercent: productGrowthPercent
        },
        orders: {
          today: mockOrdersToday,
          revenue: mockRevenue,
          revenueGrowth: mockRevenueGrowth
        }
      },
      recentActivity: {
        users: recentUsers,
        products: recentProducts
      },
      analytics: {
        categoryStats
      }
    });

  } catch (error: any) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}