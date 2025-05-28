
import React, { useState, useEffect } from 'react';
import { User, Edit, Save, X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  dateJoined: string;
}

const UserProfile: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Omit<UserData, 'id' | 'dateJoined'>>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    // Load users from localStorage
    const savedUsers = localStorage.getItem('akgohi_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Add some sample users
      const sampleUsers: UserData[] = [
        {
          id: '1',
          name: 'Konakanti Akhila',
          email: 'akhila@gmail.com',
          phone: '9988776655',
          address: '1/118, Pathikonda',
          city: 'Kurnool',
          state: 'Andhra Pradesh',
          pincode: '518452',
          dateJoined: new Date().toISOString()
        }
      ];
      setUsers(sampleUsers);
      localStorage.setItem('akgohi_users', JSON.stringify(sampleUsers));
    }
  }, []);

  const saveUsers = (updatedUsers: UserData[]) => {
    setUsers(updatedUsers);
    localStorage.setItem('akgohi_users', JSON.stringify(updatedUsers));
  };

  const handleInputChange = (field: keyof Omit<UserData, 'id' | 'dateJoined'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddUser = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Email, Phone).",
        variant: "destructive"
      });
      return;
    }

    const newUser: UserData = {
      ...formData,
      id: Date.now().toString(),
      dateJoined: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
    });
    setShowAddForm(false);
    
    toast({
      title: "User Added",
      description: "New user has been added successfully.",
    });
  };

  const handleEditUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        pincode: user.pincode
      });
      setEditingUser(userId);
    }
  };

  const handleSaveEdit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const updatedUsers = users.map(user => 
      user.id === editingUser 
        ? { ...user, ...formData }
        : user
    );
    
    saveUsers(updatedUsers);
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
    });
    
    toast({
      title: "User Updated",
      description: "User information has been updated successfully.",
    });
  };

  const handleDeleteUser = (userId: string) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    saveUsers(updatedUsers);
    
    toast({
      title: "User Deleted",
      description: "User has been deleted successfully.",
    });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setShowAddForm(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">User Management</h2>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Add User Form */}
      {(showAddForm || editingUser) && (
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">
              {editingUser ? 'Edit User' : 'Add New User'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-black">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-white border-gray-300 text-black"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-black">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-white border-gray-300 text-black"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-black">Phone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-white border-gray-300 text-black"
                />
              </div>
              <div>
                <Label htmlFor="address" className="text-black">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="bg-white border-gray-300 text-black"
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-black">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="bg-white border-gray-300 text-black"
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-black">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="bg-white border-gray-300 text-black"
                />
              </div>
              <div>
                <Label htmlFor="pincode" className="text-black">Pincode</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  className="bg-white border-gray-300 text-black"
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                onClick={editingUser ? handleSaveEdit : handleAddUser}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingUser ? 'Update' : 'Add'} User
              </Button>
              <Button 
                onClick={cancelEdit}
                variant="outline"
                className="border-gray-300 text-black hover:bg-gray-50"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-black">{user.name}</h3>
                </div>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditUser(user.id)}
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span> {user.phone}
                </p>
                {user.address && (
                  <p className="text-gray-600">
                    <span className="font-medium">Address:</span> {user.address}
                  </p>
                )}
                {user.city && (
                  <p className="text-gray-600">
                    <span className="font-medium">City:</span> {user.city}, {user.state} - {user.pincode}
                  </p>
                )}
                <p className="text-gray-600">
                  <span className="font-medium">Joined:</span> {new Date(user.dateJoined).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-16">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-black mb-2">No Users Found</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first user.</p>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add First User
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
