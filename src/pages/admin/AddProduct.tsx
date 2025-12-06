import { ProductForm } from '@/components/admin/ProductForm';

export default function AddProduct() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Add New Product</h2>
        <p className="text-muted-foreground">Add a new product to your inventory</p>
      </div>
      
      <ProductForm />
    </div>
  );
}
