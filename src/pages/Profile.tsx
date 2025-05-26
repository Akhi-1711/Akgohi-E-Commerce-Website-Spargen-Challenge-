
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Package, Heart, Settings, LogOut, Edit, MapPin, Phone, Mail, Calendar, Star, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [wishlistItems, setWishlistItems] = useState([]);
  const [orders, setOrders] = useState([
    {
      id: 'AKG001',
      date: '2024-12-15',
      items: 2,
      total: 2499,
      status: 'Delivered',
      category: 'Electronics',
      products: ['Premium Wireless Headphones', 'Bluetooth Speaker']
    },
    {
      id: 'AKG002',
      date: '2024-12-10',
      items: 3,
      total: 1799,
      status: 'Shipped',
      category: 'Fashion',
      products: ['Cotton T-Shirt', 'Denim Jeans', 'Casual Sneakers']
    },
    {
      id: 'AKG003',
      date: '2024-12-05',
      items: 1,
      total: 899,
      status: 'Processing',
      category: 'Books',
      products: ['JavaScript: The Complete Guide']
    }
  ]);

  useEffect(() => {
    const savedUser = localStorage.getItem('akgohi_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedWishlist = localStorage.getItem('akgohi_wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('akgohi_user');
    localStorage.removeItem('akgohi_wishlist');
    setUser(null);
  };

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const avgRating = 4.8;

  const renderProfileContent = () => {
    switch (activeTab) {
      case 'edit':
        return (
          <Card className="bg-yellow-50/80 backdrop-blur-xl border border-yellow-300/50 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-yellow-900 mb-6">Edit Profile</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-yellow-900">First Name</Label>
                    <Input 
                      id="firstName" 
                      defaultValue={user?.name?.split(' ')[0] || 'Akhila'} 
                      className="bg-yellow-100/50 border-yellow-300 text-yellow-900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-yellow-900">Last Name</Label>
                    <Input 
                      id="lastName" 
                      defaultValue={user?.name?.split(' ')[1] || 'Reddy'} 
                      className="bg-yellow-100/50 border-yellow-300 text-yellow-900"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-yellow-900">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={user?.email || 'akhila@gmail.com'} 
                    className="bg-yellow-100/50 border-yellow-300 text-yellow-900"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-yellow-900">Phone Number</Label>
                  <Input 
                    id="phone" 
                    defaultValue="+91 98765 43210" 
                    className="bg-yellow-100/50 border-yellow-300 text-yellow-900"
                  />
                </div>
                <div>
                  <Label htmlFor="college" className="text-yellow-900">College</Label>
                  <Input 
                    id="college" 
                    defaultValue="GPCET, Kurnool" 
                    className="bg-yellow-100/50 border-yellow-300 text-yellow-900"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-yellow-900">Address</Label>
                  <Input 
                    id="address" 
                    defaultValue="Kurnool, Andhra Pradesh, India" 
                    className="bg-yellow-100/50 border-yellow-300 text-yellow-900"
                  />
                </div>
                <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'orders':
        return (
          <Card className="bg-yellow-50/80 backdrop-blur-xl border border-yellow-300/50 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-yellow-900 mb-6">My Orders ({orders.length})</h3>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-4 bg-yellow-100/50 rounded-lg border border-yellow-300/30 hover:bg-yellow-100 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-4">
                        <Package className="h-8 w-8 text-yellow-600 animate-bounce" />
                        <div>
                          <h4 className="text-yellow-900 font-medium">Order #{order.id}</h4>
                          <p className="text-yellow-700 text-sm">{order.category} • {order.items} items</p>
                          <p className="text-yellow-700 text-sm">Placed on {new Date(order.date).toLocaleDateString()}</p>
                          <div className="mt-1">
                            <p className="text-yellow-800 text-xs">Products: {order.products.join(', ')}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-yellow-900 font-medium">₹{order.total}</p>
                        <Badge className={`${
                          order.status === 'Delivered' ? 'bg-green-500/20 text-green-700' :
                          order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-700' :
                          'bg-yellow-500/20 text-yellow-700'
                        }`}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-yellow-400 text-yellow-800 hover:bg-yellow-100">
                        Track Order
                      </Button>
                      <Button size="sm" variant="outline" className="border-yellow-400 text-yellow-800 hover:bg-yellow-100">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'wishlist':
        return (
          <Card className="bg-yellow-50/80 backdrop-blur-xl border border-yellow-300/50 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-yellow-900 mb-6">My Wishlist ({wishlistItems.length} items)</h3>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-16 w-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-yellow-700">Your wishlist is empty</p>
                  <Link to="/">
                    <Button className="mt-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item: any, index) => (
                    <Card key={index} className="bg-yellow-100/50 border border-yellow-300/50 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <img 
                          src={item.images?.[0] || `https://picsum.photos/200/200?random=${index}`} 
                          alt={item.name || 'Wishlist item'}
                          className="w-full h-40 object-cover rounded mb-3"
                        />
                        <h4 className="text-yellow-900 font-medium mb-2">{item.name || 'Product Name'}</h4>
                        <p className="text-lg font-bold text-yellow-900">₹{item.price || '999'}</p>
                        {item.selectedSize && <p className="text-sm text-yellow-700">Size: {item.selectedSize}</p>}
                        {item.selectedColor && <p className="text-sm text-yellow-700">Color: {item.selectedColor}</p>}
                        <Button size="sm" className="w-full mt-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'settings':
        return (
          <Card className="bg-yellow-50/80 backdrop-blur-xl border border-yellow-300/50 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-yellow-900 mb-6">Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-yellow-100/50 rounded-lg">
                  <div>
                    <h4 className="text-yellow-900 font-medium">Email Notifications</h4>
                    <p className="text-yellow-700 text-sm">Receive updates about your orders and promotions</p>
                  </div>
                  <Button variant="outline" className="border-yellow-400 text-yellow-800 hover:bg-yellow-100">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-yellow-100/50 rounded-lg">
                  <div>
                    <h4 className="text-yellow-900 font-medium">Privacy Settings</h4>
                    <p className="text-yellow-700 text-sm">Manage your data and privacy preferences</p>
                  </div>
                  <Button variant="outline" className="border-yellow-400 text-yellow-800 hover:bg-yellow-100">
                    Manage
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-yellow-100/50 rounded-lg">
                  <div>
                    <h4 className="text-yellow-900 font-medium">Payment Methods</h4>
                    <p className="text-yellow-700 text-sm">Add or remove payment methods</p>
                  </div>
                  <Button variant="outline" className="border-yellow-400 text-yellow-800 hover:bg-yellow-100">
                    Edit
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-yellow-100/50 rounded-lg">
                  <div>
                    <h4 className="text-yellow-900 font-medium">Language & Region</h4>
                    <p className="text-yellow-700 text-sm">Change your language and currency preferences</p>
                  </div>
                  <Button variant="outline" className="border-yellow-400 text-yellow-800 hover:bg-yellow-100">
                    Change
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return (
          <div className="space-y-8">
            {/* Account Information */}
            <Card className="bg-yellow-50/80 backdrop-blur-xl border border-yellow-300/50 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-yellow-900 mb-6">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-yellow-600 animate-bounce" />
                      <div>
                        <p className="text-yellow-700 text-sm">Email</p>
                        <p className="text-yellow-900">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-yellow-600 animate-pulse" />
                      <div>
                        <p className="text-yellow-700 text-sm">Phone</p>
                        <p className="text-yellow-900">+91 98765 43210</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-yellow-600 animate-bounce" />
                      <div>
                        <p className="text-yellow-700 text-sm">Location</p>
                        <p className="text-yellow-900">Kurnool, Andhra Pradesh</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-yellow-600 animate-pulse" />
                      <div>
                        <p className="text-yellow-700 text-sm">Member Since</p>
                        <p className="text-yellow-900">December 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shopping Stats */}
            <Card className="bg-yellow-50/80 backdrop-blur-xl border border-yellow-300/50 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-yellow-900 mb-6">Shopping Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-yellow-100/50 rounded-lg hover:bg-yellow-100 transition-colors cursor-pointer hover:scale-105 transform duration-300" onClick={() => setActiveTab('orders')}>
                    <ShoppingBag className="h-8 w-8 text-yellow-600 mx-auto mb-2 animate-bounce" />
                    <p className="text-2xl font-bold text-yellow-700">{orders.length}</p>
                    <p className="text-yellow-700 text-sm">Total Orders</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-100/50 rounded-lg hover:bg-yellow-100 transition-colors cursor-pointer hover:scale-105 transform duration-300">
                    <p className="text-2xl font-bold text-yellow-700">₹{totalSpent.toLocaleString()}</p>
                    <p className="text-yellow-700 text-sm">Total Spent</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-100/50 rounded-lg hover:bg-yellow-100 transition-colors cursor-pointer hover:scale-105 transform duration-300" onClick={() => setActiveTab('wishlist')}>
                    <Heart className="h-8 w-8 text-yellow-600 mx-auto mb-2 animate-pulse" />
                    <p className="text-2xl font-bold text-yellow-700">{wishlistItems.length}</p>
                    <p className="text-yellow-700 text-sm">Wishlist Items</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-100/50 rounded-lg hover:bg-yellow-100 transition-colors cursor-pointer hover:scale-105 transform duration-300">
                    <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2 animate-spin" />
                    <p className="text-2xl font-bold text-yellow-700">{avgRating}</p>
                    <p className="text-yellow-700 text-sm">Avg Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 flex items-center justify-center">
        <div className="text-center text-yellow-900">
          <h1 className="text-4xl font-bold mb-4">Please Login</h1>
          <Link to="/" className="text-yellow-700 hover:text-yellow-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300">
      {/* Header */}
      <div className="bg-yellow-900/30 backdrop-blur-md border-b border-yellow-600/30 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-yellow-900 hover:text-yellow-700 transition-colors transform hover:scale-110">
                <ArrowLeft className="h-6 w-6 animate-bounce" />
              </Link>
              <h1 className="text-2xl font-bold text-yellow-900">My Profile</h1>
            </div>
            <Link to="/" className="text-2xl font-bold text-gradient bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent animate-pulse-neon">
              AKGOHI
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <Card className="bg-yellow-50/80 backdrop-blur-xl border border-yellow-300/50 rounded-2xl shadow-lg">
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-bold text-yellow-900 mb-1">{user.name}</h2>
                <p className="text-yellow-700 text-sm mb-2">GPCET, Kurnool</p>
                <p className="text-yellow-700 text-sm mb-4">{user.email}</p>
                
                <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white mb-6">
                  Premium Customer
                </Badge>

                <div className="space-y-2">
                  <Button 
                    variant={activeTab === 'edit' ? 'default' : 'ghost'} 
                    className="w-full justify-start text-yellow-900 hover:bg-yellow-100 data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
                    onClick={() => setActiveTab('edit')}
                  >
                    <Edit className="h-4 w-4 mr-2 animate-pulse" />
                    Edit Profile
                  </Button>
                  <Button 
                    variant={activeTab === 'orders' ? 'default' : 'ghost'} 
                    className="w-full justify-start text-yellow-900 hover:bg-yellow-100 data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
                    onClick={() => setActiveTab('orders')}
                  >
                    <Package className="h-4 w-4 mr-2 animate-bounce" />
                    Orders
                  </Button>
                  <Button 
                    variant={activeTab === 'wishlist' ? 'default' : 'ghost'} 
                    className="w-full justify-start text-yellow-900 hover:bg-yellow-100 data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <Heart className="h-4 w-4 mr-2 animate-pulse" />
                    Wishlist
                  </Button>
                  <Button 
                    variant={activeTab === 'settings' ? 'default' : 'ghost'} 
                    className="w-full justify-start text-yellow-900 hover:bg-yellow-100 data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="h-4 w-4 mr-2 animate-spin" />
                    Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Content */}
          <div className="md:col-span-2">
            {renderProfileContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
