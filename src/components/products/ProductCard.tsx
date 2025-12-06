import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/src/contexts/ProductContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return `Rs.${price.toLocaleString()}`;
  };

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {!product.inStock && (
          <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded font-medium">
            OUT OF STOCK
          </span>
        )}
      </div>

      {/* Quick Actions */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="bg-background p-2 rounded-full shadow hover:bg-primary hover:text-primary-foreground transition-colors">
          <Heart className="h-4 w-4" />
        </button>
        <button className="bg-background p-2 rounded-full shadow hover:bg-primary hover:text-primary-foreground transition-colors">
          <Eye className="h-4 w-4" />
        </button>
      </div>

      {/* Image */}
      <a href={`/product/${product.id}`} className="block aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105",
            !product.inStock && "opacity-60"
          )}
        />
      </a>

      {/* Add to Cart - appears on hover */}
      <div className="absolute bottom-[100px] left-0 right-0 px-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className={cn(
            "w-full flex items-center justify-center gap-2 py-2 rounded font-medium text-sm transition-colors",
            product.inStock
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
          disabled={!product.inStock}
        >
          <ShoppingBag className="h-4 w-4" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <a href={`/product/${product.id}`}>
          <h3 className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors min-h-[40px]">
            {product.name}
          </h3>
        </a>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold text-foreground">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
