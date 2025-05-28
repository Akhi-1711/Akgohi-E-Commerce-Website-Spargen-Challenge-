
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, ShoppingBag, Heart, Star, TrendingUp, Package, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Admin = () => {
  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalOrders: 3456,
    totalRevenue: 125000,
    activeProducts: 2500
  });

  const [wishlistData, setWishlistData] = useState<any[]>([]);

  useEffect(() => {
    // Load wishlist data for admin view
    try {
      const wishlist = JSON.parse(localStorage.getItem('akgohi_wishlist') || '[]');
      setWishlistData(wishlist);
    } catch (error) {
      console.error('Error loading wishlist data:', error);
    }
  }, []);

  const mockUsers = [
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@gmail.com', orders: 15, totalSpent: 45000, joinDate: '2024-01-15' },
    { id: 2, name: 'Priya Sharma', email: 'priya@gmail.com', orders: 8, totalSpent: 25000, joinDate: '2024-02-20' },
    { id: 3, name: 'Amit Singh', email: 'amit@gmail.com', orders: 12, totalSpent: 38000, joinDate: '2024-01-10' },
    { id: 4, name: 'Sneha Patel', email: 'sneha@gmail.com', orders: 6, totalSpent: 18000, joinDate: '2024-03-05' },
    { id: 5, name: 'Vikram Reddy', email: 'vikram@gmail.com', orders: 20, totalSpent: 65000, joinDate: '2023-12-01' }
  ];

  const mockOrders = [
    { id: 'ORD001', customer: 'Rajesh Kumar', items: 3, total: 5500, status: 'Delivered', date: '2024-12-15', rating: 5 },
    { id: 'ORD002', customer: 'Priya Sharma', items: 2, total: 3200, status: 'Shipped', date: '2024-12-14', rating: 4 },
    { id: 'ORD003', customer: 'Amit Singh', items: 1, total: 2999, status: 'Processing', date: '2024-12-13', rating: null },
    { id: 'ORD004', customer: 'Sneha Patel', items: 4, total: 8500, status: 'Delivered', date: '2024-12-12', rating: 5 },
    { id: 'ORD005', customer: 'Vikram Reddy', items: 2, total: 4200, status: 'Shipped', date: '2024-12-11', rating: 4 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500';
      case 'Shipped': return 'bg-blue-500';
      case 'Processing': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-black hover:text-gray-700 transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
            </div>
            <Link to="/" className="text-2xl font-bold text-black">
              AKGOHI
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-black">{stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-black">{stats.totalOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-black">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Package className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Products</p>
                  <p className="text-2xl font-bold text-black">{stats.activeProducts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="users" className="text-black">Users</TabsTrigger>
            <TabsTrigger value="orders" className="text-black">Orders</TabsTrigger>
            <TabsTrigger value="wishlist" className="text-black">Wishlist</TabsTrigger>
            <TabsTrigger value="analytics" className="text-black">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-4 text-black font-semibold">Name</th>
                        <th className="text-left p-4 text-black font-semibold">Email</th>
                        <th className="text-left p-4 text-black font-semibold">Orders</th>
                        <th className="text-left p-4 text-black font-semibold">Total Spent</th>
                        <th className="text-left p-4 text-black font-semibold">Join Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.map((user) => (
                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-4 text-black font-medium">{user.name}</td>
                          <td className="p-4 text-gray-600">{user.email}</td>
                          <td className="p-4 text-black">{user.orders}</td>
                          <td className="p-4 text-black">₹{user.totalSpent.toLocaleString()}</td>
                          <td className="p-4 text-gray-600">{user.joinDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-4 text-black font-semibold">Order ID</th>
                        <th className="text-left p-4 text-black font-semibold">Customer</th>
                        <th className="text-left p-4 text-black font-semibold">Items</th>
                        <th className="text-left p-4 text-black font-semibold">Total</th>
                        <th className="text-left p-4 text-black font-semibold">Status</th>
                        <th className="text-left p-4 text-black font-semibold">Rating</th>
                        <th className="text-left p-4 text-black font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-4 text-black font-medium">{order.id}</td>
                          <td className="p-4 text-black">{order.customer}</td>
                          <td className="p-4 text-gray-600">{order.items}</td>
                          <td className="p-4 text-black">₹{order.total.toLocaleString()}</td>
                          <td className="p-4">
                            <Badge className={`${getStatusColor(order.status)} text-white`}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            {order.rating ? (
                              <div className="flex items-center space-x-1">
                                {[...Array(order.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            ) : (
                              <span className="text-gray-400">Pending</span>
                            )}
                          </td>
                          <td className="p-4 text-gray-600">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Wishlist Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-gray-600">Total items in wishlists: {wishlistData.length}</p>
                </div>
                
                {wishlistData.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistData.map((item, index) => (
                      <Card key={index} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-black">{item.name}</h4>
                              <p className="text-sm text-gray-600">₹{item.price}</p>
                              <p className="text-xs text-gray-500">{item.category}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No items in wishlist yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Popular Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Electronics', 'Apparel', 'Books', 'Home Decor', 'Sports'].map((category, index) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-black">{category}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-gray-200 rounded">
                            <div 
                              className="h-2 bg-blue-600 rounded" 
                              style={{ width: `${(5-index) * 20}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{(5-index) * 20}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-black text-sm">New order received</span>
                      <span className="text-xs text-gray-500">2 min ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-black text-sm">Product added to wishlist</span>
                      <span className="text-xs text-gray-500">5 min ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-black text-sm">New user registered</span>
                      <span className="text-xs text-gray-500">10 min ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-black text-sm">Product review submitted</span>
                      <span className="text-xs text-gray-500">15 min ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
