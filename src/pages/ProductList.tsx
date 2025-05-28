import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Filter, Grid, List, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

// Categories data with specific Unsplash collections for relevant images
const categories = {
  'apparel': { name: 'Apparel', icon: '👕', color: 'from-pink-500 to-rose-500', imageKeyword: 'clothing', collection: 'fashion' },
  'books': { name: 'Books', icon: '📚', color: 'from-blue-500 to-cyan-500', imageKeyword: 'book', collection: 'books' },
  'cosmetics': { name: 'Cosmetics', icon: '💄', color: 'from-purple-500 to-pink-500', imageKeyword: 'cosmetic', collection: 'beauty' },
  'digital': { name: 'Digital Gadgets', icon: '📱', color: 'from-green-500 to-emerald-500', imageKeyword: 'gadget', collection: 'technology' },
  'electronics': { name: 'Electronics', icon: '⚡', color: 'from-yellow-500 to-orange-500', imageKeyword: 'electronic', collection: 'technology' },
  'footwear': { name: 'Footwear', icon: '👟', color: 'from-indigo-500 to-purple-500', imageKeyword: 'shoe', collection: 'fashion' },
  'groceries': { name: 'Groceries', icon: '🛒', color: 'from-green-500 to-teal-500', imageKeyword: 'grocery', collection: 'food-drink' },
  'home': { name: 'Home Decor', icon: '🏠', color: 'from-orange-500 to-red-500', imageKeyword: 'home-decor', collection: 'interiors' },
  'icecream': { name: 'Ice Cream & Desserts', icon: '🍦', color: 'from-pink-500 to-purple-500', imageKeyword: 'ice-cream', collection: 'food-drink' },
  'jewelry': { name: 'Jewelry', icon: '💎', color: 'from-yellow-500 to-gold-500', imageKeyword: 'jewelry', collection: 'fashion' },
  'kitchen': { name: 'Kitchen Appliances', icon: '🍳', color: 'from-red-500 to-pink-500', imageKeyword: 'kitchen', collection: 'interiors' },
  'laptops': { name: 'Laptops & Accessories', icon: '💻', color: 'from-blue-500 to-purple-500', imageKeyword: 'laptop', collection: 'technology' },
  'mobiles': { name: 'Mobiles & Tablets', icon: '📱', color: 'from-cyan-500 to-blue-500', imageKeyword: 'smartphone', collection: 'technology' },
  'nutrition': { name: 'Nutrition & Health', icon: '🏥', color: 'from-green-500 to-lime-500', imageKeyword: 'health', collection: 'health' },
  'organic': { name: 'Organic Food', icon: '🌱', color: 'from-green-500 to-emerald-500', imageKeyword: 'organic-food', collection: 'food-drink' },
  'pets': { name: 'Pet Supplies', icon: '🐕', color: 'from-brown-500 to-amber-500', imageKeyword: 'pet', collection: 'animals' },
  'quickmeals': { name: 'Quick Meals', icon: '🍕', color: 'from-orange-500 to-red-500', imageKeyword: 'fast-food', collection: 'food-drink' },
  'ridegear': { name: 'Ride Gear & Auto', icon: '🏍️', color: 'from-gray-500 to-slate-500', imageKeyword: 'motorcycle', collection: 'travel' },
  'stationery': { name: 'Stationery & Office', icon: '📝', color: 'from-blue-500 to-indigo-500', imageKeyword: 'stationery', collection: 'business-work' },
  'toys': { name: 'Toys & Games', icon: '🎮', color: 'from-purple-500 to-pink-500', imageKeyword: 'toy', collection: 'people' },
  'underwear': { name: 'Underwear & Loungewear', icon: '👙', color: 'from-pink-500 to-rose-500', imageKeyword: 'underwear', collection: 'fashion' },
  'vegetables': { name: 'Vegetables & Fruits', icon: '🥕', color: 'from-green-500 to-yellow-500', imageKeyword: 'vegetable', collection: 'food-drink' },
  'watches': { name: 'Watches', icon: '⌚', color: 'from-gray-500 to-blue-500', imageKeyword: 'watch', collection: 'fashion' },
  'xtreme': { name: 'Xtreme Sports Gear', icon: '🏂', color: 'from-red-500 to-orange-500', imageKeyword: 'extreme-sports', collection: 'sports' },
  'yoga': { name: 'Yoga Products', icon: '🧘', color: 'from-purple-500 to-indigo-500', imageKeyword: 'yoga', collection: 'health' },
  'zipwear': { name: 'Zip Wearables (Smartwear)', icon: '⌚', color: 'from-cyan-500 to-purple-500', imageKeyword: 'smartwatch', collection: 'technology' }
};

