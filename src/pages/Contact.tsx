
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Mail, Phone, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Contact = () => {
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
              <h1 className="text-2xl font-bold text-black">Contact Us</h1>
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
            <h2 className="text-3xl font-bold text-black mb-4">Get in Touch</h2>
            <p className="text-gray-600">We're here to help you with any questions or concerns</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">Office Address</h3>
                      <p className="text-gray-600">1/118, Pathikonda</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">Email</h3>
                      <p className="text-gray-600">akhila@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">Contact Number</h3>
                      <p className="text-gray-600">9988776655</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Details */}
            <div>
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">About Our Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-black mb-2">Name</h3>
                    <p className="text-gray-700">Konakanti Akhila</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black mb-2">Our Mission</h3>
                    <p className="text-gray-700">
                      To provide the best shopping experience with quality products, 
                      competitive prices, and excellent customer service.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black mb-2">Customer Support</h3>
                    <p className="text-gray-700">
                      Our dedicated support team is available to help you with orders, 
                      returns, product inquiries, and any other questions you may have.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black mb-2">Quick Response</h3>
                    <p className="text-gray-700">
                      We aim to respond to all inquiries within 24 hours during business days.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black mb-2">Multiple Ways to Connect</h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Phone support for urgent matters</li>
                      <li>• Email for detailed inquiries</li>
                      <li>• Social media for updates and support</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
