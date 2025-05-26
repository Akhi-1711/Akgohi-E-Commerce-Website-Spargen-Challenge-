
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Package, Heart, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('akgohi_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('akgohi_user');
    setUser(null);
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
            <Link to="/" className="text-2xl font-bold text-gradient">
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
                  <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                    <User className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                    <Package className="h-4 w-4 mr-2" />
                    Orders
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
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
          <div className="md:col-span-2 space-y-8">
            {/* Recent Orders */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Recent Orders</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Order #AKG001</h4>
                      <p className="text-white/60 text-sm">Electronics • 2 items</p>
                      <p className="text-white/60 text-sm">Placed on Dec 15, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">₹2,499</p>
                      <Badge className="bg-green-500/20 text-green-400">Delivered</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Order #AKG002</h4>
                      <p className="text-white/60 text-sm">Fashion • 3 items</p>
                      <p className="text-white/60 text-sm">Placed on Dec 10, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">₹1,799</p>
                      <Badge className="bg-blue-500/20 text-blue-400">Shipped</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-2">Contact Details</h4>
                    <div className="space-y-2 text-white/60">
                      <p>Email: {user.email}</p>
                      <p>Phone: +91 98765 43210</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-2">Address</h4>
                    <div className="space-y-2 text-white/60">
                      <p>123 Tech Street</p>
                      <p>Bangalore, Karnataka 560001</p>
                      <p>India</p>
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
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <p className="text-2xl font-bold text-purple-400">12</p>
                    <p className="text-white/60 text-sm">Total Orders</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <p className="text-2xl font-bold text-pink-400">₹25,699</p>
                    <p className="text-white/60 text-sm">Total Spent</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <p className="text-2xl font-bold text-green-400">8</p>
                    <p className="text-white/60 text-sm">Wishlist Items</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-400">4.8</p>
                    <p className="text-white/60 text-sm">Avg Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
