import { useParams, Navigate } from 'react-router-dom';
import { ProductForm } from '@/components/admin/ProductForm';
import { useProducts } from '@/contexts/ProductContext';

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const { getProduct } = useProducts();
  
  const product = id ? getProduct(id) : undefined;

  if (!product) {
    return <Navigate to="/admin/products" replace />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Edit Product</h2>
        <p className="text-muted-foreground">Update product information</p>
      </div>
      
      <ProductForm product={product} isEditing />
    </div>
  );
}
