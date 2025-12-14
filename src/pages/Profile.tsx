import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, CreditCard, Heart, Bell, HelpCircle, LogOut, ChevronRight, Edit2, Gift, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { BottomNav } from '@/components/BottomNav';
import { useAuth } from '@/hooks/useAuth';
import { useRewards } from '@/hooks/useRewards';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateUser, isGuest } = useAuth();
  const { points, totalVisits, getCurrentTier } = useRewards();
  const tier = getCurrentTier();
  const [isEditing, setIsEditing] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [notifications, setNotifications] = useState({
    appointments: true,
    promotions: false,
    reminders: true,
  });

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const menuItems = [
    { icon: Gift, label: 'My Rewards', path: '/rewards', highlight: true },
    { icon: Heart, label: 'Favorite Shops', path: '/favorites' },
    { icon: CreditCard, label: 'Payment Methods', path: '/payment-methods' },
    { icon: HelpCircle, label: 'Help & Support', path: '/support' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-primary px-4 pt-8 pb-16">
        <h1 className="text-xl font-semibold text-primary-foreground mb-6">My Profile</h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-background/20 flex items-center justify-center">
              <User className="w-10 h-10 text-primary-foreground" />
            </div>
            {!isGuest && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-background flex items-center justify-center"
              >
                <Edit2 className="w-4 h-4 text-primary" />
              </button>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary-foreground">{user?.name || 'Guest'}</h2>
            <p className="text-primary-foreground/80 text-sm">{user?.email || 'No email'}</p>
            {isGuest && (
              <button
                onClick={() => navigate('/login')}
                className="text-sm text-primary-foreground underline mt-1"
              >
                Create an account
              </button>
            )}
          </div>
        </div>

        {/* Points Summary */}
        <div className="mt-4 flex items-center gap-4 bg-white/10 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-300" />
            <div>
              <p className="text-xs text-primary-foreground/70">Points</p>
              <p className="font-bold text-primary-foreground">{points}</p>
            </div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <p className="text-xs text-primary-foreground/70">Tier</p>
            <p className="font-bold text-primary-foreground">{tier.name}</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <p className="text-xs text-primary-foreground/70">Visits</p>
            <p className="font-bold text-primary-foreground">{totalVisits}</p>
          </div>
        </div>
      </div>

      {/* Profile card */}
      <div className="px-4 -mt-8">
        <div className="glass-card rounded-xl p-4 mb-4">
          {isEditing ? (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 bg-background border-border"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 bg-background border-border"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Phone</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-12 bg-background border-border"
                />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 gradient-primary" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{user?.name || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.email || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{user?.phone || 'Not set'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="glass-card rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Appointment reminders</span>
              <Switch
                checked={notifications.reminders}
                onCheckedChange={(checked) => setNotifications({ ...notifications, reminders: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Booking confirmations</span>
              <Switch
                checked={notifications.appointments}
                onCheckedChange={(checked) => setNotifications({ ...notifications, appointments: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Promotions & offers</span>
              <Switch
                checked={notifications.promotions}
                onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
              />
            </div>
          </div>
        </div>

        {/* Menu items */}
        <div className="glass-card rounded-xl overflow-hidden mb-4">
          {menuItems.map((item, index) => (
            <button
              key={item.path}
              onClick={() => item.path === '/rewards' ? navigate('/rewards') : toast.info('Feature coming soon!')}
              className={cn(
                'w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors',
                index < menuItems.length - 1 && 'border-b border-border'
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn('w-5 h-5', item.highlight ? 'text-accent' : 'text-primary')} />
                <span className="font-medium">{item.label}</span>
                {item.highlight && points > 0 && (
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                    {points} pts
                  </span>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full h-14 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={() => setLogoutDialogOpen(true)}
        >
          <LogOut className="w-5 h-5 mr-2" />
          {isGuest ? 'Exit Guest Mode' : 'Log Out'}
        </Button>
      </div>

      {/* Logout confirmation */}
      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>{isGuest ? 'Exit Guest Mode?' : 'Log Out?'}</AlertDialogTitle>
            <AlertDialogDescription>
              {isGuest
                ? 'Your guest session data will be lost. Are you sure you want to exit?'
                : 'Are you sure you want to log out of your account?'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isGuest ? 'Exit' : 'Log Out'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <BottomNav />
    </div>
  );
}
