
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

  // Enhanced product data with descriptions
  const product = {
    id: productId || '1',
    name: 'Premium Wireless Headphones',
    price: 2999,
    originalPrice: 4999,
    rating: 4.5,
    reviews: 1234,
    discount: 40,
    inStock: true,
    category: 'electronics',
    brand: 'TechBrand',
    images: [
      `https://picsum.photos/500/500?random=${productId}-1`,
      `https://picsum.photos/500/500?random=${productId}-2`,
      `https://picsum.photos/500/500?random=${productId}-3`,
      `https://picsum.photos/500/500?random=${productId}-4`
    ],
    description: 'Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise cancellation technology, these headphones deliver exceptional sound quality with deep bass and crisp highs. The ergonomic design ensures comfortable listening for hours, while the 30-hour battery life keeps your music playing all day. Perfect for professionals, students, and music enthusiasts who demand the best audio experience.',
    detailedDescription: 'These premium wireless headphones are engineered for audiophiles who refuse to compromise on quality. The advanced active noise cancellation technology blocks out ambient noise, allowing you to immerse yourself completely in your music. The high-quality 40mm drivers deliver rich, detailed sound across all frequencies. The comfortable over-ear design with memory foam padding ensures you can wear them for extended periods without discomfort.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Blue', 'Red', 'Silver'],
    features: [
      'Active Noise Cancellation Technology',
      '30-hour Extended Battery Life',
      'Premium Comfort Design with Memory Foam',
      'Bluetooth 5.0 Wireless Connectivity',
      'High-Quality 40mm Audio Drivers',
      'Quick Charge Feature - 15 min for 3 hours',
      'Built-in Microphone for Calls',
      'Foldable Design for Portability'
    ],
    specifications: {
      'Driver Size': '40mm Dynamic',
      'Frequency Response': '20Hz - 20kHz',
      'Battery Life': '30 hours (ANC on), 40 hours (ANC off)',
      'Charging Time': '2 hours (full charge)',
      'Quick Charge': '15 minutes for 3 hours',
      'Connectivity': 'Bluetooth 5.0, 3.5mm jack',
      'Weight': '250g',
      'Impedance': '32 ohms',
      'Sensitivity': '105 dB'
    },
    material: 'Premium quality materials with soft memory foam cushioning and durable aluminum frame',
    warranty: '2 years manufacturer warranty with international coverage'
  };

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
        image: product.images[0],
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
      selectedSize,
      selectedColor,
      addedDate: new Date().toISOString()
    };
    
    // Check if item already exists
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300">
      {/* Header */}
      <div className="bg-yellow-900/30 backdrop-blur-md border-b border-yellow-600/30 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-yellow-900 hover:text-yellow-700 transition-colors transform hover:scale-110">
                <ArrowLeft className="h-6 w-6 animate-bounce" />
              </Link>
              <div className="hidden md:flex items-center space-x-2 text-yellow-800">
                <Link to="/" className="hover:text-yellow-900 transition-colors">Home</Link>
                <span>/</span>
                <Link to={`/category/${product.category}`} className="hover:text-yellow-900 capitalize transition-colors">
                  {product.category}
                </Link>
                <span>/</span>
                <span className="text-yellow-900 font-medium">{product.name}</span>
              </div>
            </div>
            <Link to="/" className="text-2xl font-bold text-gradient bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent animate-pulse-neon">
              AKGOHI
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <Card className="bg-yellow-50/80 backdrop-blur-xl border border-yellow-300/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-0">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500 rounded-t-2xl"
                />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <Card 
                  key={index} 
                  className={`bg-yellow-50/60 backdrop-blur-xl border cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    selectedImage === index ? 'ring-2 ring-yellow-500 shadow-lg' : 'border-yellow-300/50'
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
              <Badge className="mb-2 bg-yellow-500/30 text-yellow-800 hover:bg-yellow-500/40 transition-colors">{product.brand}</Badge>
              <h1 className="text-3xl font-bold text-yellow-900 mb-4 hover:text-yellow-700 transition-colors">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 transition-all duration-300 hover:scale-110 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-yellow-500 text-yellow-500 animate-pulse' 
                          : 'text-yellow-300'
                      }`} 
                    />
                  ))}
                  <span className="text-yellow-900 ml-2 font-medium">{product.rating}</span>
                </div>
                <span className="text-yellow-700">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-yellow-900">₹{product.price}</span>
                <span className="text-xl text-yellow-600 line-through">₹{product.originalPrice}</span>
                <Badge className="bg-red-500 text-white animate-bounce">{product.discount}% OFF</Badge>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-yellow-800 leading-relaxed">{product.description}</p>
                <p className="text-yellow-700 text-sm leading-relaxed">{product.detailedDescription}</p>
              </div>
            </div>

            {/* Size Selection */}
            <Card className="bg-yellow-50/80 backdrop-blur-xl border border-yellow-300/50 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">Select Size *</h3>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className={`transition-all duration-300 ${
                        selectedSize === size 
                          ? 'bg-yellow-500 text-white transform scale-105 shadow-lg' 
                          : 'border-yellow-400 text-yellow-800 hover:bg-yellow-100 hover:border-yellow-500'
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
            <Card className="bg-yellow-50/80 backdrop-blur-xl border border-yellow-300/50 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">Select Color *</h3>
                <div className="flex space-x-3 flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <div key={color} className="relative">
                      <Button
                        variant="outline"
                        className={`w-12 h-12 rounded-full p-0 border-2 transition-all duration-300 hover:scale-110 ${
                          selectedColor === color 
                            ? 'border-yellow-500 transform scale-110 shadow-lg' 
                            : 'border-yellow-300 hover:border-yellow-400'
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
                          <Check className="h-4 w-4 text-white animate-bounce" />
                        )}
                      </Button>
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-yellow-700 font-medium">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quantity and Add to Cart */}
            <Card className="bg-yellow-50/80 backdrop-blur-xl border border-yellow-300/50 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-yellow-900 font-medium">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-yellow-800 hover:bg-yellow-100 hover:scale-110 transition-all duration-300"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-yellow-900 px-4 py-2 bg-yellow-100 rounded font-medium">{quantity}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-yellow-800 hover:bg-yellow-100 hover:scale-110 transition-all duration-300"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 text-white font-semibold shadow-lg"
                    onClick={addToCart}
                    disabled={!product.inStock || !selectedSize || !selectedColor}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2 animate-bounce" />
                    Add to Cart
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full border-yellow-400 text-yellow-800 hover:bg-yellow-100 hover:border-yellow-500 transform hover:scale-105 transition-all duration-300"
                    onClick={addToWishlist}
                  >
                    <Heart className="h-5 w-5 mr-2 animate-pulse" />
                    Add to Wishlist
                  </Button>
                </div>

                {(!selectedSize || !selectedColor) && (
                  <p className="text-red-600 text-sm mt-2 text-center font-medium animate-pulse">
                    Please select size and color before adding to cart
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card className="bg-yellow-50/80 backdrop-blur-xl border border-yellow-300/50 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">Product Information</h3>
                <div className="space-y-2 text-yellow-800">
                  <p><span className="font-medium">Material:</span> {product.material}</p>
                  <p><span className="font-medium">Warranty:</span> {product.warranty}</p>
                  <p><span className="font-medium">Brand:</span> {product.brand}</p>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card className="bg-yellow-50/80 backdrop-blur-xl border border-yellow-300/50 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">Delivery & Returns</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-yellow-800">
                    <Truck className="h-5 w-5 text-green-500 animate-bounce" />
                    <span>Free delivery on orders above ₹500</span>
                  </div>
                  <div className="flex items-center space-x-3 text-yellow-800">
                    <RotateCcw className="h-5 w-5 text-blue-500 animate-spin" />
                    <span>7-day return policy</span>
                  </div>
                  <div className="flex items-center space-x-3 text-yellow-800">
                    <Shield className="h-5 w-5 text-yellow-600 animate-pulse" />
                    <span>1-year warranty included</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 space-y-8">
          <Card className="bg-yellow-50/80 backdrop-blur-xl border border-yellow-300/50 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-yellow-900 mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 hover:bg-yellow-100 p-2 rounded transition-colors">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-yellow-800">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50/80 backdrop-blur-xl border border-yellow-300/50 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-yellow-900 mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-yellow-300/50 hover:bg-yellow-100 px-2 rounded transition-colors">
                    <span className="text-yellow-700 font-medium">{key}</span>
                    <span className="text-yellow-900">{value}</span>
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
