import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="bg-header text-header-foreground py-4">
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground px-3 py-2 rounded font-bold text-xl">
              SEHGALMOTORS<span className="text-sm">.PK</span>
            </div>
          </div>
        </a>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search for products"
              className="w-full bg-background text-foreground pl-4 pr-12 py-2 rounded-full border-0"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-secondary hover:bg-secondary/80 p-2 rounded-full transition-colors">
              <Search className="h-5 w-5 text-secondary-foreground" />
            </button>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <button className="hover:text-primary transition-colors hidden sm:block">
            <User className="h-6 w-6" />
          </button>
          <button className="hover:text-primary transition-colors relative">
            <Heart className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
              0
            </span>
          </button>
          <button className="hover:text-primary transition-colors relative">
            <ShoppingBag className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="container mx-auto mt-4 md:hidden">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search for products"
            className="w-full bg-background text-foreground pl-4 pr-12 py-2 rounded-full border-0"
          />
          <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-secondary hover:bg-secondary/80 p-2 rounded-full transition-colors">
            <Search className="h-5 w-5 text-secondary-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;