
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

  // Mock product data with enhanced details
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
    description: 'Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers and professionals alike.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Blue', 'Red', 'Silver'],
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Premium comfort design',
      'Wireless connectivity',
      'High-quality audio drivers',
      'Quick charge feature'
    ],
    specifications: {
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g'
    },
    material: 'Premium quality materials with soft cushioning',
    warranty: '2 years manufacturer warranty'
  };

  const addToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please Select Options",
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
      title: "Added to Cart!",
      description: `${quantity} ${product.name}(s) added to your cart.`,
    });
  };

  const addToWishlist = () => {
    const wishlistItems = JSON.parse(localStorage.getItem('akgohi_wishlist') || '[]');
    const updatedWishlist = [...wishlistItems, product];
    localStorage.setItem('akgohi_wishlist', JSON.stringify(updatedWishlist));
    
    toast({
      title: "Added to Wishlist!",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-md border-b border-white/10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-white hover:text-purple-400 transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="hidden md:flex items-center space-x-2 text-white/60">
                <Link to="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <Link to={`/category/${product.category}`} className="hover:text-white capitalize">
                  {product.category}
                </Link>
                <span>/</span>
                <span className="text-white">{product.name}</span>
              </div>
            </div>
            <Link to="/" className="text-2xl font-bold text-gradient bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AKGOHI
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <Card className="glass-card overflow-hidden">
              <CardContent className="p-0">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-300"
                />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <Card 
                  key={index} 
                  className={`glass-card cursor-pointer transition-all hover:scale-105 ${
                    selectedImage === index ? 'ring-2 ring-purple-500' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <CardContent className="p-0">
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2 bg-purple-500/20 text-purple-400">{product.brand}</Badge>
              <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>
              
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
                  <span className="text-white ml-2">{product.rating}</span>
                </div>
                <span className="text-white/60">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-white">₹{product.price}</span>
                <span className="text-xl text-white/60 line-through">₹{product.originalPrice}</span>
                <Badge className="bg-red-500 text-white animate-pulse">{product.discount}% OFF</Badge>
              </div>

              <p className="text-white/80 mb-6">{product.description}</p>
            </div>

            {/* Size Selection */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Select Size</h3>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className={`transition-all duration-300 ${
                        selectedSize === size 
                          ? 'bg-purple-500 text-white transform scale-105' 
                          : 'border-white/30 text-white hover:bg-white/10'
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
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Select Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <div key={color} className="relative">
                      <Button
                        variant="outline"
                        className={`w-12 h-12 rounded-full p-0 border-2 transition-all duration-300 ${
                          selectedColor === color 
                            ? 'border-purple-400 transform scale-110' 
                            : 'border-white/30 hover:border-white/60'
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
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white/60">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quantity and Add to Cart */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-white font-medium">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-white hover:bg-white/10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-white px-4 py-2 bg-white/10 rounded">{quantity}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-white hover:bg-white/10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300"
                    onClick={addToCart}
                    disabled={!product.inStock || !selectedSize || !selectedColor}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full border-white/30 text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
                    onClick={addToWishlist}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Add to Wishlist
                  </Button>
                </div>

                {(!selectedSize || !selectedColor) && (
                  <p className="text-red-400 text-sm mt-2 text-center">
                    Please select size and color before adding to cart
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Product Details</h3>
                <div className="space-y-2 text-white/80">
                  <p><span className="font-medium">Material:</span> {product.material}</p>
                  <p><span className="font-medium">Warranty:</span> {product.warranty}</p>
                  <p><span className="font-medium">Brand:</span> {product.brand}</p>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Delivery & Returns</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-white/80">
                    <Truck className="h-5 w-5 text-green-400" />
                    <span>Free delivery on orders above ₹500</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/80">
                    <RotateCcw className="h-5 w-5 text-blue-400" />
                    <span>7-day return policy</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/80">
                    <Shield className="h-5 w-5 text-purple-400" />
                    <span>1-year warranty included</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 space-y-8">
          <Card className="glass-card">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-white/60">{key}</span>
                    <span className="text-white">{value}</span>
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
