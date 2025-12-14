import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scissors } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Splash() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate('/home');
      } else {
        navigate('/login');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Logo */}
      <div className="relative z-10 animate-scale-in">
        <div className="w-32 h-32 rounded-3xl gradient-primary flex items-center justify-center neon-glow mb-8">
          <Scissors className="w-16 h-16 text-primary-foreground" />
        </div>
      </div>

      {/* Brand name */}
      <h1 className="font-display text-6xl tracking-wider gradient-text animate-fade-in relative z-10">
        BLACK APP
      </h1>
      <p className="text-muted-foreground mt-4 animate-fade-in text-lg" style={{ animationDelay: '200ms' }}>
        Find Your Perfect Cut
      </p>

      {/* Loading indicator */}
      <div className="absolute bottom-20 flex gap-2 animate-fade-in" style={{ animationDelay: '500ms' }}>
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}
