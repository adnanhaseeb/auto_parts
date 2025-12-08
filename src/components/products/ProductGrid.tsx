'use client'

import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package, Loader2 } from 'lucide-react'
import { Product } from '@/src/contexts/ProductContext'

interface ProductGridProps {
  searchTerm?: string
  category?: string
  brand?: string
  sortBy?: string
  featured?: boolean
  limit?: number
}

export default function ProductGrid({ 
  searchTerm = '', 
  category = '', 
  brand = '', 
  sortBy = '',
  featured,
  limit 
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setPage(1)
    setProducts([])
    fetchProducts(1, true)
  }, [searchTerm, category, brand, sortBy, featured])

  const fetchProducts = async (pageNum: number = 1, reset: boolean = false) => {
    try {
      setIsLoading(true)
      setError(null)

      const params = new URLSearchParams()
      params.append('page', pageNum.toString())
      params.append('limit', (limit || 12).toString())
      
      if (searchTerm) params.append('search', searchTerm)
      if (category) params.append('category', category)
      if (brand) params.append('brand', brand)
      if (sortBy) params.append('sort', sortBy)
      if (featured !== undefined) params.append('featured', featured.toString())

      const response = await fetch(`/api/products?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`)
      }

      const data = await response.json()
      
      if (reset) {
        setProducts(data.products || [])
      } else {
        setProducts(prev => [...prev, ...(data.products || [])])
      }
      
      setTotal(data.total || 0)
      setHasMore(data.hasMore || false)
      setPage(pageNum)

    } catch (error) {
      console.error('Error fetching products:', error)
      setError(error instanceof Error ? error.message : 'Failed to load products')
    } finally {
      setIsLoading(false)
    }
  }

  const loadMore = () => {
    if (!isLoading && hasMore) {
      fetchProducts(page + 1, false)
    }
  }

  if (isLoading && products.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-muted rounded-lg mb-3"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-3 bg-muted rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="text-center p-12">
        <CardContent>
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Error Loading Products</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button 
            onClick={() => fetchProducts(1, true)} 
            variant="outline"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (products.length === 0) {
    return (
      <Card className="text-center p-12">
        <CardContent>
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Products Found</h3>
          <p className="text-muted-foreground">
            {searchTerm || category || brand 
              ? "Try adjusting your search or filters to find what you're looking for."
              : "No products are available at the moment. Check back soon!"
            }
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Results Summary */}
      {(searchTerm || category || brand) && (
        <div className="text-sm text-muted-foreground">
          Showing {products.length} of {total} results
          {searchTerm && ` for "${searchTerm}"`}
          {category && ` in ${category}`}
          {brand && ` from ${brand}`}
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && products.length < total && (
        <div className="text-center">
          <Button 
            onClick={loadMore} 
            disabled={isLoading}
            variant="outline" 
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              `Load More (${total - products.length} remaining)`
            )}
          </Button>
        </div>
      )}

      {/* Total Results */}
      {!hasMore && total > 12 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing all {total} products
        </div>
      )}
    </div>
  )
}
