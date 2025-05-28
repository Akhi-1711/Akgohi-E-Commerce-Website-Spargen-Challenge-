
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star, Plus, Minus, Truck, Shield, RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  // Enhanced product data with detailed descriptions by category
  const getProductByCategory = (productId: string) => {
    const categoryId = productId.split('-')[0];
    
    const categoryProducts = {
      'books': {
        names: ['The Great Adventure Novel', 'Programming Fundamentals', 'Mysteries of the Universe', 'Self-Help Mastery', 'Historical Chronicles'],
        descriptions: [
          'A captivating adventure story with unforgettable characters and thrilling plot twists that will keep you on the edge of your seat.',
          'Comprehensive guide to programming concepts with practical examples and step-by-step tutorials for beginners and experts.',
          'Explore the wonders of space and time through groundbreaking scientific discoveries and theories.',
          'Transform your life with proven strategies, motivational insights, and actionable advice from leading experts.',
          'Journey through history with this meticulously researched narrative covering major civilizations and events.'
        ],
        features: [
          'High-quality paper and binding',
          'Easy-to-read typography',
          'Comprehensive index',
          'Author biography included',
          'Available in multiple formats',
          'Bestseller recognition',
          'Expert reviews',
          'Educational value'
        ]
      },
      'organic': {
        names: ['Organic Quinoa Seeds', 'Fresh Organic Spinach', 'Organic Almond Butter', 'Pure Organic Honey', 'Organic Brown Rice'],
        descriptions: [
          'Premium quality quinoa seeds rich in protein, fiber, and essential amino acids. Perfect for healthy meals and weight management.',
          'Fresh leafy greens packed with iron, vitamins A, C, K, and powerful antioxidants. Locally sourced and pesticide-free.',
          'Creamy almond butter made from 100% organic almonds with no additives, preservatives, or artificial ingredients.',
          'Pure raw honey harvested from organic bee farms, unprocessed and unfiltered to retain natural enzymes and nutrients.',
          'Nutritious brown rice grown without pesticides or chemicals, rich in fiber and essential minerals.'
        ],
        features: [
          'Certified organic ingredients',
          'Non-GMO verified',
          'Pesticide-free cultivation',
          'Rich in nutrients',
          'Sustainably sourced',
          'Fair trade certified',
          'Eco-friendly packaging',
          'Farm-to-table freshness'
        ]
      },
      'electronics': {
        names: ['Smart Wireless Headphones', '4K Ultra HD Monitor', 'Gaming Mechanical Keyboard', 'Wireless Charging Pad', 'Bluetooth Speaker'],
        descriptions: [
          'Premium noise-cancelling headphones with crystal-clear audio, 30-hour battery life, and advanced Bluetooth connectivity.',
          'Professional 4K display with HDR support, wide color gamut, and ultra-thin bezels perfect for work and entertainment.',
          'High-performance mechanical keyboard with customizable RGB lighting, tactile switches, and programmable keys.',
          'Fast wireless charging station compatible with all Qi-enabled devices, featuring smart temperature control.',
          'Portable Bluetooth speaker with rich bass, 360-degree sound, and waterproof design for outdoor adventures.'
        ],
        features: [
          'Latest technology integration',
          'Premium build quality',
          'Energy-efficient design',
          'Wireless connectivity',
          'Long battery life',
          'User-friendly interface',
          'Durable construction',
          'Warranty included'
        ]
      },
      'apparel': {
        names: ['Premium Cotton T-Shirt', 'Classic Denim Jacket', 'Comfortable Joggers', 'Formal Button Shirt', 'Cozy Hoodie Sweatshirt'],
        descriptions: [
          'Ultra-soft cotton t-shirt with modern fit, breathable fabric, and fade-resistant colors. Perfect for everyday comfort.',
          'Timeless denim jacket with vintage wash, quality stitching, and classic fit that never goes out of style.',
          'Comfortable joggers with elastic waistband, perfect for workouts, lounging, or casual outings.',
          'Professional button-down shirt with wrinkle-resistant fabric, perfect for business meetings and formal events.',
          'Warm hoodie with soft fleece interior lining, kangaroo pocket, and adjustable drawstring hood.'
        ],
        features: [
          'Premium fabric quality',
          'Comfortable fit',
          'Durable stitching',
          'Fade-resistant colors',
          'Easy care instructions',
          'Breathable material',
          'Versatile styling',
          'Size range available'
        ]
      }
    };

    const index = parseInt(productId.split('-')[1]) - 1;
    const categoryData = categoryProducts[categoryId as keyof typeof categoryProducts];
    
    if (!categoryData) {
      return {
        name: 'Premium Product',
        description: 'High-quality product with excellent features',
        detailedDescription: 'This premium product offers superior quality and performance.',
        features: ['Premium quality', 'Durable construction', 'Easy maintenance', 'Satisfaction guaranteed']
      };
    }

    const nameIndex = index % categoryData.names.length;
    const descIndex = index % categoryData.descriptions.length;

    return {
      name: categoryData.names[nameIndex],
      description: categoryData.descriptions[descIndex],
      detailedDescription: categoryData.descriptions[descIndex],
      features: categoryData.features
    };
  };

  const productData = getProductByCategory(productId || '1');

  const product = {
    id: productId || '1',
    name: productData.name,
    price: 1299 + (parseInt(productId?.split('-')[1] || '1') * 200),
    originalPrice: 1999 + (parseInt(productId?.split('-')[1] || '1') * 300),
    rating: 4.5,
    reviews: 234 + (parseInt(productId?.split('-')[1] || '1') * 50),
    discount: 35,
    inStock: true,
    category: productId?.split('-')[0] || 'electronics',
    brand: 'Premium Brand',
    description: productData.description,
    detailedDescription: productData.detailedDescription,
    features: productData.features
  };

  const categoryKeywords = {
    'books': 'book',
    'organic': 'organic-food',
    'electronics': 'electronic',
    'apparel': 'clothing'
  };

  const keyword = categoryKeywords[product.category as keyof typeof categoryKeywords] || 'product';

  const images = [
    `https://source.unsplash.com/500x500/?${keyword}&sig=${productId}-1`,
    `https://source.unsplash.com/500x500/?${keyword}&sig=${productId}-2`,
    `https://source.unsplash.com/500x500/?${keyword}&sig=${productId}-3`,
    `https://source.unsplash.com/500x500/?${keyword}&sig=${productId}-4`
  ];

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Navy', 'Gray', 'Pink', 'Brown', 'Purple'];

  const addToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Selection Required",
        description: "Please select both size and color before adding to cart.",
        variant: "destructive"
      });
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `${product.id}-${selectedSize}-${selectedColor}`,
        name: `${product.name} (${selectedSize}, ${selectedColor})`,
        price: product.price,
        image: images[0],
        category: product.category
      });
    }
    
    toast({
      title: "Added to Cart Successfully!",
      description: `${quantity} ${product.name}(s) with size ${selectedSize} and ${selectedColor} color added to your cart.`,
    });
  };

  const addToWishlist = () => {
    const wishlistItems = JSON.parse(localStorage.getItem('akgohi_wishlist') || '[]');
    const newItem = {
      ...product,
      images,
      selectedSize,
      selectedColor,
      addedDate: new Date().toISOString()
    };
    
    const existingItem = wishlistItems.find((item: any) => 
      item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
    );
    
    if (existingItem) {
      toast({
        title: "Already in Wishlist",
        description: "This item is already in your wishlist.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedWishlist = [...wishlistItems, newItem];
    localStorage.setItem('akgohi_wishlist', JSON.stringify(updatedWishlist));
    
    toast({
      title: "Added to Wishlist!",
      description: `${product.name} has been added to your wishlist.`,
    });
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
              <div className="hidden md:flex items-center space-x-2 text-gray-600">
                <Link to="/" className="hover:text-black transition-colors">Home</Link>
                <span>/</span>
                <Link to={`/category/${product.category}`} className="hover:text-black capitalize transition-colors">
                  {product.category}
                </Link>
                <span>/</span>
                <span className="text-black font-medium">{product.name}</span>
              </div>
            </div>
            <Link to="/" className="text-2xl font-bold text-black">
              AKGOHI
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <Card className="bg-white border border-gray-200 rounded-lg shadow-lg">
              <CardContent className="p-0">
                <img 
                  src={images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-t-lg"
                />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <Card 
                  key={index} 
                  className={`bg-white border cursor-pointer transition-all duration-300 hover:shadow-md ${
                    selectedImage === index ? 'ring-2 ring-blue-500 shadow-md' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <CardContent className="p-0">
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2 bg-blue-100 text-blue-800 hover:bg-blue-200">{product.brand}</Badge>
              <h1 className="text-3xl font-bold text-black mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="text-black ml-2 font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-black">₹{product.price}</span>
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                <Badge className="bg-red-500 text-white">{product.discount}% OFF</Badge>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{product.detailedDescription}</p>
              </div>
            </div>

            {/* Size Selection */}
            <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-black mb-4">Select Size *</h3>
                <div className="grid grid-cols-5 gap-3">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className={`transition-all duration-300 ${
                        selectedSize === size 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'border-gray-300 text-black hover:bg-gray-50 hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Color Selection */}
            <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-black mb-4">Select Color *</h3>
                <div className="grid grid-cols-5 gap-3">
                  {colors.map((color) => (
                    <div key={color} className="relative">
                      <Button
                        variant="outline"
                        className={`w-full h-12 p-2 border-2 transition-all duration-300 ${
                          selectedColor === color 
                            ? 'border-blue-500 shadow-md bg-blue-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ 
                          backgroundColor: selectedColor === color ? undefined :
                                          color.toLowerCase() === 'black' ? '#000' :
                                          color.toLowerCase() === 'white' ? '#fff' :
                                          color.toLowerCase() === 'blue' ? '#3b82f6' :
                                          color.toLowerCase() === 'red' ? '#ef4444' :
                                          color.toLowerCase() === 'green' ? '#22c55e' :
                                          color.toLowerCase() === 'navy' ? '#1e40af' :
                                          color.toLowerCase() === 'gray' ? '#6b7280' :
                                          color.toLowerCase() === 'pink' ? '#ec4899' :
                                          color.toLowerCase() === 'brown' ? '#a3a3a3' :
                                          color.toLowerCase() === 'purple' ? '#8b5cf6' : color.toLowerCase()
                        }}
                        onClick={() => setSelectedColor(color)}
                      >
                        {selectedColor === color && (
                          <Check className="h-4 w-4 text-white" />
                        )}
                        <span className="text-xs mt-1 text-black">{color}</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quantity and Add to Cart */}
            <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-black font-medium">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-black hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-black px-4 py-2 bg-gray-100 rounded font-medium">{quantity}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-black hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    size="lg" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg"
                    onClick={addToCart}
                    disabled={!product.inStock || !selectedSize || !selectedColor}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full border-gray-300 text-black hover:bg-gray-50 hover:border-gray-400"
                    onClick={addToWishlist}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Add to Wishlist
                  </Button>
                </div>

                {(!selectedSize || !selectedColor) && (
                  <p className="text-red-600 text-sm mt-2 text-center font-medium">
                    Please select size and color before adding to cart
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-black mb-4">Delivery & Returns</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Truck className="h-5 w-5 text-green-600" />
                    <span>Free delivery on orders above ₹500</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <RotateCcw className="h-5 w-5 text-blue-600" />
                    <span>7-day return policy</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Shield className="h-5 w-5 text-purple-600" />
                    <span>1-year warranty included</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Features */}
        <div className="mt-12">
          <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-black mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded transition-colors">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
