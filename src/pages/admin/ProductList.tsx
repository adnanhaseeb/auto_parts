import { ProductTable } from '@/components/admin/ProductTable';

export default function ProductList() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">All Products</h2>
        <p className="text-muted-foreground">Manage your product inventory</p>
      </div>
      
      <ProductTable />
    </div>
  );
}
