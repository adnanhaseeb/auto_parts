'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import { Users, Package, ShoppingCart, DollarSign, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface DashboardData {
  overview: {
    users: {
      total: number;
      admins: number;
      regular: number;
      newThisMonth: number;
      growthPercent: string;
    };
    products: {
      total: number;
      inStock: number;
      outOfStock: number;
      newThisMonth: number;
      growthPercent: string;
    };
    orders: {
      today: number;
      revenue: string;
      revenueGrowth: string;
    };
  };
  recentActivity: {
    users: Array<{
      _id: string;
      name: string;
      email: string;
      role: string;
      createdAt: string;
    }>;
    products: Array<{
      _id: string;
      name: string;
      price: number;
      category: string;
      createdAt: string;
    }>;
  };
  analytics: {
    categoryStats: Array<{
      _id: string;
      count: number;
      totalValue: number;
    }>;
  };
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/login');
      return;
    }

    if (session.user?.role !== 'ADMIN') {
      router.push('/');
      return;
    }

    fetchDashboardData();
  }, [session, status, router]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/dashboard');
      
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
        setLastUpdated(new Date());
      } else {
        toast.error('Failed to fetch dashboard data');
      }
    } catch (error) {
      toast.error('Error loading dashboard data');
      console.error('Dashboard data error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatGrowth = (percent: string) => {
    const num = parseFloat(percent);
    return {
      value: Math.abs(num),
      isPositive: num >= 0,
      icon: num >= 0 ? TrendingUp : TrendingDown,
      color: num >= 0 ? 'text-green-600' : 'text-red-600'
    };
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <div>Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {session.user?.name}</p>
            {lastUpdated && (
              <p className="text-sm text-muted-foreground">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          <Button onClick={fetchDashboardData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button 
            onClick={async () => {
              try {
                const response = await fetch('/api/admin/seed-data', { method: 'POST' });
                if (response.ok) {
                  toast.success('Sample data seeded successfully!');
                  fetchDashboardData();
                } else {
                  toast.error('Failed to seed data');
                }
              } catch (error) {
                toast.error('Error seeding data');
              }
            }}
            variant="secondary"
          >
            Seed Sample Data
          </Button>
        </div>

        {dashboardData && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.overview.users.total.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {(() => {
                      const growth = formatGrowth(dashboardData.overview.users.growthPercent);
                      const GrowthIcon = growth.icon;
                      return (
                        <div className={`flex items-center ${growth.color}`}>
                          <GrowthIcon className="h-3 w-3 mr-1" />
                          {growth.value}% from last month
                        </div>
                      );
                    })()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {dashboardData.overview.users.newThisMonth} new this month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.overview.products.total.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {(() => {
                      const growth = formatGrowth(dashboardData.overview.products.growthPercent);
                      const GrowthIcon = growth.icon;
                      return (
                        <div className={`flex items-center ${growth.color}`}>
                          <GrowthIcon className="h-3 w-3 mr-1" />
                          {growth.value}% from last month
                        </div>
                      );
                    })()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {dashboardData.overview.products.outOfStock} out of stock
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.overview.orders.today}</div>
                  <p className="text-xs text-muted-foreground">
                    Daily orders processed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${dashboardData.overview.orders.revenue}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {(() => {
                      const growth = formatGrowth(dashboardData.overview.orders.revenueGrowth);
                      const GrowthIcon = growth.icon;
                      return (
                        <div className={`flex items-center ${growth.color}`}>
                          <GrowthIcon className="h-3 w-3 mr-1" />
                          {growth.value}% from last month
                        </div>
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Recent Users */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Users</CardTitle>
                  <CardDescription>Latest user registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboardData.recentActivity.users.map((user) => (
                      <div key={user._id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                            {user.role}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/admin/users" className="block mt-4">
                    <Button variant="outline" className="w-full">View All Users</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Recent Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Products</CardTitle>
                  <CardDescription>Recently added products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboardData.recentActivity.products.map((product) => (
                      <div key={product._id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${product.price}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(product.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/admin/products" className="block mt-4">
                    <Button variant="outline" className="w-full">View All Products</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Category Analytics */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
                <CardDescription>Products breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {dashboardData.analytics.categoryStats.map((category) => (
                    <div key={category._id} className="text-center p-4 bg-muted rounded-lg">
                      <h3 className="font-medium">{category._id}</h3>
                      <p className="text-2xl font-bold">{category.count}</p>
                      <p className="text-sm text-muted-foreground">
                        ${category.totalValue.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Management</CardTitle>
              <CardDescription>
                Add, edit, or remove products from your inventory
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/admin/products">
                <Button className="w-full">Manage Products</Button>
              </Link>
              <Link href="/admin/products/add">
                <Button variant="outline" className="w-full">Add New Product</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                View and manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/admin/users">
                <Button className="w-full">Manage Users</Button>
              </Link>
              <Button variant="outline" className="w-full">User Reports</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders & Sales</CardTitle>
              <CardDescription>
                Track orders, process payments, and view sales analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">View Orders</Button>
              <Button variant="outline" className="w-full">Sales Reports</Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/">
            <Button variant="outline">Back to Store</Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="outline">Admin Settings</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}