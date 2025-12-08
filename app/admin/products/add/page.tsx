'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { Switch } from '@/src/components/ui/switch';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  brand: string;
  inStock: boolean;
  stockQuantity: number;
  featured: boolean;
}

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    image: '',
    category: '',
    brand: '',
    inStock: true,
    stockQuantity: 0,
    featured: false,
  });

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session || session.user?.role !== 'ADMIN') {
    router.push('/auth/login');
    return null;
  }

  const categories = [
    'Brake Parts',
    'Engine Parts',
    'Lighting',
    'Exterior',
    'Interior',
    'Suspension',
    'Exhaust',
    'Transmission',
    'Electrical',
    'Cooling',
    'Fuel System',
    'Steering',
    'Wheels & Tires',
    'Body Parts',
    'Accessories'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const generateProductId = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 20) + '-' + Date.now().toString().slice(-6);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.category || !formData.brand) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.price <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }

    if (formData.stockQuantity < 0) {
      toast.error('Stock quantity cannot be negative');
      return;
    }

    setIsLoading(true);

    try {
      const productData = {
        ...formData,
        id: generateProductId(formData.name),
        image: formData.image || '/api/placeholder/300/200',
        rating: 0,
        reviews: 0
      };

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Product added successfully!');
        router.push('/admin/products');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to add product');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Add product error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Add New Product</h1>
            <p className="text-muted-foreground">Create a new product for your store</p>
          </div>
          <Link href="/admin/products">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Product Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                  <CardDescription>Basic details about the product</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand *</Label>
                      <Input
                        id="brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        placeholder="Enter brand name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter product description"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => handleSelectChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Enter image URL or leave blank for placeholder"
                    />
                    <p className="text-sm text-muted-foreground">
                      Leave empty to use a placeholder image
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Inventory</CardTitle>
                  <CardDescription>Set pricing and stock information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($) *</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="originalPrice">Original Price ($)</Label>
                      <Input
                        id="originalPrice"
                        name="originalPrice"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        placeholder="0.00"
                      />
                      <p className="text-sm text-muted-foreground">
                        Optional: For showing sale prices
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stockQuantity">Stock Quantity *</Label>
                    <Input
                      id="stockQuantity"
                      name="stockQuantity"
                      type="number"
                      min="0"
                      value={formData.stockQuantity}
                      onChange={handleInputChange}
                      placeholder="0"
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Settings & Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Settings</CardTitle>
                  <CardDescription>Configure product visibility and status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>In Stock</Label>
                      <p className="text-sm text-muted-foreground">
                        Product is available for purchase
                      </p>
                    </div>
                    <Switch
                      checked={formData.inStock}
                      onCheckedChange={(checked) => handleSwitchChange('inStock', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Featured Product</Label>
                      <p className="text-sm text-muted-foreground">
                        Show on homepage and featured sections
                      </p>
                    </div>
                    <Switch
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleSwitchChange('featured', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Adding Product...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Add Product
                      </>
                    )}
                  </Button>
                  
                  <Link href="/admin/products" className="block">
                    <Button type="button" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Preview */}
              {formData.name && (
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>How your product will appear</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-4 bg-muted/20">
                      <div className="aspect-square bg-muted rounded-md mb-3 flex items-center justify-center">
                        {formData.image ? (
                          <img src={formData.image} alt={formData.name} className="rounded-md" />
                        ) : (
                          <span className="text-muted-foreground text-sm">No Image</span>
                        )}
                      </div>
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">{formData.name || 'Product Name'}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{formData.brand || 'Brand'}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">${formData.price || '0.00'}</span>
                        {formData.originalPrice > 0 && formData.originalPrice !== formData.price && (
                          <span className="text-xs line-through text-muted-foreground">
                            ${formData.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}