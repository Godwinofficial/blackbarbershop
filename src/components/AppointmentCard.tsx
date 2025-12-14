import { Calendar, Clock, MapPin, Scissors, X } from 'lucide-react';
import { Appointment } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: () => void;
  onRebook?: () => void;
}

export function AppointmentCard({ appointment, onCancel, onRebook }: AppointmentCardProps) {
  const statusColors = {
    upcoming: 'bg-green-500/20 text-green-500 border-green-500/30',
    completed: 'bg-muted text-muted-foreground border-muted',
    cancelled: 'bg-destructive/20 text-destructive border-destructive/30',
  };

  return (
    <div className="glass-card rounded-xl p-4 border border-border/50">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground">{appointment.shopName}</h3>
          <p className="text-sm text-muted-foreground">with {appointment.barberName}</p>
        </div>
        <span
          className={cn(
            'text-xs font-medium px-2 py-1 rounded-full border capitalize',
            statusColors[appointment.status]
          )}
        >
          {appointment.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{appointment.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{appointment.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Scissors className="w-4 h-4" />
          <span>{appointment.services.map((s) => s.name).join(', ')}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="font-semibold text-primary text-lg">
          ZMW {appointment.totalPrice}
        </span>
        {appointment.status === 'upcoming' && onCancel && (
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
        )}
        {(appointment.status === 'completed' || appointment.status === 'cancelled') && onRebook && (
          <Button variant="outline" size="sm" onClick={onRebook}>
            Rebook
          </Button>
        )}
      </div>
    </div>
  );
}
