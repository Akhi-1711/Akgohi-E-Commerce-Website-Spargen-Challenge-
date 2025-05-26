
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
      category: 'Electronics'
    },
    {
      id: 'AKG002',
      date: '2024-12-10',
      items: 3,
      total: 1799,
      status: 'Shipped',
      category: 'Fashion'
    },
    {
      id: 'AKG003',
      date: '2024-12-05',
      items: 1,
      total: 899,
      status: 'Processing',
      category: 'Books'
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
          <Card className="glass-card">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Edit Profile</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-white">First Name</Label>
                    <Input 
                      id="firstName" 
                      defaultValue={user?.name?.split(' ')[0] || ''} 
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">Last Name</Label>
                    <Input 
                      id="lastName" 
                      defaultValue={user?.name?.split(' ')[1] || ''} 
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={user?.email || ''} 
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">Phone Number</Label>
                  <Input 
                    id="phone" 
                    defaultValue="+91 98765 43210" 
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-white">Address</Label>
                  <Input 
                    id="address" 
                    defaultValue="123 Tech Street, Bangalore, Karnataka 560001" 
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'orders':
        return (
          <Card className="glass-card">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">My Orders</h3>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-4">
                        <Package className="h-8 w-8 text-purple-400" />
                        <div>
                          <h4 className="text-white font-medium">Order #{order.id}</h4>
                          <p className="text-white/60 text-sm">{order.category} • {order.items} items</p>
                          <p className="text-white/60 text-sm">Placed on {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">₹{order.total}</p>
                        <Badge className={`${
                          order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                          order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        Track Order
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
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
          <Card className="glass-card">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">My Wishlist ({wishlistItems.length} items)</h3>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-16 w-16 text-white/30 mx-auto mb-4" />
                  <p className="text-white/60">Your wishlist is empty</p>
                  <Link to="/">
                    <Button className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500">
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item: any, index) => (
                    <Card key={index} className="glass-card">
                      <CardContent className="p-4">
                        <img 
                          src={item.image || `https://picsum.photos/200/200?random=${index}`} 
                          alt={item.name || 'Wishlist item'}
                          className="w-full h-40 object-cover rounded mb-3"
                        />
                        <h4 className="text-white font-medium mb-2">{item.name || 'Product Name'}</h4>
                        <p className="text-lg font-bold text-white">₹{item.price || '999'}</p>
                        <Button size="sm" className="w-full mt-3 bg-gradient-to-r from-purple-500 to-pink-500">
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
          <Card className="glass-card">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Email Notifications</h4>
                    <p className="text-white/60 text-sm">Receive updates about your orders</p>
                  </div>
                  <Button variant="outline" className="border-white/30 text-white">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Privacy Settings</h4>
                    <p className="text-white/60 text-sm">Manage your data and privacy</p>
                  </div>
                  <Button variant="outline" className="border-white/30 text-white">
                    Manage
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Payment Methods</h4>
                    <p className="text-white/60 text-sm">Add or remove payment methods</p>
                  </div>
                  <Button variant="outline" className="border-white/30 text-white">
                    Edit
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Language & Region</h4>
                    <p className="text-white/60 text-sm">Change your language and currency</p>
                  </div>
                  <Button variant="outline" className="border-white/30 text-white">
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
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-purple-400" />
                      <div>
                        <p className="text-white/60 text-sm">Email</p>
                        <p className="text-white">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-purple-400" />
                      <div>
                        <p className="text-white/60 text-sm">Phone</p>
                        <p className="text-white">+91 98765 43210</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-purple-400" />
                      <div>
                        <p className="text-white/60 text-sm">Address</p>
                        <p className="text-white">123 Tech Street</p>
                        <p className="text-white">Bangalore, Karnataka 560001</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-purple-400" />
                      <div>
                        <p className="text-white/60 text-sm">Member Since</p>
                        <p className="text-white">December 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shopping Stats */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Shopping Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer" onClick={() => setActiveTab('orders')}>
                    <ShoppingBag className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-400">{orders.length}</p>
                    <p className="text-white/60 text-sm">Total Orders</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                    <p className="text-2xl font-bold text-pink-400">₹{totalSpent.toLocaleString()}</p>
                    <p className="text-white/60 text-sm">Total Spent</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer" onClick={() => setActiveTab('wishlist')}>
                    <Heart className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-400">{wishlistItems.length}</p>
                    <p className="text-white/60 text-sm">Wishlist Items</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                    <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-yellow-400">{avgRating}</p>
                    <p className="text-white/60 text-sm">Avg Rating</p>
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Please Login</h1>
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            ← Back to Home
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
              <Link to="/" className="text-white hover:text-purple-400 transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-white">My Profile</h1>
            </div>
            <Link to="/" className="text-2xl font-bold text-gradient bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AKGOHI
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <Card className="glass-card">
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-bold text-white mb-2">{user.name}</h2>
                <p className="text-white/60 mb-4">{user.email}</p>
                
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
                  Premium Customer
                </Badge>

                <div className="space-y-2">
                  <Button 
                    variant={activeTab === 'edit' ? 'default' : 'ghost'} 
                    className="w-full justify-start text-white hover:bg-white/10"
                    onClick={() => setActiveTab('edit')}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button 
                    variant={activeTab === 'orders' ? 'default' : 'ghost'} 
                    className="w-full justify-start text-white hover:bg-white/10"
                    onClick={() => setActiveTab('orders')}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Orders
                  </Button>
                  <Button 
                    variant={activeTab === 'wishlist' ? 'default' : 'ghost'} 
                    className="w-full justify-start text-white hover:bg-white/10"
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist
                  </Button>
                  <Button 
                    variant={activeTab === 'settings' ? 'default' : 'ghost'} 
                    className="w-full justify-start text-white hover:bg-white/10"
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
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
