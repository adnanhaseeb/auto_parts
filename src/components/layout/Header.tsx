'use client';

import { Search, User, Heart, ShoppingBag, LogOut, Settings, Shield } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-header text-header-foreground py-4">
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground px-3 py-2 rounded font-bold text-xl">
              Auto Parts
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
          {/* User Menu */}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hover:text-primary transition-colors hidden sm:flex items-center gap-2 px-2 py-1 rounded-md hover:bg-secondary/20">
                  <User className="h-6 w-6" />
                  <span className="text-sm max-w-[100px] truncate">
                    {session.user?.name}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {session.user?.role === 'ADMIN' && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="cursor-pointer text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile User Icon */}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hover:text-primary transition-colors sm:hidden">
                  <User className="h-6 w-6" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {session.user?.role === 'ADMIN' && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="cursor-pointer text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login" className="sm:hidden">
              <button className="hover:text-primary transition-colors">
                <User className="h-6 w-6" />
              </button>
            </Link>
          )}

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