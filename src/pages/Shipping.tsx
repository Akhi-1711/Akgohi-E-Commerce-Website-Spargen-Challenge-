
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Truck, Clock, MapPin, Package, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Shipping = () => {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      duration: "5-7 business days",
      cost: "₹50",
      description: "Regular delivery for most locations across India"
    },
    {
      name: "Express Shipping",
      duration: "2-3 business days",
      cost: "₹150",
      description: "Faster delivery for urgent orders"
    },
    {
      name: "Same Day Delivery",
      duration: "Within 24 hours",
      cost: "₹300",
      description: "Available in select metro cities"
    },
    {
      name: "Free Shipping",
      duration: "5-7 business days",
      cost: "Free",
      description: "On orders above ₹500"
    }
  ];

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
              <h1 className="text-2xl font-bold text-black">Shipping Information</h1>
            </div>
            <Link to="/" className="text-2xl font-bold text-black">
              AKGOHI
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Shipping & Delivery</h2>
            <p className="text-gray-600">Fast, reliable delivery across India</p>
          </div>

          {/* Shipping Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {shippingOptions.map((option, index) => (
              <Card key={index} className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Truck className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-black mb-2">{option.name}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="bg-green-100 text-green-800">{option.duration}</Badge>
                        <Badge className="bg-blue-100 text-blue-800">{option.cost}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{option.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Shipping Process */}
          <Card className="bg-white border border-gray-200 mb-8">
            <CardHeader>
              <CardTitle className="text-black">How Shipping Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-black mb-2">Order Processing</h3>
                  <p className="text-gray-600 text-sm">We process your order within 24 hours</p>
                </div>

                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-black mb-2">Quality Check</h3>
                  <p className="text-gray-600 text-sm">Each item is carefully inspected before shipping</p>
                </div>

                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-black mb-2">Dispatch</h3>
                  <p className="text-gray-600 text-sm">Your order is shipped via trusted courier partners</p>
                </div>

                <div className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-black mb-2">Delivery</h3>
                  <p className="text-gray-600 text-sm">Safe delivery to your doorstep</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Delivery Areas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-black mb-2">Major Cities</h4>
                  <p className="text-gray-600 text-sm">Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-2">Other Cities</h4>
                  <p className="text-gray-600 text-sm">We deliver to 500+ cities across India</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-2">Rural Areas</h4>
                  <p className="text-gray-600 text-sm">Limited delivery available, additional charges may apply</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Important Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm">Delivery times may vary during festivals and peak seasons</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm">Someone must be available to receive the delivery</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm">We'll send tracking information via SMS and email</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm">Fragile items are packaged with extra care</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm">COD available for orders below ₹5000</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
