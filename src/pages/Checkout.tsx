import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const { state, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for shopping with AKGOHI. Your order will be delivered soon.",
      });
      setStep(3);
    }, 2000);
  };

  if (state.items.length === 0 && step < 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Your cart is empty</h1>
            <Link to="/" className="text-purple-600 hover:text-purple-700">
              ← Continue Shopping
            </Link>
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
              <Link to="/cart" className="text-gray-700 hover:text-purple-600 transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            </div>
            <Link to="/" className="text-2xl font-bold text-gradient">
              AKGOHI
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Shipping Form */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                      <Input
                        id="name"
                        value={shippingInfo.name}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-white border-gray-300 text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-700">Phone</Label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-white border-gray-300 text-gray-900"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-gray-700">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-white border-gray-300 text-gray-900"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address" className="text-gray-700">Address</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                      className="bg-white border-gray-300 text-gray-900"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-gray-700">City</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                        className="bg-white border-gray-300 text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-gray-700">State</Label>
                      <Input
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                        className="bg-white border-gray-300 text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode" className="text-gray-700">Pincode</Label>
                      <Input
                        id="pincode"
                        value={shippingInfo.pincode}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, pincode: e.target.value }))}
                        className="bg-white border-gray-300 text-gray-900"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    Continue to Payment
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-gray-900 font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
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
                  <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>₹{(state.total * 1.18).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
                
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center space-x-3 flex-1 cursor-pointer text-gray-900">
                      <CreditCard className="h-5 w-5" />
                      <span>Credit/Debit Card</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center space-x-3 flex-1 cursor-pointer text-gray-900">
                      <span className="text-2xl">📱</span>
                      <span>UPI Payment</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center space-x-3 flex-1 cursor-pointer text-gray-900">
                      <Truck className="h-5 w-5" />
                      <span>Cash on Delivery</span>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 text-green-700 mb-2">
                    <Shield className="h-5 w-5" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-sm text-green-600">
                    Your payment information is encrypted and secure. Developed by Akhila Reddy.
                  </p>
                </div>

                <div className="flex space-x-4 mt-6">
                  <Button 
                    onClick={() => setStep(1)}
                    variant="outline" 
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handlePayment}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    Place Order - ₹{(state.total * 1.18).toFixed(2)}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-md mx-auto text-center">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for shopping with AKGOHI. Your order will be delivered soon.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Developed by Akhila Reddy
                </p>
                <Link to="/">
                  <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
