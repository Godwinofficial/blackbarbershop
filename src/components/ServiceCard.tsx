import { Check, Scissors, Sparkles } from 'lucide-react';
import { Service } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onToggle: () => void;
}

export function ServiceCard({ service, isSelected, onToggle }: ServiceCardProps) {
  const getCategoryIcon = () => {
    switch (service.category) {
      case 'haircut':
        return <Scissors className="w-5 h-5" />;
      case 'beard':
        return <Sparkles className="w-5 h-5" />;
      case 'premium':
        return <Sparkles className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <button
      onClick={onToggle}
      className={cn(
        'w-full p-4 rounded-xl border transition-all duration-200 text-left',
        isSelected
          ? 'border-primary bg-primary/10 urban-shadow'
          : 'border-border bg-card hover:border-primary/50'
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'p-2 rounded-lg',
              isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'
            )}
          >
            {getCategoryIcon()}
          </div>
          <div>
            <h4 className="font-medium text-foreground">{service.name}</h4>
            <p className="text-sm text-muted-foreground mt-0.5">{service.description}</p>
            <p className="text-xs text-muted-foreground mt-1">{service.duration} min</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-semibold text-primary">ZMW {service.price}</span>
          <div
            className={cn(
              'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
              isSelected
                ? 'bg-primary border-primary'
                : 'border-muted-foreground'
            )}
          >
            {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
          </div>
        </div>
      </div>
    </button>
  );
}
