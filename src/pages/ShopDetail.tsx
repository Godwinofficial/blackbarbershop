import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Phone, Share2, Heart, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockBarbershops } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function ShopDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'services' | 'barbers' | 'reviews'>('services');
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const shop = mockBarbershops.find((s) => s.id === id);

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Shop not found</p>
      </div>
    );
  }

  const tabs = [
    { id: 'services' as const, label: 'Services' },
    { id: 'barbers' as const, label: 'Barbers' },
    { id: 'reviews' as const, label: 'Reviews' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header with images */}
      <div className="relative h-72">
        <img
          src={shop.images[activeImage]}
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />

        {/* Top buttons */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/50 backdrop-blur-sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-background/50 backdrop-blur-sm"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={cn('w-5 h-5', isFavorite && 'fill-primary text-primary')} />
            </Button>
            <Button variant="ghost" size="icon" className="bg-background/50 backdrop-blur-sm">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Image dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {shop.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                idx === activeImage ? 'bg-primary w-6' : 'bg-foreground/50'
              )}
            />
          ))}
        </div>
      </div>

      {/* Shop info */}
      <div className="px-4 -mt-8 relative z-10">
        <div className="glass-card rounded-xl p-4 mb-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{shop.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{shop.rating}</span>
                </div>
                <span className="text-muted-foreground">({shop.reviewCount} reviews)</span>
              </div>
            </div>
            <div
              className={cn(
                'px-3 py-1 rounded-full text-sm font-medium',
                shop.isOpen ? 'bg-green-500/20 text-green-500' : 'bg-muted text-muted-foreground'
              )}
            >
              {shop.isOpen ? 'Open' : 'Closed'}
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{shop.address}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{shop.openingHours}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>{shop.phone}</span>
            </div>
          </div>

          {shop.specialOffers && shop.specialOffers.length > 0 && (
            <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/30">
              <p className="text-sm font-medium text-primary">🎉 {shop.specialOffers.join(' • ')}</p>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'services' && (
          <div className="space-y-3">
            {['haircut', 'beard', 'premium'].map((category) => (
              <div key={category} className="glass-card rounded-xl p-4">
                <h3 className="font-semibold text-foreground capitalize mb-3">{category} Services</h3>
                <div className="space-y-3">
                  {shop.services
                    .filter((s) => s.category === category)
                    .map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between py-2 border-b border-border last:border-0"
                      >
                        <div>
                          <p className="font-medium text-foreground">{service.name}</p>
                          <p className="text-sm text-muted-foreground">{service.duration} min</p>
                        </div>
                        <span className="font-semibold text-primary">ZMW {service.price}</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'barbers' && (
          <div className="space-y-3">
            {shop.barbers.map((barber) => (
              <div key={barber.id} className="glass-card rounded-xl p-4 flex items-center gap-4">
                <img
                  src={barber.avatar}
                  alt={barber.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{barber.name}</h4>
                  <p className="text-sm text-muted-foreground">{barber.specialty}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm">{barber.rating}</span>
                    <span className="text-xs text-muted-foreground">• {barber.experience}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-3">
            {shop.reviews.map((review) => (
              <div key={review.id} className="glass-card rounded-xl p-4">
                <div className="flex items-start gap-3 mb-2">
                  <img
                    src={review.avatar}
                    alt={review.userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">{review.userName}</h4>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'w-3 h-3',
                            i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Book button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 glass-card border-t border-border/50 safe-bottom">
        <Button
          className="w-full h-14 gradient-primary text-lg font-semibold neon-glow"
          onClick={() => navigate(`/book/${shop.id}`)}
          disabled={!shop.isOpen}
        >
          {shop.isOpen ? 'Book Appointment' : 'Currently Closed'}
        </Button>
      </div>
    </div>
  );
}
