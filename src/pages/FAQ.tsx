
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FAQ = () => {
  const faqs = [
    {
      question: "How do I place an order on AKGOHI?",
      answer: "To place an order, browse our products, add items to your cart, and proceed to checkout. You'll need to provide your shipping information and payment details to complete the purchase."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI payments, net banking, and digital wallets like Paytm, PhonePe, and Google Pay."
    },
    {
      question: "How long does delivery take?",
      answer: "Delivery typically takes 3-7 business days depending on your location. Express delivery options are available for faster shipping."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 7-day return policy for most items. Products must be in original condition with tags attached. Some items like electronics may have different return periods."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via email and SMS. You can use this to track your order status on our website or the courier's website."
    },
    {
      question: "Do you offer free shipping?",
      answer: "Yes, we offer free shipping on orders above ₹500. For orders below this amount, standard shipping charges apply."
    },
    {
      question: "How do I add items to my wishlist?",
      answer: "Click the heart icon on any product to add it to your wishlist. You can view all your wishlist items by clicking the 'Wishlist' button in the header."
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "Orders can be modified or cancelled within 1 hour of placing them. After this time, the order enters processing and cannot be changed."
    },
    {
      question: "What if I receive a damaged product?",
      answer: "If you receive a damaged product, please contact our customer service immediately with photos of the damage. We'll arrange for a replacement or refund."
    },
    {
      question: "Do you have a customer loyalty program?",
      answer: "Yes, we have a rewards program where you earn points for every purchase. These points can be redeemed for discounts on future orders."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our customer support through email (akhila@gmail.com), phone (9988776655), or through our contact page. We're available Monday-Friday 9 AM to 6 PM."
    },
    {
      question: "Are the product images accurate?",
      answer: "We strive to display accurate product images. However, colors may vary slightly due to screen settings. Product dimensions and specifications are always accurate."
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
              <h1 className="text-2xl font-bold text-black">Frequently Asked Questions</h1>
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
            <h2 className="text-3xl font-bold text-black mb-4">How can we help you?</h2>
            <p className="text-gray-600">Find answers to the most common questions about AKGOHI</p>
          </div>

          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Common Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-4">
                    <AccordionTrigger className="text-left text-black hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <Card className="bg-blue-50 border border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-black mb-4">Still have questions?</h3>
                <p className="text-gray-700 mb-6">
                  Can't find the answer you're looking for? Our customer support team is here to help.
                </p>
                <Link 
                  to="/contact" 
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Support
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
