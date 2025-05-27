
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Package, Heart, Settings, LogOut, Edit, MapPin, Phone, Mail, Calendar, Star, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const [user, setUser] = useState<any>({
    name: 'Akhila Reddy',
    email: 'akhila@gmail.com',
    avatar: ''
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [wishlistItems, setWishlistItems] = useState([]);
  const { addItem } = useCart();
  
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
    const savedWishlist = localStorage.getItem('akgohi_wishlist');
    if (savedWishlist) {
      try {
        const parsed = JSON.parse(savedWishlist);
        setWishlistItems(parsed);
      } catch (error) {
        console.log('Error parsing wishlist:', error);
        setWishlistItems([]);
      }
    }
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('akgohi_user');
    localStorage.removeItem('akgohi_wishlist');
    setUser(null);
  };

  const removeFromWishlist = (itemToRemove: any) => {
    const updatedWishlist = wishlistItems.filter((item: any) => 
      !(item.id === itemToRemove.id && 
        item.selectedSize === itemToRemove.selectedSize && 
        item.selectedColor === itemToRemove.selectedColor)
    );
    
    localStorage.setItem('akgohi_wishlist', JSON.stringify(updatedWishlist));
    setWishlistItems(updatedWishlist);
    
    toast({
      title: "Removed from Wishlist",
      description: `${itemToRemove.name} has been removed from your wishlist.`,
    });
  };

  const addWishlistItemToCart = (item: any) => {
    addItem({
      id: `${item.id}-${item.selectedSize || 'M'}-${item.selectedColor || 'Black'}`,
      name: `${item.name}${item.selectedSize ? ` (${item.selectedSize})` : ''}${item.selectedColor ? ` (${item.selectedColor})` : ''}`,
      price: item.price,
      image: item.images?.[0] || `https://picsum.photos/300/300?random=${item.id}`,
      category: item.category
    });
    
    toast({
      title: "Added to Cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const avgRating = 4.8;

  const renderProfileContent = () => {
    switch (activeTab) {
      case 'edit':
        return (
          <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-black mb-6">Edit Profile</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-black">First Name</Label>
                    <Input 
                      id="firstName" 
                      defaultValue={user?.name?.split(' ')[0] || 'Akhila'} 
                      className="bg-gray-50 border-gray-300 text-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-black">Last Name</Label>
                    <Input 
                      id="lastName" 
                      defaultValue={user?.name?.split(' ')[1] || 'Reddy'} 
                      className="bg-gray-50 border-gray-300 text-black"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-black">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={user?.email || 'akhila@gmail.com'} 
                    className="bg-gray-50 border-gray-300 text-black"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-black">Phone Number</Label>
                  <Input 
                    id="phone" 
                    defaultValue="+91 98765 43210" 
                    className="bg-gray-50 border-gray-300 text-black"
                  />
                </div>
                <div>
                  <Label htmlFor="college" className="text-black">College</Label>
                  <Input 
                    id="college" 
                    defaultValue="GPCET, Kurnool" 
                    className="bg-gray-50 border-gray-300 text-black"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-black">Address</Label>
                  <Input 
                    id="address" 
                    defaultValue="Kurnool, Andhra Pradesh, India" 
                    className="bg-gray-50 border-gray-300 text-black"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'orders':
        return (
          <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-black mb-6">My Orders ({orders.length})</h3>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-4">
                        <Package className="h-8 w-8 text-blue-600" />
                        <div>
                          <h4 className="text-black font-medium">Order #{order.id}</h4>
                          <p className="text-gray-700 text-sm">{order.category} • {order.items} items</p>
                          <p className="text-gray-700 text-sm">Placed on {new Date(order.date).toLocaleDateString()}</p>
                          <div className="mt-1">
                            <p className="text-gray-600 text-xs">Products: {order.products.join(', ')}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-black font-medium">₹{order.total}</p>
                        <Badge className={`${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-gray-400 text-black hover:bg-gray-100">
                        Track Order
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-400 text-black hover:bg-gray-100">
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
          <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-black mb-6">My Wishlist ({wishlistItems.length} items)</h3>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-16 w-16 text-pink-400 mx-auto mb-4" />
                  <p className="text-gray-700 mb-4">Your wishlist is empty</p>
                  <Link to="/">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item: any, index) => (
                    <Card key={index} className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="relative">
                          <img 
                            src={item.images?.[0] || `https://picsum.photos/300/300?random=${item.id}`} 
                            alt={item.name || 'Wishlist item'}
                            className="w-full h-40 object-cover rounded mb-3"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                            onClick={() => removeFromWishlist(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <h4 className="text-black font-medium mb-2 line-clamp-2">{item.name || 'Product Name'}</h4>
                        <p className="text-lg font-bold text-black mb-2">₹{item.price || '999'}</p>
                        {item.selectedSize && <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>}
                        {item.selectedColor && <p className="text-sm text-gray-600">Color: {item.selectedColor}</p>}
                        <p className="text-xs text-gray-500 mb-3">Added: {new Date(item.addedDate).toLocaleDateString()}</p>
                        <Button 
                          size="sm" 
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => addWishlistItemToCart(item)}
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
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
          <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-black mb-6">Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div>
                    <h4 className="text-black font-medium">Email Notifications</h4>
                    <p className="text-gray-600 text-sm">Receive updates about your orders and promotions</p>
                  </div>
                  <Button variant="outline" className="border-purple-400 text-purple-800 hover:bg-purple-100">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <h4 className="text-black font-medium">Privacy Settings</h4>
                    <p className="text-gray-600 text-sm">Manage your data and privacy preferences</p>
                  </div>
                  <Button variant="outline" className="border-green-400 text-green-800 hover:bg-green-100">
                    Manage
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div>
                    <h4 className="text-black font-medium">Payment Methods</h4>
                    <p className="text-gray-600 text-sm">Add or remove payment methods</p>
                  </div>
                  <Button variant="outline" className="border-orange-400 text-orange-800 hover:bg-orange-100">
                    Edit
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                  <div>
                    <h4 className="text-black font-medium">Language & Region</h4>
                    <p className="text-gray-600 text-sm">Change your language and currency preferences</p>
                  </div>
                  <Button variant="outline" className="border-amber-400 text-amber-800 hover:bg-amber-100">
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
            <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-black mb-6">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-gray-600 text-sm">Email</p>
                        <p className="text-black">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-gray-600 text-sm">Location</p>
                        <p className="text-black">Kurnool, Andhra Pradesh</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-gray-600 text-sm">Member Since</p>
                        <p className="text-black">December 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shopping Stats */}
            <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-black mb-6">Shopping Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer" onClick={() => setActiveTab('orders')}>
                    <ShoppingBag className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-700">{orders.length}</p>
                    <p className="text-blue-700 text-sm">Total Orders</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                    <p className="text-2xl font-bold text-green-700">₹{totalSpent.toLocaleString()}</p>
                    <p className="text-green-700 text-sm">Total Spent</p>
                  </div>
                  <div className="text-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors cursor-pointer" onClick={() => setActiveTab('wishlist')}>
                    <Heart className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-pink-700">{wishlistItems.length}</p>
                    <p className="text-pink-700 text-sm">Wishlist Items</p>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer">
                    <Star className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-amber-700">{avgRating}</p>
                    <p className="text-amber-700 text-sm">Avg Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
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
              <h1 className="text-2xl font-bold text-black">My Profile</h1>
            </div>
            <Link to="/" className="text-2xl font-bold text-black">
              AKGOHI
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-blue-600 text-white text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-bold text-black mb-1">{user.name}</h2>
                <p className="text-gray-600 text-sm mb-4">GPCET, Kurnool</p>
                
                <Badge className="bg-blue-600 text-white mb-6">
                  Premium Customer
                </Badge>

                <div className="space-y-2">
                  <Button 
                    variant={activeTab === 'edit' ? 'default' : 'ghost'} 
                    className={`w-full justify-start ${
                      activeTab === 'edit' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-black hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('edit')}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button 
                    variant={activeTab === 'orders' ? 'default' : 'ghost'} 
                    className={`w-full justify-start ${
                      activeTab === 'orders' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-black hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Orders
                  </Button>
                  <Button 
                    variant={activeTab === 'wishlist' ? 'default' : 'ghost'} 
                    className={`w-full justify-start ${
                      activeTab === 'wishlist' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-black hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist
                  </Button>
                  <Button 
                    variant={activeTab === 'settings' ? 'default' : 'ghost'} 
                    className={`w-full justify-start ${
                      activeTab === 'settings' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-black hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="h-4 w-4 mr-2" />
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
