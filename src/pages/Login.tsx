import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scissors, Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

// Add mobile detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

export default function Login() {
  const navigate = useNavigate();
  const { login, register, continueAsGuest } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-focus first input on mobile for better UX
  useEffect(() => {
    if (isMobile && !isLogin) {
      const nameInput = document.getElementById('name');
      if (nameInput) nameInput.focus();
    } else if (isMobile) {
      const emailInput = document.getElementById('email');
      if (emailInput) emailInput.focus();
    }
  }, [isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      if (isLogin) {
        const success = login(formData.email, formData.password);
        if (success) {
          // Navigate after a short delay to allow the toast to show
          setTimeout(() => navigate('/home'), isMobile ? 500 : 0);
        }
      } else {
        const success = register(formData.name, formData.email, formData.password, formData.phone);
        if (success) {
          setTimeout(() => navigate('/home'), isMobile ? 500 : 0);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuest = () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      continueAsGuest();
      // Add a small delay on mobile to ensure the guest user is set
      setTimeout(() => {
        navigate('/home');
      }, isMobile ? 500 : 0);
    } catch (error) {
      console.error('Guest login error:', error);
      toast.error('Failed to continue as guest');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10 animate-fade-in">
          <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mb-4 neon-glow">
            <Scissors className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="font-display text-4xl tracking-wider gradient-text">BLACK APP</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-12 h-14 bg-card border-border text-foreground placeholder:text-muted-foreground"
                required={!isLogin}
                inputMode="text"
                autoComplete="name"
                autoCapitalize="words"
                disabled={isSubmitting}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-12 h-14 bg-card border-border text-foreground placeholder:text-muted-foreground"
              required
              inputMode="email"
              autoComplete="email"
              autoCapitalize="off"
              disabled={isSubmitting}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pl-12 pr-12 h-14 bg-card border-border text-foreground placeholder:text-muted-foreground"
              required
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
              disabled={isSubmitting}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {!isLogin && (
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="pl-12 h-14 bg-card border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          )}

          <Button
            type="submit"
            className={`w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin mr-2"></div>
                {isLogin ? 'Signing In...' : 'Creating Account...'}
              </div>
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </form>

        {/* Toggle */}
        <p className="text-center text-muted-foreground text-sm mt-6">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => !isSubmitting && setIsLogin(!isLogin)}
            className={`text-primary hover:underline font-medium ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-sm">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Guest button */}
        <Button
          type="button"
          variant="outline"
          className={`w-full h-14 bg-transparent border-2 border-border hover:bg-accent/20 text-foreground text-base font-medium rounded-xl transition-all duration-200 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          onClick={handleGuest}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Continuing as Guest...' : 'Continue as Guest'}
        </Button>
      </div>
    </div>
  );
}
