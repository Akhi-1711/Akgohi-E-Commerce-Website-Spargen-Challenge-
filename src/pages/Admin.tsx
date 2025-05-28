
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, ShoppingBag, Heart, Star, BarChart3, Package, TrendingUp, Calendar, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserProfile from '@/components/UserProfile';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Get data from localStorage
  const users = JSON.parse(localStorage.getItem('akgohi_users') || '[]');
  const wishlistItems = JSON.parse(localStorage.getItem('akgohi_wishlist') || '[]');
  const cartItems = JSON.parse(localStorage.getItem('akgohi_cart') || '{"items": []}');

  // Generate sample order data
  const generateOrders = () => {
    const orders = [];
    const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    const products = ['Wireless Headphones', 'Cotton T-Shirt', 'Smartphone', 'Laptop', 'Shoes'];
    
    for (let i = 1; i <= 15; i++) {
      orders.push({
        id: `ORD-${1000 + i}`,
        customerName: users[i % users.length]?.name || `Customer ${i}`,
        customerEmail: users[i % users.length]?.email || `customer${i}@example.com`,
        product: products[i % products.length],
        amount: Math.floor(Math.random() * 5000) + 500,
        status: statuses[i % statuses.length],
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        quantity: Math.floor(Math.random() * 3) + 1
      });
    }
    return orders;
  };

  const orders = generateOrders();

  // Generate analytics data
  const analytics = {
    dailyVisitors: Math.floor(Math.random() * 1000) + 500,
    monthlyRevenue: Math.floor(Math.random() * 100000) + 50000,
    conversionRate: (Math.random() * 5 + 2).toFixed(2),
    averageOrderValue: Math.floor(Math.random() * 2000) + 800,
    topCategories: [
      { name: 'Electronics', sales: 45, revenue: 125000 },
      { name: 'Apparel', sales: 32, revenue: 89000 },
      { name: 'Books', sales: 28, revenue: 45000 },
      { name: 'Organic', sales: 21, revenue: 67000 }
    ],
    recentActivity: [
      { action: 'New user registration', user: 'john@example.com', time: '2 minutes ago' },
      { action: 'Order placed', user: 'jane@example.com', time: '15 minutes ago' },
      { action: 'Product viewed', user: 'bob@example.com', time: '1 hour ago' },
      { action: 'Wishlist item added', user: 'alice@example.com', time: '2 hours ago' }
    ]
  };

  const stats = {
    totalUsers: users.length,
    totalOrders: orders.length,
    totalWishlistItems: wishlistItems.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.amount, 0),
    averageRating: 4.5,
    totalProducts: 650
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
              <div>
                <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
                <p className="text-gray-600">Manage your AKGOHI store</p>
              </div>
            </div>
            <Link to="/" className="text-2xl font-bold text-black">
              AKGOHI
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-black">{stats.totalUsers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Orders</p>
                      <p className="text-2xl font-bold text-black">{stats.totalOrders}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-8 w-8 text-red-600" />
                    <div>
                      <p className="text-sm text-gray-600">Wishlist Items</p>
                      <p className="text-2xl font-bold text-black">{stats.totalWishlistItems}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="text-2xl font-bold text-black">₹{stats.totalRevenue.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Star className="h-8 w-8 text-yellow-600" />
                    <div>
                      <p className="text-sm text-gray-600">Avg Rating</p>
                      <p className="text-2xl font-bold text-black">{stats.averageRating}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Package className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-600">Products</p>
                      <p className="text-2xl font-bold text-black">{stats.totalProducts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Recent Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {users.slice(0, 5).map((user: any) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-black">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                    ))}
                    {users.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No users found</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {orders.slice(0, 5).map((order: any) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-black">{order.id}</p>
                          <p className="text-sm text-gray-600">₹{order.amount}</p>
                        </div>
                        <Badge className={`${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <UserProfile />
          </TabsContent>

          <TabsContent value="orders">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-4">
                          <h3 className="font-semibold text-black">{order.id}</h3>
                          <Badge className={`${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{order.date}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Customer</p>
                          <p className="font-medium text-black">{order.customerName}</p>
                          <p className="text-gray-500">{order.customerEmail}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Product</p>
                          <p className="font-medium text-black">{order.product}</p>
                          <p className="text-gray-500">Qty: {order.quantity}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Amount</p>
                          <p className="font-bold text-black">₹{order.amount}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              {/* Analytics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Daily Visitors</p>
                        <p className="text-2xl font-bold text-black">{analytics.dailyVisitors}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Monthly Revenue</p>
                        <p className="text-2xl font-bold text-black">₹{analytics.monthlyRevenue.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-8 w-8 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Conversion Rate</p>
                        <p className="text-2xl font-bold text-black">{analytics.conversionRate}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <ShoppingBag className="h-8 w-8 text-orange-600" />
                      <div>
                        <p className="text-sm text-gray-600">Avg Order Value</p>
                        <p className="text-2xl font-bold text-black">₹{analytics.averageOrderValue}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Categories and Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-black">Top Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.topCategories.map((category, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-black">{category.name}</p>
                            <p className="text-sm text-gray-600">{category.sales}% of total sales</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-black">₹{category.revenue.toLocaleString()}</p>
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
                    <div className="space-y-3">
                      {analytics.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-black">{activity.action}</p>
                            <p className="text-xs text-gray-600">{activity.user}</p>
                          </div>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
