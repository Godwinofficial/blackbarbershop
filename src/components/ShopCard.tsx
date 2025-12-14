import { Star, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Barbershop } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface ShopCardProps {
  shop: Barbershop;
  index?: number;
}

export function ShopCard({ shop, index = 0 }: ShopCardProps) {
  return (
    <Link
      to={`/shop/${shop.id}`}
      className="block animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="glass-card rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:urban-shadow">
        <div className="relative h-40">
          <img
            src={shop.images[0]}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          {shop.specialOffers && shop.specialOffers.length > 0 && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
              {shop.specialOffers[0]}
            </div>
          )}
          <div
            className={cn(
              'absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full',
              shop.isOpen
                ? 'bg-green-500/90 text-white'
                : 'bg-muted text-muted-foreground'
            )}
          >
            {shop.isOpen ? 'Open' : 'Closed'}
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg text-foreground">{shop.name}</h3>
            <div className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">{shop.rating}</span>
              <span className="text-xs text-muted-foreground">({shop.reviewCount})</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>{shop.address}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Clock className="w-4 h-4" />
              <span>{shop.openingHours}</span>
            </div>
            <span className="text-primary font-medium text-sm">
              {shop.distance} mi away
            </span>
          </div>
          {shop.isOpen && shop.waitTime > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-muted-foreground">
                ~{shop.waitTime} min wait
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
