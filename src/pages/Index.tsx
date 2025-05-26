
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Heart, Star, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import AuthModal from '@/components/AuthModal';

// Product categories A-Z
const categories = [
  { id: 'apparel', name: 'Apparel', icon: '👕', color: 'from-pink-500 to-rose-500' },
  { id: 'books', name: 'Books', icon: '📚', color: 'from-blue-500 to-cyan-500' },
  { id: 'cosmetics', name: 'Cosmetics', icon: '💄', color: 'from-purple-500 to-pink-500' },
  { id: 'digital', name: 'Digital Gadgets', icon: '📱', color: 'from-green-500 to-emerald-500' },
  { id: 'electronics', name: 'Electronics', icon: '⚡', color: 'from-yellow-500 to-orange-500' },
  { id: 'footwear', name: 'Footwear', icon: '👟', color: 'from-indigo-500 to-purple-500' },
  { id: 'groceries', name: 'Groceries', icon: '🛒', color: 'from-green-500 to-teal-500' },
  { id: 'home', name: 'Home Decor', icon: '🏠', color: 'from-orange-500 to-red-500' },
  { id: 'icecream', name: 'Ice Cream & Desserts', icon: '🍦', color: 'from-pink-500 to-purple-500' },
  { id: 'jewelry', name: 'Jewelry', icon: '💎', color: 'from-yellow-500 to-gold-500' },
  { id: 'kitchen', name: 'Kitchen Appliances', icon: '🍳', color: 'from-red-500 to-pink-500' },
  { id: 'laptops', name: 'Laptops & Accessories', icon: '💻', color: 'from-blue-500 to-purple-500' },
  { id: 'mobiles', name: 'Mobiles & Tablets', icon: '📱', color: 'from-cyan-500 to-blue-500' },
  { id: 'nutrition', name: 'Nutrition & Health', icon: '🏥', color: 'from-green-500 to-lime-500' },
  { id: 'organic', name: 'Organic Food', icon: '🌱', color: 'from-green-500 to-emerald-500' },
  { id: 'pets', name: 'Pet Supplies', icon: '🐕', color: 'from-brown-500 to-amber-500' },
  { id: 'quickmeals', name: 'Quick Meals', icon: '🍕', color: 'from-orange-500 to-red-500' },
  { id: 'ridegear', name: 'Ride Gear & Auto', icon: '🏍️', color: 'from-gray-500 to-slate-500' },
  { id: 'stationery', name: 'Stationery & Office', icon: '📝', color: 'from-blue-500 to-indigo-500' },
  { id: 'toys', name: 'Toys & Games', icon: '🎮', color: 'from-purple-500 to-pink-500' },
  { id: 'underwear', name: 'Underwear & Loungewear', icon: '👙', color: 'from-pink-500 to-rose-500' },
  { id: 'vegetables', name: 'Vegetables & Fruits', icon: '🥕', color: 'from-green-500 to-yellow-500' },
  { id: 'watches', name: 'Watches', icon: '⌚', color: 'from-gray-500 to-blue-500' },
  { id: 'xtreme', name: 'Xtreme Sports Gear', icon: '🏂', color: 'from-red-500 to-orange-500' },
  { id: 'yoga', name: 'Yoga Products', icon: '🧘', color: 'from-purple-500 to-indigo-500' },
  { id: 'zipwear', name: 'Zip Wearables (Smartwear)', icon: '⌚', color: 'from-cyan-500 to-purple-500' }
];

// Sample products for each category
const generateProducts = () => {
  const products = [];
  categories.forEach(category => {
    for (let i = 1; i <= 20; i++) {
      products.push({
        id: `${category.id}-${i}`,
        name: `${category.name} Product ${i}`,
        price: Math.floor(Math.random() * 1000) + 50,
        originalPrice: Math.floor(Math.random() * 1500) + 100,
        rating: (Math.random() * 2 + 3).toFixed(1),
        image: `https://picsum.photos/300/300?random=${category.id}-${i}`,
        category: category.id,
        discount: Math.floor(Math.random() * 50) + 10,
        inStock: Math.random() > 0.1
      });
    }
  });
  return products;
};

