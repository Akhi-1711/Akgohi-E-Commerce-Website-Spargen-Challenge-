
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

const Wishlist = () => {
  const { addItem } = useCart();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  useEffect(() => {
    loadWishlistItems();
  }, []);

  const loadWishlistItems = () => {
    try {
      const items = JSON.parse(localStorage.getItem('akgohi_wishlist') || '[]');
      setWishlistItems(items);
    } catch (error) {
      console.error('Error loading wishlist:', error);
      setWishlistItems([]);
    }
  };

  const removeFromWishlist = (itemId: string) => {
    try {
      const updatedItems = wishlistItems.filter(item => item.id !== itemId);
      localStorage.setItem('akgohi_wishlist', JSON.stringify(updatedItems));
      setWishlistItems(updatedItems);
      
      toast({
        title: "Removed from Wishlist",
        description: "Item has been removed from your wishlist.",
      });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist.",
        variant: "destructive"
      });
    }
  };

  const addToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
    
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const moveToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-black hover:text-gray-700 transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-black">My Wishlist</h1>
            </div>
            <Link to="/" className="text-2xl font-bold text-black">
              AKGOHI
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-black mb-4">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Start adding items you love to your wishlist!</p>
            <Link to="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">{wishlistItems.length} item(s) in your wishlist</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((product) => (
                <Card key={product.id} className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                        onClick={() => removeFromWishlist(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {product.discount && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                          {product.discount}% OFF
                        </Badge>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <Link to={`/product/${product.id}`} className="block hover:text-blue-600 transition-colors">
                        <h3 className="font-semibold text-black mb-2 line-clamp-2">{product.name}</h3>
                      </Link>
                      
                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating || 4) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">({product.reviews || 0})</span>
                      </div>

                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-lg font-bold text-black">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Button 
                          onClick={() => moveToCart(product)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Move to Cart
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => removeFromWishlist(product.id)}
                          className="w-full border-gray-300 text-black hover:bg-gray-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
