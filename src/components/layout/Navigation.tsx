import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { categories } from "@/data/products";
import { cn } from "@/lib/utils";
import Link from "next/link";

type NavItem = {
  name: string;
  href?: string;
  slug?: string;
  isHighlight?: boolean;
};

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { name: "ALL PRODUCTS", href: "/products" },
    { name: "LED & LIGHTENING", slug: "led-lightening" },
    { name: "EXTERIOR", slug: "exterior" },
    { name: "INTERIOR", slug: "interior" },
    { name: "CAR CARE", slug: "car-care" },
    { name: "MODIFICATIONS", slug: "modifications" },
    { name: "GADGETS", slug: "gadgets" },
    { name: "PAINT PROTECTION FILM", slug: "ppf" },
    { name: "MORE", slug: "more" },
    { name: "SALE", slug: "sale", isHighlight: true },
  ];

  return (
    <nav className="bg-nav text-nav-foreground">
      <div className="container mx-auto">
        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center justify-center">
          {navItems.map((item) => {
            // Handle direct links (like "ALL PRODUCTS")
            if (item.href) {
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-3 text-sm font-medium hover:text-primary transition-colors",
                      item.isHighlight && "text-sale"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            }

            // Handle category links
            const category = categories.find((c) => c.slug === item.slug);
            const hasSubmenu = category?.subcategories && category.subcategories.length > 0;

            return (
              <li
                key={item.slug}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.slug)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={`/category/${item.slug}`}
                  className={cn(
                    "flex items-center gap-1 px-4 py-3 text-sm font-medium hover:text-primary transition-colors",
                    item.isHighlight && "text-sale"
                  )}
                >
                  {item.name}
                  {hasSubmenu && <ChevronDown className="h-4 w-4" />}
                </a>

                {/* Dropdown */}
                {hasSubmenu && activeDropdown === item.slug && (
                  <div className="absolute left-0 top-full bg-background text-foreground shadow-lg rounded-b-md min-w-[220px] z-50 animate-slide-down">
                    <ul className="py-2">
                      {category.subcategories?.map((sub) => (
                        <li key={sub.slug}>
                          <a
                            href={`/category/${item.slug}/${sub.slug}`}
                            className="block px-4 py-2 text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors"
                          >
                            {sub.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center justify-between py-3 px-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="font-medium">Menu</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-background text-foreground">
            <ul className="divide-y divide-border">
              {navItems.map((item, index) => (
                <li key={item.slug || item.href || index}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 hover:bg-secondary transition-colors",
                        item.isHighlight && "text-sale font-medium"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={`/category/${item.slug}`}
                      className={cn(
                        "block px-4 py-3 hover:bg-secondary transition-colors",
                        item.isHighlight && "text-sale font-medium"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;