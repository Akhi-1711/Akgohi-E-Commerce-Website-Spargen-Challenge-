
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star, Plus, Minus, Truck, Shield, RotateCcw } from 'lucide-react';
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

  // Mock product data
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
    description: 'Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and comfortable over-ear design.',
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
    }
  };

  const addToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
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
            <Link to="/" className="text-2xl font-bold text-gradient">
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
                  className="w-full h-96 object-cover"
                />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <Card 
                  key={index} 
                  className={`glass-card cursor-pointer transition-all ${
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
                <Badge className="bg-red-500 text-white">{product.discount}% OFF</Badge>
              </div>

              <p className="text-white/80 mb-6">{product.description}</p>
            </div>

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
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={addToCart}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full border-white/30 text-white hover:bg-white/10"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Add to Wishlist
                  </Button>
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
