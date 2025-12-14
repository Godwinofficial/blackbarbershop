import { Star, Check } from 'lucide-react';
import { Barber } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface BarberCardProps {
  barber: Barber;
  isSelected: boolean;
  onSelect: () => void;
}

export function BarberCard({ barber, isSelected, onSelect }: BarberCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 w-full',
        isSelected
          ? 'border-primary bg-primary/10 urban-shadow'
          : 'border-border bg-card hover:border-primary/50'
      )}
    >
      <div className="relative">
        <img
          src={barber.avatar}
          alt={barber.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        {isSelected && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <Check className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
      </div>
      <div className="flex-1 text-left">
        <h4 className="font-medium text-foreground">{barber.name}</h4>
        <p className="text-sm text-muted-foreground">{barber.specialty}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-medium">{barber.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">• {barber.experience}</span>
        </div>
      </div>
    </button>
  );
}
