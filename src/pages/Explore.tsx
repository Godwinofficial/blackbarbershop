import { useState } from 'react';
import { Search, MapPin, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShopCard } from '@/components/ShopCard';
import { BottomNav } from '@/components/BottomNav';
import { mockBarbershops } from '@/data/mockData';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';

const categories = ['All', 'Top Rated', 'Open Now', 'Nearby', 'Premium'];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [maxDistance, setMaxDistance] = useState([5]);
  const [minRating, setMinRating] = useState([4]);

  const filteredShops = mockBarbershops.filter((shop) => {
    const matchesSearch =
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDistance = shop.distance <= maxDistance[0];
    const matchesRating = shop.rating >= minRating[0];

    let matchesCategory = true;
    switch (activeCategory) {
      case 'Top Rated':
        matchesCategory = shop.rating >= 4.8;
        break;
      case 'Open Now':
        matchesCategory = shop.isOpen;
        break;
      case 'Nearby':
        matchesCategory = shop.distance <= 1;
        break;
      case 'Premium':
        matchesCategory = shop.rating >= 4.9;
        break;
    }

    return matchesSearch && matchesDistance && matchesRating && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-card border-b border-border/50 px-4 py-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12 bg-card border-border"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-12 w-12 border-border">
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-card border-border">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-8">
                <div>
                  <label className="text-sm font-medium mb-4 block">
                    Maximum Distance: {maxDistance[0]} miles
                  </label>
                  <Slider
                    value={maxDistance}
                    onValueChange={setMaxDistance}
                    min={0.5}
                    max={10}
                    step={0.5}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-4 block">
                    Minimum Rating: {minRating[0]} stars
                  </label>
                  <Slider
                    value={minRating}
                    onValueChange={setMinRating}
                    min={1}
                    max={5}
                    step={0.5}
                    className="w-full"
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap',
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            {activeCategory === 'All' ? 'All Barbershops' : activeCategory}
          </h2>
          <span className="text-sm text-muted-foreground">{filteredShops.length} found</span>
        </div>

        <div className="space-y-4">
          {filteredShops.map((shop, index) => (
            <ShopCard key={shop.id} shop={shop} index={index} />
          ))}
        </div>

        {filteredShops.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No shops found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
