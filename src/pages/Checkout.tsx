
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-md border-b border-white/10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="text-white hover:text-purple-400 transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-white">Checkout</h1>
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
            <Card className="glass-card">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Shipping Information</h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white">Full Name</Label>
                      <Input
                        id="name"
                        value={shippingInfo.name}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-white">Phone</Label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address" className="text-white">Address</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-white">City</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-white">State</Label>
                      <Input
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode" className="text-white">Pincode</Label>
                      <Input
                        id="pincode"
                        value={shippingInfo.pincode}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, pincode: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Continue to Payment
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="text-white text-sm">{item.name}</h4>
                        <p className="text-white/60 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-white font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 border-t border-white/20 pt-4">
                  <div className="flex justify-between text-white/80">
                    <span>Subtotal</span>
                    <span>₹{state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Shipping</span>
                    <span className="text-green-400">FREE</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Tax</span>
                    <span>₹{(state.total * 0.18).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-white border-t border-white/20 pt-2">
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
            <Card className="glass-card">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Payment Method</h2>
                
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center space-x-3 flex-1 cursor-pointer text-white">
                      <CreditCard className="h-5 w-5" />
                      <span>Credit/Debit Card</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center space-x-3 flex-1 cursor-pointer text-white">
                      <span className="text-2xl">📱</span>
                      <span>UPI Payment</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center space-x-3 flex-1 cursor-pointer text-white">
                      <Truck className="h-5 w-5" />
                      <span>Cash on Delivery</span>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="mt-8 p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                  <div className="flex items-center space-x-2 text-green-400 mb-2">
                    <Shield className="h-5 w-5" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-sm text-green-300">
                    Your payment information is encrypted and secure. Developed by Akhila Reddy.
                  </p>
                </div>

                <div className="flex space-x-4 mt-6">
                  <Button 
                    onClick={() => setStep(1)}
                    variant="outline" 
                    className="flex-1 border-white/30 text-white hover:bg-white/10"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handlePayment}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
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
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-white mb-4">Order Placed Successfully!</h2>
                <p className="text-white/60 mb-6">
                  Thank you for shopping with AKGOHI. Your order will be delivered soon.
                </p>
                <p className="text-sm text-white/40 mb-6">
                  Developed by Akhila Reddy
                </p>
                <Link to="/">
                  <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
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
