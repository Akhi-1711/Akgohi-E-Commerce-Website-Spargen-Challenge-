
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Star, ArrowRight, Sparkles, Gift, Truck, Shield, RotateCcw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { AuthModal } from '@/components/AuthModal';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const { state, addItem } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'electronics', name: 'Electronics', icon: '📱', count: 120, color: 'bg-blue-500' },
    { id: 'fashion', name: 'Fashion', icon: '👕', count: 85, color: 'bg-pink-500' },
    { id: 'home', name: 'Home & Garden', icon: '🏠', count: 95, color: 'bg-green-500' },
    { id: 'books', name: 'Books', icon: '📚', count: 200, color: 'bg-amber-500' },
    { id: 'sports', name: 'Sports', icon: '⚽', count: 75, color: 'bg-orange-500' },
    { id: 'beauty', name: 'Beauty', icon: '💄', count: 60, color: 'bg-purple-500' }
  ];

  const featuredProducts = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 2999,
      originalPrice: 4999,
      image: 'https://picsum.photos/300/300?random=1',
      rating: 4.8,
      reviews: 324,
      discount: 40,
      category: 'electronics',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.'
    },
    {
      id: '2',
      name: 'Stylish Cotton T-Shirt',
      price: 799,
      originalPrice: 1299,
      image: 'https://picsum.photos/300/300?random=2',
      rating: 4.5,
      reviews: 156,
      discount: 38,
      category: 'fashion',
      description: 'Comfortable and stylish cotton t-shirt available in multiple colors. Made from premium organic cotton for everyday wear.'
    },
    {
      id: '3',
      name: 'Smart Home Security Camera',
      price: 1999,
      originalPrice: 2999,
      image: 'https://picsum.photos/300/300?random=3',
      rating: 4.6,
      reviews: 89,
      discount: 33,
      category: 'electronics',
      description: 'Advanced security camera with 1080p HD video, night vision, and smartphone app control. Keep your home safe 24/7.'
    },
    {
      id: '4',
      name: 'Yoga Mat Premium',
      price: 1299,
      originalPrice: 1999,
      image: 'https://picsum.photos/300/300?random=4',
      rating: 4.7,
      reviews: 234,
      discount: 35,
      category: 'sports',
      description: 'Non-slip yoga mat made from eco-friendly materials. Perfect for yoga, pilates, and home workouts with superior grip.'
    }
  ];

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

  const addToWishlist = (product: any) => {
    const wishlistItems = JSON.parse(localStorage.getItem('akgohi_wishlist') || '[]');
    const existingItem = wishlistItems.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      toast({
        title: "Already in Wishlist",
        description: "This item is already in your wishlist.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedWishlist = [...wishlistItems, { ...product, addedDate: new Date().toISOString() }];
    localStorage.setItem('akgohi_wishlist', JSON.stringify(updatedWishlist));
    
    toast({
      title: "Added to Wishlist!",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-3xl font-bold text-black">
              AKGOHI
            </Link>
            
            <div className="hidden md:flex items-center space-x-6 flex-1 max-w-xl mx-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-10 bg-gray-50 border-gray-200 text-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => openAuth('login')} className="text-black hover:bg-gray-100">
                <User className="h-5 w-5 mr-1" />
                Login
              </Button>
              
              <Link to="/cart">
                <Button variant="ghost" className="relative text-black hover:bg-gray-100">
                  <ShoppingCart className="h-5 w-5" />
                  {state.itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                      {state.itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search products..." 
                className="pl-10 bg-gray-50 border-gray-200 text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AKGOHI</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Discover amazing products at unbeatable prices. Your ultimate shopping destination with premium quality and fast delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300">
                <Sparkles className="h-5 w-5 mr-2" />
                Start Shopping
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300">
                <Download className="h-5 w-5 mr-2 animate-bounce" />
                Download Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/category/${category.id}`}>
                <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-black mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} items</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
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
                      onClick={(e) => {
                        e.preventDefault();
                        addToWishlist(product);
                      }}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                      {product.discount}% OFF
                    </Badge>
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
                            i < Math.floor(product.rating) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-lg font-bold text-black">₹{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                    </div>

                    <Button 
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">Why Choose AKGOHI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-black mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free delivery on orders above ₹500</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-black mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment gateway</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-black mb-2">Easy Returns</h3>
              <p className="text-gray-600">7-day return policy</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-black mb-2">Special Offers</h3>
              <p className="text-gray-600">Regular discounts and deals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">AKGOHI</h3>
              <p className="text-gray-300 mb-4">Your Ultimate Shopping Destination</p>
              <p className="text-gray-400 text-sm">Developed by Akhila Reddy</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/category/electronics" className="text-gray-300 hover:text-white transition-colors">Electronics</Link></li>
                <li><Link to="/category/fashion" className="text-gray-300 hover:text-white transition-colors">Fashion</Link></li>
                <li><Link to="/category/books" className="text-gray-300 hover:text-white transition-colors">Books</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Instagram</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">&copy; 2024 AKGOHI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        mode={authMode}
      />
    </div>
  );
};

export default Index;
