import { useLocalStorage } from './useLocalStorage';
import { Appointment, Service } from '@/data/mockData';

export function useAppointments() {
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>('black-app-appointments', []);

  const createAppointment = (
    shopId: string,
    shopName: string,
    barberId: string,
    barberName: string,
    services: Service[],
    date: string,
    time: string,
    notes?: string
  ): Appointment => {
    const totalPrice = services.reduce((sum, s) => sum + s.price, 0);
    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      shopId,
      shopName,
      barberId,
      barberName,
      services,
      date,
      time,
      totalPrice,
      status: 'upcoming',
      notes,
      createdAt: new Date().toISOString(),
    };
    setAppointments([...appointments, newAppointment]);
    return newAppointment;
  };

  const cancelAppointment = (appointmentId: string) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: 'cancelled' as const } : apt
      )
    );
  };

  const getUpcomingAppointments = () => {
    return appointments.filter((apt) => apt.status === 'upcoming');
  };

  const getPastAppointments = () => {
    return appointments.filter((apt) => apt.status === 'completed' || apt.status === 'cancelled');
  };

  return {
    appointments,
    createAppointment,
    cancelAppointment,
    getUpcomingAppointments,
    getPastAppointments,
  };
}
