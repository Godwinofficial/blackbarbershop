import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, Check, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppointments } from '@/hooks/useAppointments';
import { useRewards } from '@/hooks/useRewards';
import { Service } from '@/data/mockData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { createAppointment } = useAppointments();
  const { addPoints, incrementVisits, getPointsForBooking } = useRewards();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const bookingData = location.state as {
    shopId: string;
    shopName: string;
    barber: { id: string; name: string };
    services: { id: string; name: string; price: number; duration: number; description: string; category: string }[];
    date: string;
    time: string;
    notes?: string;
    totalPrice: number;
  };

  if (!bookingData) {
    navigate('/home');
    return null;
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create appointment
    createAppointment(
      bookingData.shopId,
      bookingData.shopName,
      bookingData.barber.id,
      bookingData.barber.name,
      bookingData.services as Service[],
      bookingData.date,
      bookingData.time,
      bookingData.notes
    );

    // Award points
    const pointsEarned = getPointsForBooking(bookingData.totalPrice);
    addPoints(pointsEarned);
    incrementVisits();
    setEarnedPoints(pointsEarned);

    setIsProcessing(false);
    setIsComplete(true);

    toast.success('Payment successful! Your appointment is confirmed.');
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="animate-scale-in">
          <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-6 mx-auto neon-glow">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground text-center mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground text-center mb-8">
            Your appointment has been successfully booked.
          </p>

          <div className="glass-card rounded-xl p-4 mb-8 w-full max-w-sm">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shop</span>
                <span className="font-medium">{bookingData.shopName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Barber</span>
                <span className="font-medium">{bookingData.barber.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">
                  {new Date(bookingData.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium">{bookingData.time}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border">
                <span className="font-medium">Total Paid</span>
                <span className="font-bold text-primary">ZMW {bookingData.totalPrice}</span>
              </div>
              {earnedPoints > 0 && (
                <div className="flex items-center justify-between pt-3 border-t border-border bg-primary/10 -mx-4 -mb-4 px-4 py-3 rounded-b-xl">
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-primary" />
                    <span className="font-medium text-primary">Points Earned</span>
                  </div>
                  <span className="font-bold text-primary">+{earnedPoints} pts</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3 w-full max-w-sm">
            <Button
              className="w-full h-14 gradient-primary text-lg font-semibold"
              onClick={() => navigate('/appointments')}
            >
              View My Appointments
            </Button>
            <Button
              variant="outline"
              className="w-full h-14 text-lg"
              onClick={() => navigate('/home')}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border px-4 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Payment</h1>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Order summary */}
        <div className="glass-card rounded-xl p-4 mb-6">
          <h2 className="font-semibold text-foreground mb-3">Order Summary</h2>
          <div className="space-y-2">
            {bookingData.services.map((service) => (
              <div key={service.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{service.name}</span>
                <span>ZMW {service.price}</span>
              </div>
            ))}
            <div className="flex justify-between pt-3 border-t border-border">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-primary text-xl">ZMW {bookingData.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Card form */}
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Card Details</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Cardholder Name</label>
              <Input
                placeholder="John Doe"
                value={cardData.name}
                onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                className="h-12 bg-background border-border"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Card Number</label>
              <Input
                placeholder="1234 5678 9012 3456"
                value={cardData.number}
                onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                maxLength={19}
                className="h-12 bg-background border-border"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm text-muted-foreground mb-1 block">Expiry</label>
                <Input
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                  maxLength={5}
                  className="h-12 bg-background border-border"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-muted-foreground mb-1 block">CVV</label>
                <Input
                  placeholder="123"
                  type="password"
                  value={cardData.cvv}
                  onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                  maxLength={4}
                  className="h-12 bg-background border-border"
                />
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
            <Lock className="w-3 h-3" />
            This is a demo. No real payment will be processed.
          </p>
        </div>
      </div>

      {/* Pay button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 glass-card border-t border-border/50 safe-bottom">
        <Button
          className={cn(
            'w-full h-14 text-lg font-semibold',
            isProcessing ? 'bg-muted' : 'gradient-primary neon-glow'
          )}
          onClick={handlePayment}
          disabled={isProcessing || !cardData.name || !cardData.number || !cardData.expiry || !cardData.cvv}
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
              Processing...
            </div>
          ) : (
            `Pay ZMW ${bookingData.totalPrice}`
          )}
        </Button>
      </div>
    </div>
  );
}