// Detailed product descriptions and names by category
const productData = {
  'books': {
    names: ['The Great Adventure Novel', 'Programming Fundamentals', 'Mysteries of the Universe', 'Self-Help Mastery', 'Historical Chronicles'],
    descriptions: [
      'A captivating adventure story with unforgettable characters and plot twists',
      'Comprehensive guide to programming concepts with practical examples',
      'Explore the wonders of space and time through scientific discoveries',
      'Transform your life with proven strategies and motivational insights',
      'Journey through history with this well-researched narrative'
    ]
  },
  'organic': {
    names: ['Organic Quinoa Seeds', 'Fresh Organic Spinach', 'Organic Almond Butter', 'Pure Organic Honey', 'Organic Brown Rice'],
    descriptions: [
      'Premium quality quinoa seeds rich in protein and essential amino acids',
      'Fresh leafy greens packed with iron, vitamins, and antioxidants',
      'Creamy almond butter made from 100% organic almonds, no additives',
      'Pure raw honey harvested from organic bee farms, unprocessed',
      'Nutritious brown rice grown without pesticides or chemicals'
    ]
  },
  'electronics': {
    names: ['Smart Wireless Headphones', '4K Ultra HD Monitor', 'Gaming Mechanical Keyboard', 'Wireless Charging Pad', 'Bluetooth Speaker'],
    descriptions: [
      'Premium noise-cancelling headphones with 30-hour battery life',
      'Crystal clear 4K display with HDR support for professional work',
      'Mechanical keyboard with RGB lighting and tactile switches',
      'Fast wireless charging for all Qi-compatible devices',
      'Portable speaker with rich bass and 360-degree sound'
    ]
  },
  'apparel': {
    names: ['Cotton Casual T-Shirt', 'Denim Jacket Classic', 'Comfortable Joggers', 'Formal Button Shirt', 'Cozy Hoodie Sweatshirt'],
    descriptions: [
      'Soft cotton t-shirt with modern fit and breathable fabric',
      'Timeless denim jacket with vintage wash and quality stitching',
      'Comfortable joggers perfect for workouts and casual wear',
      'Professional button-down shirt for business and formal occasions',
      'Warm hoodie with soft interior lining and kangaroo pocket'
    ]
  }
};

