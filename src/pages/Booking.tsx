import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Calendar, Clock, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ServiceCard } from '@/components/ServiceCard';
import { BarberCard } from '@/components/BarberCard';
import { mockBarbershops, timeSlots, Service, Barber } from '@/data/mockData';
import { cn } from '@/lib/utils';

type Step = 'services' | 'barber' | 'datetime' | 'confirm';

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('services');
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');

  const shop = mockBarbershops.find((s) => s.id === id);

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Shop not found</p>
      </div>
    );
  }

  const steps: { id: Step; label: string }[] = [
    { id: 'services', label: 'Services' },
    { id: 'barber', label: 'Barber' },
    { id: 'datetime', label: 'Date & Time' },
    { id: 'confirm', label: 'Confirm' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);

  const toggleService = (service: Service) => {
    setSelectedServices((prev) =>
      prev.find((s) => s.id === service.id)
        ? prev.filter((s) => s.id !== service.id)
        : [...prev, service]
    );
  };

  const canProceed = () => {
    switch (step) {
      case 'services':
        return selectedServices.length > 0;
      case 'barber':
        return selectedBarber !== null;
      case 'datetime':
        return selectedDate && selectedTime;
      case 'confirm':
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step === 'confirm') {
      navigate('/payment', {
        state: {
          shopId: shop.id,
          shopName: shop.name,
          barber: selectedBarber,
          services: selectedServices,
          date: selectedDate,
          time: selectedTime,
          notes,
          totalPrice,
        },
      });
    } else {
      const nextIndex = currentStepIndex + 1;
      if (nextIndex < steps.length) {
        setStep(steps[nextIndex].id);
      }
    }
  };

  const handleBack = () => {
    if (currentStepIndex === 0) {
      navigate(-1);
    } else {
      setStep(steps[currentStepIndex - 1].id);
    }
  };

  // Generate next 7 days
  const dates = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      value: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
    };
  });

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-card border-b border-border/50 px-4 py-4">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Book Appointment</h1>
            <p className="text-sm text-muted-foreground">{shop.name}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                  i <= currentStepIndex
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                )}
              >
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-2 rounded',
                    i < currentStepIndex ? 'bg-primary' : 'bg-secondary'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {step === 'services' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground mb-4">Select Services</h2>
            <div className="space-y-3">
              {shop.services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isSelected={selectedServices.some((s) => s.id === service.id)}
                  onToggle={() => toggleService(service)}
                />
              ))}
            </div>
          </div>
        )}

        {step === 'barber' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground mb-4">Choose Your Barber</h2>
            <div className="space-y-3">
              {/* First available option */}
              <button
                onClick={() => setSelectedBarber({ id: 'any', name: 'First Available', avatar: '', specialty: 'Any barber', rating: 0, experience: '' } as Barber)}
                className={cn(
                  'w-full flex items-center gap-4 p-4 rounded-xl border transition-all',
                  selectedBarber?.id === 'any'
                    ? 'border-primary bg-primary/10 urban-shadow'
                    : 'border-border bg-card hover:border-primary/50'
                )}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-foreground">First Available</h4>
                  <p className="text-sm text-muted-foreground">Get the next available barber</p>
                </div>
              </button>

              {shop.barbers.map((barber) => (
                <BarberCard
                  key={barber.id}
                  barber={barber}
                  isSelected={selectedBarber?.id === barber.id}
                  onSelect={() => setSelectedBarber(barber)}
                />
              ))}
            </div>
          </div>
        )}

        {step === 'datetime' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground mb-4">Select Date & Time</h2>

            {/* Date picker */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-medium">Date</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {dates.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setSelectedDate(d.value)}
                    className={cn(
                      'flex flex-col items-center p-3 rounded-xl min-w-[70px] transition-all',
                      selectedDate === d.value
                        ? 'bg-primary text-primary-foreground urban-shadow'
                        : 'bg-card border border-border hover:border-primary/50'
                    )}
                  >
                    <span className="text-xs opacity-80">{d.day}</span>
                    <span className="text-xl font-bold">{d.date}</span>
                    <span className="text-xs opacity-80">{d.month}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time picker */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-medium">Time</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      'py-3 px-2 rounded-lg text-sm font-medium transition-all',
                      selectedTime === time
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border hover:border-primary/50'
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground mb-4">Confirm Booking</h2>

            <div className="glass-card rounded-xl p-4 mb-4">
              <h3 className="font-medium text-foreground mb-3">Booking Summary</h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Barber</p>
                    <p className="font-medium">{selectedBarber?.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-medium">
                      {new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}{' '}
                      at {selectedTime}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Services</p>
                  {selectedServices.map((service) => (
                    <div key={service.id} className="flex justify-between py-1">
                      <span>{service.name}</span>
                      <span className="text-primary">ZMW {service.price}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-border flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span>{totalDuration} min</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <span className="font-medium">Special Requests (Optional)</span>
              </div>
              <Textarea
                placeholder="Any special requests or notes for your barber..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-card border-border resize-none"
                rows={3}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 glass-card border-t border-border/50 safe-bottom">
        {selectedServices.length > 0 && (
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground">
                {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} • {totalDuration} min
              </p>
              <p className="text-xl font-bold text-primary">ZMW {totalPrice}</p>
            </div>
          </div>
        )}
        <Button
          className="w-full h-14 gradient-primary text-lg font-semibold neon-glow"
          onClick={handleNext}
          disabled={!canProceed()}
        >
          {step === 'confirm' ? 'Proceed to Payment' : 'Continue'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