const products = generateProducts();

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  
  const { state, addItem } = useCart();

  // Check for logged-in user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('akgohi_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Featured products for hero section
  const featuredProducts = products.slice(0, 8);

  const addToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };

  const addToWishlist = (product: any) => {
    console.log('Adding to wishlist:', product);
    setWishlistItems(prev => [...prev, product]);
  };

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold">
                <span className="text-gradient animate-pulse-neon">AKGOHI</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 rounded-full bg-white/10 border-white/20 text-white placeholder-white/60 focus:bg-white/20"
                />
                <Button size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <Link to="/profile">
                  <Button variant="ghost" className="hidden md:flex items-center space-x-2 text-white hover:bg-white/10">
                    <User className="h-5 w-5" />
                    <span>{user.name}</span>
                  </Button>
                </Link>
              ) : (
                <Button 
                  variant="ghost" 
                  className="hidden md:flex items-center space-x-2 text-white hover:bg-white/10"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </Button>
              )}
              
              <Button variant="ghost" className="relative text-white hover:bg-white/10">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-xs">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>

              <Link to="/cart">
                <Button variant="ghost" className="relative text-white hover:bg-white/10">
                  <ShoppingCart className="h-5 w-5" />
                  {state.itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-green-500 text-xs">
                      {state.itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Button
                variant="ghost"
                className="md:hidden text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Navigation */}
      <nav className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-8 overflow-x-auto scrollbar-hide">
            {categories.slice(0, 10).map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors whitespace-nowrap group"
              >
                <span className="text-lg group-hover:animate-bounce">{category.icon}</span>
                <span className="text-sm font-medium group-hover:text-gradient">{category.name}</span>
              </Link>
            ))}
            <Button variant="ghost" className="text-white/80 hover:text-white">
              <ChevronDown className="h-4 w-4 ml-1" />
              More
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="text-gradient animate-pulse-neon">AKGOHI</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 animate-fade-in">
              Developed by <span className="text-purple-400 font-semibold">Akhila Reddy</span> - Your Ultimate Shopping Destination
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300">
                Explore Now
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
                Download App
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Shop by <span className="text-gradient">Category</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link key={category.id} to={`/category/${category.id}`}>
                <Card 
                  className={`glass-card product-hover cursor-pointer animate-bounce-in bg-gradient-to-br ${category.color}/20 border-white/20`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                      {category.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-white/90 mb-2">{category.name}</h3>
                    <p className="text-xs text-white/60">20+ Products</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-black/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Featured <span className="text-gradient">Products</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="glass-card product-hover animate-zoom-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <Link to={`/product/${product.id}`}>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </Link>
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                      {product.discount}% OFF
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 text-white hover:bg-white/20"
                      onClick={() => addToWishlist(product)}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-white mb-2 line-clamp-2 hover:text-gradient cursor-pointer">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-white/80">{product.rating}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-lg font-bold text-white">₹{product.price}</span>
                      <span className="text-sm text-white/60 line-through">₹{product.originalPrice}</span>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gradient mb-4">AKGOHI</h3>
              <p className="text-white/60 mb-4">
                Developed by Akhila Reddy - Your ultimate shopping destination with 500+ products across all categories.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/60">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Categories</h4>
              <ul className="space-y-2 text-white/60">
                <li><Link to="/category/electronics" className="hover:text-white transition-colors">Electronics</Link></li>
                <li><Link to="/category/apparel" className="hover:text-white transition-colors">Fashion</Link></li>
                <li><Link to="/category/home" className="hover:text-white transition-colors">Home & Living</Link></li>
                <li><Link to="/category/books" className="hover:text-white transition-colors">Books</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/60">
              © 2025 AKGOHI. Developed by <span className="text-purple-400 font-semibold">Akhila Reddy</span>. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;