// Generate products for the category with relevant images and descriptions
const generateCategoryProducts = (categoryId: string, count: number = 25) => {
  const category = categories[categoryId as keyof typeof categories];
  if (!category) return [];
  
  const categoryData = productData[categoryId as keyof typeof productData];
  const defaultNames = ['Premium Product', 'Quality Item', 'Best Seller', 'Top Choice', 'Popular Pick'];
  const defaultDescriptions = ['High-quality product with excellent features and superior performance'];
  
  const products = [];
  for (let i = 1; i <= count; i++) {
    const basePrice = Math.floor(Math.random() * 2000) + 100;
    const discount = Math.floor(Math.random() * 50) + 10;
    const price = Math.floor(basePrice * (100 - discount) / 100);
    
    const nameIndex = (i - 1) % (categoryData?.names.length || defaultNames.length);
    const descIndex = (i - 1) % (categoryData?.descriptions.length || defaultDescriptions.length);
    
    products.push({
      id: `${categoryId}-${i}`,
      name: categoryData?.names[nameIndex] || `${defaultNames[nameIndex]} ${i}`,
      price: price,
      originalPrice: basePrice,
      rating: (Math.random() * 2 + 3).toFixed(1),
      image: `https://source.unsplash.com/300x300/?${category.imageKeyword}&sig=${i}`,
      category: categoryId,
      discount: discount,
      inStock: Math.random() > 0.1,
      brand: `Brand ${Math.floor(Math.random() * 10) + 1}`,
      reviews: Math.floor(Math.random() * 1000) + 50,
      description: categoryData?.descriptions[descIndex] || defaultDescriptions[0],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Red', 'Blue', 'Green', 'Black', 'White', 'Navy', 'Gray', 'Pink', 'Brown', 'Purple'],
      features: [
        'Premium quality materials',
        'Durable construction',
        'Easy maintenance',
        'Satisfaction guaranteed'
      ]
    });
  }
  return products;
};

const ProductList = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { addItem } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');

  const category = categories[categoryId as keyof typeof categories];
  const products = useMemo(() => generateCategoryProducts(categoryId || '', 25), [categoryId]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (priceRange !== 'all') {
      const ranges = {
        'under-500': [0, 500],
        '500-1000': [500, 1000],
        '1000-2000': [1000, 2000],
        'above-2000': [2000, Infinity]
      };
      const [min, max] = ranges[priceRange as keyof typeof ranges] || [0, Infinity];
      filtered = filtered.filter(product => product.price >= min && product.price <= max);
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }

    return filtered;
  }, [products, sortBy, priceRange]);

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

  if (!category) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-black">
          <h1 className="text-4xl font-bold mb-4 text-black">Category Not Found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-100 border-b border-gray-300 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-black hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{category.icon}</span>
                <div>
                  <h1 className="text-2xl font-bold text-black">{category.name}</h1>
                  <p className="text-gray-600">{filteredAndSortedProducts.length} products available</p>
                </div>
              </div>
            </div>
            
            <Link to="/" className="text-2xl font-bold text-black">
              AKGOHI
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Controls */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="text-black font-medium">Filters:</span>
              </div>
              
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-40 bg-white border-gray-300 text-black">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300">
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-500">Under ₹500</SelectItem>
                  <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                  <SelectItem value="1000-2000">₹1000 - ₹2000</SelectItem>
                  <SelectItem value="above-2000">Above ₹2000</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-white border-gray-300 text-black">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                  <SelectItem value="discount">Discount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="text-black"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="text-black"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
          : "space-y-4"
        }>
          {filteredAndSortedProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className={`bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className={`p-0 ${viewMode === 'list' ? 'flex w-full' : ''}`}>
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-48 flex-shrink-0' : 'rounded-t-lg'
                }`}>
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className={`object-cover transition-transform duration-300 hover:scale-110 ${
                        viewMode === 'list' ? 'w-full h-32' : 'w-full h-48'
                      }`}
                    />
                  </Link>
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    {product.discount}% OFF
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 text-gray-600 hover:bg-gray-100"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                  )}
                </div>
                
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                  <div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-black mb-2 line-clamp-2 hover:text-blue-600 transition-colors">{product.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-black">{product.rating}</span>
                      <span className="text-xs text-gray-600">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <div className={viewMode === 'list' ? 'flex items-center justify-between' : ''}>
                    <div className={`${viewMode === 'list' ? '' : 'mb-3'}`}>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-black">₹{product.price}</span>
                        <span className="text-sm text-gray-600 line-through">₹{product.originalPrice}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className={`bg-blue-600 hover:bg-blue-700 text-white ${
                        viewMode === 'list' ? 'ml-4' : 'w-full'
                      }`}
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-black mb-4">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more products.</p>
            <Button onClick={() => {setPriceRange('all'); setSortBy('featured');}}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
