'use client';

import { Toaster } from "@/src/components/ui/toaster";
import { Toaster as Sonner } from "@/src/components/ui/sonner";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import { ProductProvider } from "@/src/contexts/ProductContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ProductProvider>
      <TooltipProvider>
        {children}
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </ProductProvider>
  );
}