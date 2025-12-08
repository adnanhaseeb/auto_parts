import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

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

    // Get user statistics
    const totalUsers = await (User as any).countDocuments();
    const adminUsers = await (User as any).countDocuments({ role: 'ADMIN' });
    const regularUsers = await (User as any).countDocuments({ role: 'USER' });

    // Get users created in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newUsersThisMonth = await (User as any).countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Calculate growth percentage (mock calculation for now)
    const previousMonthUsers = totalUsers - newUsersThisMonth;
    const userGrowthPercent = previousMonthUsers > 0 
      ? ((newUsersThisMonth / previousMonthUsers) * 100).toFixed(1)
      : '100.0';

    // Get recent user registrations
    const recentUsers = await (User as any)
      .find({}, 'name email role createdAt')
      .sort({ createdAt: -1 })
      .limit(10);

    return NextResponse.json({
      userStats: {
        total: totalUsers,
        admins: adminUsers,
        users: regularUsers,
        newThisMonth: newUsersThisMonth,
        growthPercent: userGrowthPercent
      },
      recentUsers
    });

  } catch (error: any) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}