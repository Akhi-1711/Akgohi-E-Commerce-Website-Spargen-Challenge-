
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

  // Enhanced product data with detailed descriptions
  const products = {
    '1': {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 2999,
      originalPrice: 4999,
      rating: 4.5,
      reviews: 1234,
      discount: 40,
      inStock: true,
      category: 'electronics',
      brand: 'TechBrand',
      description: 'Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise cancellation technology, these headphones deliver exceptional sound quality with deep bass and crisp highs.',
      detailedDescription: 'These premium wireless headphones are engineered for audiophiles who refuse to compromise on quality. The advanced active noise cancellation technology blocks out ambient noise, allowing you to immerse yourself completely in your music. The high-quality 40mm drivers deliver rich, detailed sound across all frequencies.',
      features: [
        'Active Noise Cancellation Technology',
        '30-hour Extended Battery Life',
        'Premium Comfort Design with Memory Foam',
        'Bluetooth 5.0 Wireless Connectivity',
        'High-Quality 40mm Audio Drivers',
        'Quick Charge Feature - 15 min for 3 hours',
        'Built-in Microphone for Calls',
        'Foldable Design for Portability'
      ]
    },
    '2': {
      id: '2',
      name: 'Stylish Cotton T-Shirt',
      price: 799,
      originalPrice: 1299,
      rating: 4.5,
      reviews: 156,
      discount: 38,
      inStock: true,
      category: 'fashion',
      brand: 'FashionCo',
      description: 'Comfortable and stylish cotton t-shirt available in multiple colors. Made from premium organic cotton for everyday wear.',
      detailedDescription: 'This premium cotton t-shirt combines comfort with style. Made from 100% organic cotton, it offers breathability and softness that lasts wash after wash. The classic fit works for any occasion.',
      features: [
        '100% Organic Cotton Material',
        'Pre-shrunk for Perfect Fit',
        'Breathable and Soft Fabric',
        'Available in Multiple Colors',
        'Machine Washable',
        'Reinforced Stitching',
        'Tag-free for Comfort',
        'Eco-friendly Production'
      ]
    },
    '3': {
      id: '3',
      name: 'Smart Home Security Camera',
      price: 1999,
      originalPrice: 2999,
      rating: 4.6,
      reviews: 89,
      discount: 33,
      inStock: true,
      category: 'electronics',
      brand: 'SecureTech',
      description: 'Advanced security camera with 1080p HD video, night vision, and smartphone app control. Keep your home safe 24/7.',
      detailedDescription: 'This smart security camera provides comprehensive home monitoring with crystal-clear 1080p video quality. The advanced night vision ensures clear footage even in complete darkness.',
      features: [
        '1080p Full HD Video Quality',
        'Advanced Night Vision Technology',
        'Two-way Audio Communication',
        'Motion Detection Alerts',
        'Cloud Storage Available',
        'Weather-resistant Design',
        'Easy Mobile App Control',
        'Wide 130° Viewing Angle'
      ]
    },
    '4': {
      id: '4',
      name: 'Yoga Mat Premium',
      price: 1299,
      originalPrice: 1999,
      rating: 4.7,
      reviews: 234,
      discount: 35,
      inStock: true,
      category: 'sports',
      brand: 'YogaPro',
      description: 'Non-slip yoga mat made from eco-friendly materials. Perfect for yoga, pilates, and home workouts with superior grip.',
      detailedDescription: 'This premium yoga mat is designed for serious practitioners. The eco-friendly TPE material provides excellent grip and cushioning while being gentle on the environment.',
      features: [
        'Eco-friendly TPE Material',
        'Superior Non-slip Surface',
        'Extra Thick 6mm Cushioning',
        'Lightweight and Portable',
        'Easy to Clean',
        'Alignment Lines for Poses',
        'Carrying Strap Included',
        'Odor-resistant Treatment'
      ]
    }
  };

  const product = products[productId as keyof typeof products] || products['1'];

  const images = [
    `https://picsum.photos/500/500?random=${productId}-1`,
    `https://picsum.photos/500/500?random=${productId}-2`,
    `https://picsum.photos/500/500?random=${productId}-3`,
    `https://picsum.photos/500/500?random=${productId}-4`
  ];

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['Black', 'White', 'Blue', 'Red', 'Silver'];

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
                <div className="grid grid-cols-4 gap-3">
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
                <div className="flex space-x-3 flex-wrap gap-2">
                  {colors.map((color) => (
                    <div key={color} className="relative">
                      <Button
                        variant="outline"
                        className={`w-12 h-12 rounded-full p-0 border-2 transition-all duration-300 ${
                          selectedColor === color 
                            ? 'border-blue-500 shadow-md' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ 
                          backgroundColor: color.toLowerCase() === 'black' ? '#000' :
                                          color.toLowerCase() === 'white' ? '#fff' :
                                          color.toLowerCase() === 'blue' ? '#3b82f6' :
                                          color.toLowerCase() === 'red' ? '#ef4444' :
                                          color.toLowerCase() === 'silver' ? '#94a3b8' : color.toLowerCase()
                        }}
                        onClick={() => setSelectedColor(color)}
                      >
                        {selectedColor === color && (
                          <Check className="h-4 w-4 text-white" />
                        )}
                      </Button>
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-black font-medium">
                        {color}
                      </span>
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
