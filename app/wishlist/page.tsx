'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
  category: string;
  brand: string;
  addedAt: string;
}

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/login');
      return;
    }

    // Mock wishlist items for demo - replace with actual API call
    const mockWishlistItems: WishlistItem[] = [
      {
        id: '1',
        name: 'Premium Brake Pads Set',
        price: 149.99,
        originalPrice: 179.99,
        image: '/api/placeholder/300/200',
        inStock: true,
        category: 'Brake Parts',
        brand: 'AutoPro',
        addedAt: '2024-11-20T10:30:00Z'
      },
      {
        id: '2',
        name: 'High Performance Oil Filter',
        price: 89.50,
        image: '/api/placeholder/300/200',
        inStock: true,
        category: 'Engine Parts',
        brand: 'FilterMax',
        addedAt: '2024-11-25T14:20:00Z'
      },
      {
        id: '3',
        name: 'LED Headlight Bulbs',
        price: 299.99,
        originalPrice: 349.99,
        image: '/api/placeholder/300/200',
        inStock: false,
        category: 'Lighting',
        brand: 'BrightLux',
        addedAt: '2024-12-01T09:15:00Z'
      },
      {
        id: '4',
        name: 'Carbon Fiber Side Mirrors',
        price: 199.99,
        image: '/api/placeholder/300/200',
        inStock: true,
        category: 'Exterior',
        brand: 'CarbonTech',
        addedAt: '2024-12-03T16:45:00Z'
      }
    ];

    setWishlistItems(mockWishlistItems);
    setIsLoading(false);
  }, [session, status, router]);

  const removeFromWishlist = (itemId: string, itemName: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    toast.success(`${itemName} removed from wishlist`);
  };

  const addToCart = (item: WishlistItem) => {
    if (!item.inStock) {
      toast.error('This item is currently out of stock');
      return;
    }
    
    // Add to cart logic here
    toast.success(`${item.name} added to cart`);
  };

  const moveToCart = (item: WishlistItem) => {
    addToCart(item);
    removeFromWishlist(item.id, item.name);
  };

  if (status === 'loading' || isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <p className="text-muted-foreground">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved for later
            </p>
          </div>
          <Link href="/profile">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Button>
          </Link>
        </div>

        {wishlistItems.length > 0 ? (
          <>
            {/* Wishlist Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    {!item.inStock && (
                      <Badge variant="destructive" className="absolute top-2 left-2">
                        Out of Stock
                      </Badge>
                    )}
                    {item.originalPrice && (
                      <Badge variant="secondary" className="absolute top-2 right-2">
                        Sale
                      </Badge>
                    )}
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-2">{item.name}</CardTitle>
                    <CardDescription>
                      {item.brand} • {item.category}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Added {new Date(item.addedAt).toLocaleDateString()}
                    </p>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => addToCart(item)}
                        disabled={!item.inStock}
                        className="flex-1"
                        size="sm"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                      <Button
                        onClick={() => removeFromWishlist(item.id, item.name)}
                        variant="outline"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {item.inStock && (
                      <Button
                        onClick={() => moveToCart(item)}
                        variant="secondary"
                        className="w-full"
                        size="sm"
                      >
                        Move to Cart
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle>Wishlist Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{wishlistItems.length}</p>
                    <p className="text-sm text-muted-foreground">Total Items</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {wishlistItems.filter(item => item.inStock).length}
                    </p>
                    <p className="text-sm text-muted-foreground">In Stock</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      ${wishlistItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      ${wishlistItems.reduce((sum, item) => {
                        const savings = item.originalPrice ? item.originalPrice - item.price : 0;
                        return sum + savings;
                      }, 0).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Savings</p>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={() => {
                      wishlistItems
                        .filter(item => item.inStock)
                        .forEach(item => addToCart(item));
                      toast.success('All in-stock items added to cart');
                    }}
                    disabled={wishlistItems.filter(item => item.inStock).length === 0}
                  >
                    Add All to Cart
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setWishlistItems([]);
                      toast.success('Wishlist cleared');
                    }}
                  >
                    Clear Wishlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-2xl font-bold mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start adding items to your wishlist by clicking the heart icon on products you love.
              </p>
              <Link href="/">
                <Button size="lg">
                  Browse Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link href="/">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
          <Link href="/cart">
            <Button variant="outline">View Cart</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}