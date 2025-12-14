import { useState } from 'react';
import { MapPin, Search, Bell, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShopCard } from '@/components/ShopCard';
import { BottomNav } from '@/components/BottomNav';
import { mockBarbershops } from '@/data/mockData';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Lusaka, ZM');

  const filteredShops = mockBarbershops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <h1 className="text-xl font-semibold text-foreground">{user?.name || 'Guest'}</h1>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </Button>
        </div>

        {/* Location */}
        <button className="flex items-center gap-2 text-sm mb-4 hover:text-primary transition-colors">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-foreground font-medium">{location}</span>
          <span className="text-muted-foreground">• Current Location</span>
        </button>

        {/* Search */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search barbershops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-card border-border"
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12 border-border">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="relative h-48 bg-secondary/50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
            <p className="text-muted-foreground">Map View</p>
            <p className="text-xs text-muted-foreground">{filteredShops.length} shops nearby</p>
          </div>
        </div>
        {/* Decorative dots for shops */}
        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-accent rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-primary rounded-full animate-pulse" />
      </div>

      {/* Shop list */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Nearby Barbershops</h2>
          <span className="text-sm text-muted-foreground">{filteredShops.length} found</span>
        </div>

        <div className="space-y-4">
          {filteredShops.map((shop, index) => (
            <ShopCard key={shop.id} shop={shop} index={index} />
          ))}
        </div>

        {filteredShops.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No barbershops found</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
