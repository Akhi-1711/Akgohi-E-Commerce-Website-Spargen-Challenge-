
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Returns = () => {
  const returnSteps = [
    {
      step: 1,
      title: "Initiate Return",
      description: "Contact our customer service or use the return option in your account"
    },
    {
      step: 2,
      title: "Return Approval",
      description: "We'll review your request and provide return instructions"
    },
    {
      step: 3,
      title: "Package Item",
      description: "Pack the item in original packaging with all accessories"
    },
    {
      step: 4,
      title: "Schedule Pickup",
      description: "Our courier partner will collect the item from your address"
    },
    {
      step: 5,
      title: "Quality Check",
      description: "We inspect the returned item for condition and completeness"
    },
    {
      step: 6,
      title: "Refund Processing",
      description: "Refund is processed to your original payment method"
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
              <h1 className="text-2xl font-bold text-black">Returns & Refunds</h1>
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
            <h2 className="text-3xl font-bold text-black mb-4">Easy Returns & Refunds</h2>
            <p className="text-gray-600">Hassle-free returns within 7 days of delivery</p>
          </div>

          {/* Return Policy Overview */}
          <Card className="bg-white border border-gray-200 mb-8">
            <CardHeader>
              <CardTitle className="text-black">Return Policy Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-black mb-2">7-Day Return Window</h3>
                  <p className="text-gray-600 text-sm">Return items within 7 days of delivery for a full refund</p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RotateCcw className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-black mb-2">Free Return Pickup</h3>
                  <p className="text-gray-600 text-sm">We'll arrange free pickup from your address</p>
                </div>

                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-black mb-2">Quick Refunds</h3>
                  <p className="text-gray-600 text-sm">Refunds processed within 3-5 business days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Return Process */}
          <Card className="bg-white border border-gray-200 mb-8">
            <CardHeader>
              <CardTitle className="text-black">How to Return an Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {returnSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-black mb-1">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Return Conditions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Items Eligible for Return</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">Items in original packaging</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">Unused products with tags</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">Electronics with all accessories</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">Books in good condition</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">Clothing without wear or damage</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center space-x-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span>Non-Returnable Items</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">Perishable goods (food items)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">Personal care items</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">Customized or personalized items</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">Software and digital downloads</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">Items returned after 7 days</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Refund Information */}
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Refund Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-black mb-4">Refund Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Credit Card</span>
                      <Badge className="bg-blue-100 text-blue-800">3-5 business days</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Debit Card</span>
                      <Badge className="bg-blue-100 text-blue-800">5-7 business days</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">UPI/Wallet</span>
                      <Badge className="bg-green-100 text-green-800">1-3 business days</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Net Banking</span>
                      <Badge className="bg-blue-100 text-blue-800">3-5 business days</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-black mb-4">Important Notes</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                      <span className="text-gray-700 text-sm">Refunds are processed to the original payment method</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                      <span className="text-gray-700 text-sm">Shipping charges are non-refundable for returned items</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                      <span className="text-gray-700 text-sm">Partial refunds may apply for damaged returns</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                      <span className="text-gray-700 text-sm">You'll receive email confirmation once refund is processed</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="mt-12 text-center">
            <Card className="bg-blue-50 border border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-black mb-4">Need Help with Returns?</h3>
                <p className="text-gray-700 mb-6">
                  Our customer support team is here to assist you with any return-related queries.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/contact" 
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Contact Support
                  </Link>
                  <a 
                    href="tel:9988776655" 
                    className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Call: 9988776655
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns;
