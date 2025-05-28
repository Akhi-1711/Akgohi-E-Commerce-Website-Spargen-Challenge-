import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Heart, Star, ArrowRight, Sparkles, Gift, Truck, Shield, RotateCcw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import AuthModal from '@/components/AuthModal';
import SearchBar from '@/components/SearchBar';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const { state, addItem } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [currentUser, setCurrentUser] = useState<string | null>(
    localStorage.getItem('akgohi_current_user')
  );

  const categories = [
    { id: 'apparel', name: 'Apparel (Clothing)', icon: '👕', count: 120, color: 'bg-pink-500' },
    { id: 'books', name: 'Books', icon: '📚', count: 200, color: 'bg-amber-500' },
    { id: 'cosmetics', name: 'Cosmetics', icon: '💄', count: 60, color: 'bg-purple-500' },
    { id: 'digital', name: 'Digital Gadgets', icon: '📱', count: 85, color: 'bg-cyan-500' },
    { id: 'electronics', name: 'Electronics', icon: '⚡', count: 150, color: 'bg-blue-500' },
    { id: 'footwear', name: 'Footwear', icon: '👟', count: 95, color: 'bg-indigo-500' },
    { id: 'groceries', name: 'Groceries', icon: '🛒', count: 180, color: 'bg-green-500' },
    { id: 'home', name: 'Home Decor', icon: '🏠', count: 110, color: 'bg-orange-500' },
    { id: 'icecream', name: 'Ice Cream & Desserts', icon: '🍦', count: 45, color: 'bg-pink-400' },
    { id: 'jewelry', name: 'Jewelry', icon: '💎', count: 75, color: 'bg-yellow-500' },
    { id: 'kitchen', name: 'Kitchen Appliances', icon: '🍳', count: 90, color: 'bg-red-500' },
    { id: 'laptops', name: 'Laptops & Accessories', icon: '💻', count: 65, color: 'bg-slate-500' },
    { id: 'mobiles', name: 'Mobiles & Tablets', icon: '📱', count: 125, color: 'bg-blue-600' },
    { id: 'nutrition', name: 'Nutrition & Health', icon: '🏥', count: 80, color: 'bg-emerald-500' },
    { id: 'organic', name: 'Organic Food', icon: '🌱', count: 100, color: 'bg-lime-500' },
    { id: 'pets', name: 'Pet Supplies', icon: '🐕', count: 70, color: 'bg-amber-600' },
    { id: 'quickmeals', name: 'Quick Meals (Ready-to-eat)', icon: '🍕', count: 55, color: 'bg-orange-600' },
    { id: 'ridegear', name: 'Ride Gear & Auto Accessories', icon: '🏍️', count: 85, color: 'bg-gray-600' },
    { id: 'stationery', name: 'Stationery & Office Supplies', icon: '📝', count: 90, color: 'bg-blue-400' },
    { id: 'toys', name: 'Toys & Games', icon: '🎮', count: 120, color: 'bg-purple-600' },
    { id: 'underwear', name: 'Underwear & Loungewear', icon: '👙', count: 65, color: 'bg-rose-400' },
    { id: 'vegetables', name: 'Vegetables & Fruits', icon: '🥕', count: 140, color: 'bg-green-600' },
    { id: 'watches', name: 'Watches', icon: '⌚', count: 85, color: 'bg-gray-700' },
    { id: 'xtreme', name: 'Xtreme Sports Gear', icon: '🏂', count: 60, color: 'bg-red-600' },
    { id: 'yoga', name: 'Yoga Products', icon: '🧘', count: 55, color: 'bg-violet-500' },
    { id: 'zipwear', name: 'Zip Wearables (Smartwear)', icon: '⌚', count: 40, color: 'bg-teal-500' }
  ];

  const featuredProducts = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 2999,
      originalPrice: 4999,
      image: 'https://picsum.photos/300/300?random=electronics-1',
      rating: 4.8,
      reviews: 324,
      discount: 40,
      category: 'electronics',
      description: 'High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium comfort design. Perfect for music lovers and professionals who demand superior audio quality.'
    },
    {
      id: '2',
      name: 'Organic Cotton T-Shirt',
      price: 799,
      originalPrice: 1299,
      image: 'https://picsum.photos/300/300?random=clothing-1',
      rating: 4.5,
      reviews: 156,
      discount: 38,
      category: 'apparel',
      description: '100% organic cotton t-shirt with pre-shrunk fabric, breathable material, and eco-friendly production. Available in multiple colors with reinforced stitching for durability.'
    },
    {
      id: '3',
      name: 'Fresh Organic Apples (1kg)',
      price: 199,
      originalPrice: 299,
      image: 'https://picsum.photos/300/300?random=organic-1',
      rating: 4.6,
      reviews: 89,
      discount: 33,
      category: 'organic',
      description: 'Premium quality organic apples grown without pesticides. Rich in fiber, vitamins, and antioxidants. Hand-picked for freshness and delivered directly from farm to your doorstep.'
    },
    {
      id: '4',
      name: 'Professional Yoga Mat',
      price: 1299,
      originalPrice: 1999,
      image: 'https://picsum.photos/300/300?random=yoga-1',
      rating: 4.7,
      reviews: 234,
      discount: 35,
      category: 'yoga',
      description: 'Eco-friendly TPE yoga mat with superior non-slip surface, extra thick 6mm cushioning, and alignment lines. Lightweight, portable, and includes carrying strap.'
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
    try {
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
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to add item to wishlist.",
        variant: "destructive"
      });
    }
  };

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (userData: any) => {
    setCurrentUser(userData.name || userData.email);
    localStorage.setItem('akgohi_current_user', userData.name || userData.email);
    setShowAuthModal(false);
    toast({
      title: "Welcome!",
      description: `Successfully logged in as ${userData.name || userData.email}`,
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('akgohi_current_user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
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
              <SearchBar className="flex-1" />
            </div>

            <div className="flex items-center space-x-4">
              {currentUser ? (
                <div className="flex items-center space-x-2">
                  <span className="text-black font-medium">Welcome, {currentUser}!</span>
                  <Button variant="ghost" onClick={handleLogout} className="text-black hover:bg-gray-100">
                    Logout
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" onClick={() => openAuth('login')} className="text-black hover:bg-gray-100">
                  <User className="h-5 w-5 mr-1" />
                  Login
                </Button>
              )}
              
              <Link to="/wishlist">
                <Button variant="ghost" className="text-black hover:bg-gray-100">
                  <Heart className="h-5 w-5 mr-1" />
                  Wishlist
                </Button>
              </Link>
              
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

              <Link to="/admin">
                <Button variant="ghost" className="text-black hover:bg-gray-100">
                  Admin
                </Button>
              </Link>
            </div>
          </div>

          <div className="md:hidden mt-4">
            <SearchBar />
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
              Your Ultimate Shopping Destination
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300">
                <Sparkles className="h-5 w-5 mr-2" />
                Start Shopping
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-gradient-to-r from-emerald-500 to-teal-500 text-emerald-700 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white bg-gradient-to-r from-emerald-100 to-teal-100 px-8 py-3 text-lg transform hover:scale-110 transition-all duration-500 shadow-lg hover:shadow-2xl animate-bounce">
                <Download className="h-5 w-5 mr-2 animate-pulse" />
                Download Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">Shop by Category (A-Z)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/category/${category.id}`}>
                <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-black mb-2 text-sm">{category.name}</h3>
                    <p className="text-xs text-gray-600">{category.count} items</p>
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
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/category/electronics" className="text-gray-300 hover:text-white transition-colors">Electronics</Link></li>
                <li><Link to="/category/apparel" className="text-gray-300 hover:text-white transition-colors">Fashion</Link></li>
                <li><Link to="/category/books" className="text-gray-300 hover:text-white transition-colors">Books</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping Info</Link></li>
                <li><Link to="/returns" className="text-gray-300 hover:text-white transition-colors">Returns</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/login" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Facebook</a>
                <a href="https://www.twitter.com/login" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Twitter</a>
                <a href="https://www.instagram.com/login" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Instagram</a>
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
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;
