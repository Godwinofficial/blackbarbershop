import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { AppointmentCard } from '@/components/AppointmentCard';
import { useAppointments } from '@/hooks/useAppointments';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

export default function Appointments() {
  const navigate = useNavigate();
  const { getUpcomingAppointments, getPastAppointments, cancelAppointment } = useAppointments();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(null);

  const upcomingAppointments = getUpcomingAppointments();
  const pastAppointments = getPastAppointments();

  const handleCancelClick = (appointmentId: string) => {
    setAppointmentToCancel(appointmentId);
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (appointmentToCancel) {
      cancelAppointment(appointmentToCancel);
      toast.success('Appointment cancelled');
    }
    setCancelDialogOpen(false);
    setAppointmentToCancel(null);
  };

  const handleRebook = (shopId: string) => {
    navigate(`/book/${shopId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-card border-b border-border/50 px-4 py-4">
        <h1 className="text-xl font-semibold text-foreground mb-4">My Appointments</h1>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={cn(
              'flex-1 py-3 rounded-xl text-sm font-medium transition-all',
              activeTab === 'upcoming'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground'
            )}
          >
            Upcoming ({upcomingAppointments.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={cn(
              'flex-1 py-3 rounded-xl text-sm font-medium transition-all',
              activeTab === 'past'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground'
            )}
          >
            Past ({pastAppointments.length})
          </button>
        </div>
      </div>

      <div className="px-4 py-6">
        {activeTab === 'upcoming' && (
          <div className="space-y-4 animate-fade-in">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onCancel={() => handleCancelClick(appointment.id)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No upcoming appointments</h3>
                <p className="text-muted-foreground mb-6">Book your next haircut today!</p>
                <button
                  onClick={() => navigate('/home')}
                  className="inline-flex items-center gap-2 text-primary font-medium"
                >
                  Find a barbershop
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'past' && (
          <div className="space-y-4 animate-fade-in">
            {pastAppointments.length > 0 ? (
              pastAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onRebook={() => handleRebook(appointment.shopId)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No past appointments</h3>
                <p className="text-muted-foreground">Your appointment history will appear here.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cancel confirmation dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border">Keep Appointment</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmCancel}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Cancel Appointment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <BottomNav />
    </div>
  );
}
