
import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart.",
      });
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast({
      title: "Item Removed",
      description: `${name} has been removed from your cart.`,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 py-6 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">
                  <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
              </div>
              <Link to="/" className="text-2xl font-bold text-gradient">
                AKGOHI
              </Link>
            </div>
          </div>
        </div>

        {/* Empty Cart */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="bg-white p-12 max-w-md mx-auto rounded-2xl shadow-lg border border-gray-200">
              <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link to="/">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  Start Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                <p className="text-gray-600">{state.itemCount} items in your cart</p>
              </div>
            </div>
            <Link to="/" className="text-2xl font-bold text-gradient">
              AKGOHI
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>
              <Button 
                variant="ghost" 
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>

            {state.items.map((item) => (
              <Card key={item.id} className="bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">Category: {item.category}</p>
                      <p className="text-lg font-bold text-gray-900">₹{item.price}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="text-gray-700 hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <Badge variant="secondary" className="px-3 py-1 bg-gray-100 text-gray-900 border border-gray-300">
                        {item.quantity}
                      </Badge>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="text-gray-700 hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-white border border-gray-200 shadow-sm sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({state.itemCount} items)</span>
                    <span>₹{state.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span>₹{(state.total * 0.18).toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>₹{(state.total * 1.18).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/checkout" className="block">
                    <Button size="lg" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  
                  <Link to="/" className="block">
                    <Button size="lg" variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-green-700 text-sm font-medium">
                    🎉 You saved ₹{((state.total * 0.2)).toFixed(2)} on this order!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
