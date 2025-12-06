import { useState } from "react";
import { Filter, LayoutGrid, List, Grid2X2, Grid3X3 } from "lucide-react";
import { useProducts } from "@/contexts/ProductContext";
import ProductCard from "./ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type GridLayout = "list" | "2" | "3" | "4" | "5";
type SortOption = "alphabetically-asc" | "alphabetically-desc" | "price-asc" | "price-desc";

const ProductGrid = () => {
  const { products } = useProducts();
  const [layout, setLayout] = useState<GridLayout>("4");
  const [sortBy, setSortBy] = useState<SortOption>("alphabetically-asc");
  const [showFilters, setShowFilters] = useState(false);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "alphabetically-asc":
        return a.name.localeCompare(b.name);
      case "alphabetically-desc":
        return b.name.localeCompare(a.name);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const getGridClass = () => {
    switch (layout) {
      case "list":
        return "grid-cols-1";
      case "2":
        return "grid-cols-1 sm:grid-cols-2";
      case "3":
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
      case "4":
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
      case "5":
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
      default:
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
    }
  };

  return (
    <div className="py-8">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Auto Spare Parts</h1>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
        {/* Filter Button */}
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
          Filter
        </Button>

        {/* Layout Switcher */}
        <div className="hidden md:flex items-center gap-1 bg-secondary rounded-lg p-1">
          <button
            onClick={() => setLayout("list")}
            className={cn(
              "p-2 rounded transition-colors",
              layout === "list" ? "bg-background shadow" : "hover:bg-background/50"
            )}
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => setLayout("2")}
            className={cn(
              "p-2 rounded transition-colors",
              layout === "2" ? "bg-background shadow" : "hover:bg-background/50"
            )}
          >
            <Grid2X2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setLayout("3")}
            className={cn(
              "p-2 rounded transition-colors",
              layout === "3" ? "bg-background shadow" : "hover:bg-background/50"
            )}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setLayout("4")}
            className={cn(
              "p-2 rounded transition-colors",
              layout === "4" ? "bg-background shadow" : "hover:bg-background/50"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setLayout("5")}
            className={cn(
              "p-2 rounded transition-colors flex items-center justify-center text-xs font-bold",
              layout === "5" ? "bg-background shadow" : "hover:bg-background/50"
            )}
          >
            5
          </button>
        </div>

        {/* Sort Dropdown */}
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alphabetically-asc">Alphabetically, A-Z</SelectItem>
            <SelectItem value="alphabetically-desc">Alphabetically, Z-A</SelectItem>
            <SelectItem value="price-asc">Price, low to high</SelectItem>
            <SelectItem value="price-desc">Price, high to low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Filter Sidebar (Mobile) */}
      {showFilters && (
        <div className="mb-6 p-4 bg-secondary rounded-lg animate-fade-in">
          <h3 className="font-semibold mb-3">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-full">
              All
            </button>
            <button className="px-3 py-1 text-sm bg-background border border-border rounded-full hover:border-primary">
              LED & Lightening
            </button>
            <button className="px-3 py-1 text-sm bg-background border border-border rounded-full hover:border-primary">
              Exterior
            </button>
            <button className="px-3 py-1 text-sm bg-background border border-border rounded-full hover:border-primary">
              Interior
            </button>
            <button className="px-3 py-1 text-sm bg-background border border-border rounded-full hover:border-primary">
              Car Care
            </button>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className={cn("grid gap-4", getGridClass())}>
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        <Button variant="outline" disabled>
          Previous
        </Button>
        <Button variant="default">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
        <Button variant="outline">Next</Button>
      </div>
    </div>
  );
};

export default ProductGrid;
