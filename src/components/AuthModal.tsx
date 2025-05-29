
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

interface AuthModalProps {
  mode?: 'login' | 'signup';
  isOpen?: boolean;
  onClose: () => void;
  onSuccess: (userData: any) => void;
  onAuthSuccess?: (user: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  mode = 'login', 
  isOpen = true, 
  onClose, 
  onSuccess, 
  onAuthSuccess 
}) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [isLoading, setIsLoading] = useState(false);

  // Demo authentication - allows login with any credentials (as requested)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Allow login with any credentials
      const user = {
        id: '1',
        name: loginData.email.split('@')[0] || 'User',
        email: loginData.email || 'user@akgohi.com',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${loginData.email}`
      };
      
      localStorage.setItem('akgohi_user', JSON.stringify(user));
      
      // Call both success handlers for backward compatibility
      onSuccess(user);
      if (onAuthSuccess) onAuthSuccess(user);
      
      onClose();
      setIsLoading(false);
      
      toast({
        title: "Welcome to AKGOHI!",
        description: `Hello ${user.name}, you're successfully logged in.`,
      });
    }, 1000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      const user = {
        id: Date.now().toString(),
        name: registerData.name,
        email: registerData.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${registerData.email}`
      };
      
      localStorage.setItem('akgohi_user', JSON.stringify(user));
      
      // Call both success handlers for backward compatibility
      onSuccess(user);
      if (onAuthSuccess) onAuthSuccess(user);
      
      onClose();
      setIsLoading(false);
      
      toast({
        title: "Account Created!",
        description: `Welcome to AKGOHI, ${user.name}! Your account has been created successfully.`,
      });
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-900/95 to-purple-900/95 border border-white/20 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gradient">
            Welcome to AKGOHI
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={mode} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/30">
            <TabsTrigger value="login" className="data-[state=active]:bg-purple-500">Login</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-purple-500">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-email" className="text-white">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Enter any email (demo mode)"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder-white/60"
                  required
                />
              </div>
              <div>
                <Label htmlFor="login-password" className="text-white">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Enter any password (demo mode)"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder-white/60"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
            <p className="text-xs text-white/60 text-center">
              Demo Mode: Any email/password combination will work
            </p>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="register-name" className="text-white">Full Name</Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Your full name"
                  value={registerData.name}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder-white/60"
                  required
                />
              </div>
              <div>
                <Label htmlFor="register-email" className="text-white">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder-white/60"
                  required
                />
              </div>
              <div>
                <Label htmlFor="register-password" className="text-white">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="Create a password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder-white/60"
                  required
                />
              </div>
              <div>
                <Label htmlFor="register-confirm" className="text-white">Confirm Password</Label>
                <Input
                  id="register-confirm"
                  type="password"
                  placeholder="Confirm your password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder-white/60"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="text-center pt-4 border-t border-white/10">
          <p className="text-xs text-white/60">
            Developed by <span className="text-purple-400 font-semibold">Akhila Reddy</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
