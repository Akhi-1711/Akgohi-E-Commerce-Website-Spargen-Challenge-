
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  stock: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  discount: number;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 2999,
      originalPrice: 4999,
      category: 'Electronics',
      stock: 50,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      description: 'High-quality wireless headphones with active noise cancellation',
      rating: 4.8,
      reviews: 324,
      discount: 40
    },
    {
      id: '2',
      name: 'Organic Cotton T-Shirt',
      price: 799,
      originalPrice: 1299,
      category: 'Apparel',
      stock: 100,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
      description: '100% organic cotton t-shirt with premium comfort',
      rating: 4.5,
      reviews: 156,
      discount: 38
    },
    {
      id: '3',
      name: 'Fresh Organic Apples (1kg)',
      price: 199,
      originalPrice: 299,
      category: 'Organic',
      stock: 75,
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop',
      description: 'Premium quality organic apples grown without pesticides',
      rating: 4.6,
      reviews: 89,
      discount: 33
    },
    {
      id: '4',
      name: 'Professional Yoga Mat',
      price: 1299,
      originalPrice: 1999,
      category: 'Yoga',
      stock: 30,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
      description: 'Eco-friendly TPE yoga mat with superior non-slip surface',
      rating: 4.7,
      reviews: 234,
      discount: 35
    },
    {
      id: '5',
      name: 'Smart Fitness Watch',
      price: 5999,
      originalPrice: 8999,
      category: 'Electronics',
      stock: 25,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      description: 'Advanced fitness tracking with heart rate monitor',
      rating: 4.4,
      reviews: 187,
      discount: 33
    }
  ]);

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    originalPrice: 0,
    category: '',
    stock: 0,
    image: '',
    description: '',
    rating: 0,
    reviews: 0,
    discount: 0
  });

  const categories = [
    'Electronics', 'Apparel', 'Books', 'Organic', 'Yoga', 'Kitchen', 
    'Footwear', 'Cosmetics', 'Jewelry', 'Home Decor'
  ];

  const getDefaultImageForCategory = (category: string) => {
    const categoryImageMap: { [key: string]: string } = {
      'Electronics': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      'Apparel': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
      'Books': 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=300&fit=crop',
      'Organic': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop',
      'Yoga': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
      'Kitchen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop',
      'Footwear': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
      'Cosmetics': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
      'Jewelry': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
      'Home Decor': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop'
    };
    
    return categoryImageMap[category] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop';
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      id: String(Date.now()),
      name: newProduct.name!,
      price: newProduct.price!,
      originalPrice: newProduct.originalPrice || newProduct.price!,
      category: newProduct.category!,
      stock: newProduct.stock || 0,
      image: newProduct.image || getDefaultImageForCategory(newProduct.category!),
      description: newProduct.description || '',
      rating: newProduct.rating || 0,
      reviews: newProduct.reviews || 0,
      discount: newProduct.discount || 0
    };

    setProducts([...products, product]);
    setNewProduct({});
    setIsAddingProduct(false);
    
    toast({
      title: "Success",
      description: "Product added successfully!",
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setIsAddingProduct(true);
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;

    const updatedProducts = products.map(p => 
      p.id === editingProduct.id ? { ...newProduct as Product } : p
    );
    
    setProducts(updatedProducts);
    setEditingProduct(null);
    setNewProduct({});
    setIsAddingProduct(false);
    
    toast({
      title: "Success",
      description: "Product updated successfully!",
    });
  };

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    
    toast({
      title: "Success",
      description: "Product deleted successfully!",
    });
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (stock < 10) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-black">Product Management</CardTitle>
          <Button onClick={() => setIsAddingProduct(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </CardHeader>
        <CardContent>
          {isAddingProduct && (
            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Product Name"
                  value={newProduct.name || ''}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                />
                <Input
                  placeholder="Price"
                  type="number"
                  value={newProduct.price || ''}
                  onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                />
                <Input
                  placeholder="Original Price"
                  type="number"
                  value={newProduct.originalPrice || ''}
                  onChange={(e) => setNewProduct({...newProduct, originalPrice: Number(e.target.value)})}
                />
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={newProduct.category || ''}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <Input
                  placeholder="Stock Quantity"
                  type="number"
                  value={newProduct.stock || ''}
                  onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                />
                <Input
                  placeholder="Image URL (optional)"
                  value={newProduct.image || ''}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                />
                <div className="md:col-span-2">
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Product Description"
                    rows={3}
                    value={newProduct.description || ''}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button 
                  onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAddingProduct(false);
                    setEditingProduct(null);
                    setNewProduct({});
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.description.substring(0, 50)}...</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-bold">₹{product.price}</p>
                          {product.originalPrice > product.price && (
                            <p className="text-sm text-gray-500 line-through">₹{product.originalPrice}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.stock}</p>
                          <Badge className={stockStatus.color}>{stockStatus.label}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.rating}/5</p>
                          <p className="text-sm text-gray-500">({product.reviews} reviews)</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManagement;
