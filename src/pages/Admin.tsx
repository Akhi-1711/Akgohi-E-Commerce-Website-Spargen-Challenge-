
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, ShoppingBag, Heart, Star, BarChart3, Package, TrendingUp, Calendar, Eye, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import UserProfile from '@/components/UserProfile';
import ProductManagement from '@/components/ProductManagement';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Get data from localStorage
  const users = JSON.parse(localStorage.getItem('akgohi_users') || '[]');
  const wishlistItems = JSON.parse(localStorage.getItem('akgohi_wishlist') || '[]');
  const cartItems = JSON.parse(localStorage.getItem('akgohi_cart') || '{"items": []}');

  // Enhanced order data with more realistic information
  const generateOrders = () => {
    const orders = [];
    const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    const products = [
      { name: 'Wireless Headphones', price: 2999, category: 'Electronics' },
      { name: 'Cotton T-Shirt', price: 799, category: 'Apparel' },
      { name: 'Smartphone', price: 15999, category: 'Electronics' },
      { name: 'Laptop', price: 45999, category: 'Electronics' },
      { name: 'Running Shoes', price: 3499, category: 'Footwear' },
      { name: 'Organic Apples', price: 199, category: 'Organic' },
      { name: 'Yoga Mat', price: 1299, category: 'Yoga' },
      { name: 'Kitchen Blender', price: 2499, category: 'Kitchen' }
    ];
    
    for (let i = 1; i <= 25; i++) {
      const product = products[i % products.length];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const orderDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
      
      orders.push({
        id: `ORD-${String(1000 + i).padStart(6, '0')}`,
        customerName: users[i % Math.max(users.length, 1)]?.name || `Customer ${i}`,
        customerEmail: users[i % Math.max(users.length, 1)]?.email || `customer${i}@example.com`,
        product: product.name,
        category: product.category,
        amount: product.price * quantity,
        status: statuses[i % statuses.length],
        date: orderDate.toLocaleDateString(),
        time: orderDate.toLocaleTimeString(),
        quantity: quantity,
        shippingAddress: `Address ${i}, City ${i % 10 + 1}, State`,
        paymentMethod: ['Card', 'UPI', 'Net Banking', 'Wallet'][i % 4],
        trackingId: `TRK${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`
      });
    }
    return orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const orders = generateOrders();

  // Enhanced analytics data
  const analytics = {
    dailyVisitors: Math.floor(Math.random() * 1000) + 500,
    monthlyRevenue: Math.floor(Math.random() * 100000) + 50000,
    conversionRate: (Math.random() * 5 + 2).toFixed(2),
    averageOrderValue: Math.floor(Math.random() * 2000) + 800,
    topCategories: [
      { name: 'Electronics', sales: 45, revenue: 125000, growth: '+12%' },
      { name: 'Apparel', sales: 32, revenue: 89000, growth: '+8%' },
      { name: 'Books', sales: 28, revenue: 45000, growth: '+15%' },
      { name: 'Organic', sales: 21, revenue: 67000, growth: '+22%' }
    ],
    recentActivity: [
      { action: 'New user registration', user: 'john@example.com', time: '2 minutes ago' },
      { action: 'Order placed', user: 'jane@example.com', time: '15 minutes ago' },
      { action: 'Product viewed', user: 'bob@example.com', time: '1 hour ago' },
      { action: 'Wishlist item added', user: 'alice@example.com', time: '2 hours ago' }
    ],
    salesData: [
      { month: 'Jan', sales: 45000, orders: 120 },
      { month: 'Feb', sales: 52000, orders: 140 },
      { month: 'Mar', sales: 48000, orders: 130 },
      { month: 'Apr', sales: 61000, orders: 165 },
      { month: 'May', sales: 58000, orders: 155 },
      { month: 'Jun', sales: 67000, orders: 180 }
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
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
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

          <TabsContent value="products">
            <ProductManagement />
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
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.slice(0, 15).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{order.customerName}</p>
                              <p className="text-sm text-gray-500">{order.customerEmail}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{order.product}</p>
                              <p className="text-sm text-gray-500">Qty: {order.quantity}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-bold">₹{order.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={`${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p>{order.date}</p>
                              <p className="text-sm text-gray-500">{order.time}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard analytics={analytics} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
