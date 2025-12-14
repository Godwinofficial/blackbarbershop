import { useLocalStorage } from './useLocalStorage';
import { User } from '@/data/mockData';
import { toast } from 'sonner';

export function useAuth() {
  const [user, setUser] = useLocalStorage<User | null>('black-app-user', null);

  // Check if running in a mobile browser
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const login = (email: string, password: string): boolean => {
    try {
      // Basic validation
      if (!email || !password) {
        toast.error('Please enter both email and password');
        return false;
      }

      // Mock login - in real app, validate against backend
      const mockUser: User = {
        id: `user_${Date.now()}`,
        name: email.split('@')[0],
        email,
        phone: '',
        isGuest: false,
        points: 0,
        totalVisits: 0,
      };
      
      // Force a small delay to simulate network request
      setTimeout(() => {
        setUser(mockUser);
        toast.success('Login successful!');
      }, isMobile ? 300 : 0); // Add slight delay on mobile for better UX
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please try again.');
      return false;
    }
  };

  const register = (name: string, email: string, password: string, phone: string): boolean => {
    try {
      if (!name || !email || !password) {
        toast.error('Please fill in all required fields');
        return false;
      }

      const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email,
        phone,
        isGuest: false,
        points: 0,
        totalVisits: 0,
      };
      
      // Simulate network request
      setTimeout(() => {
        setUser(newUser);
        toast.success('Registration successful!');
      }, isMobile ? 300 : 0);
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
      return false;
    }
  };

  const continueAsGuest = () => {
    try {
      const guestUser: User = {
        id: `guest_${Date.now()}`,
        name: 'Guest',
        email: '',
        phone: '',
        isGuest: true,
        points: 0,
        totalVisits: 0,
      };
      
      // Ensure we're in a client-side context
      if (typeof window !== 'undefined') {
        // Add a small delay on mobile for better UX
        setTimeout(() => {
          setUser(guestUser);
          toast.success('Welcome, Guest!');
        }, isMobile ? 300 : 0);
      }
    } catch (error) {
      console.error('Guest login error:', error);
      toast.error('Failed to continue as guest. Please try again.');
    }
  };

  const logout = () => {
    try {
      setUser(null);
      toast('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = (updates: Partial<User>) => {
    try {
      if (user) {
        setUser({ ...user, ...updates });
      }
    } catch (error) {
      console.error('Update user error:', error);
      toast.error('Failed to update profile');
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isGuest: user?.isGuest ?? false,
    login,
    register,
    continueAsGuest,
    logout,
    updateUser,
  };
}
