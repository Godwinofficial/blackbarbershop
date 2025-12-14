export interface Barber {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  rating: number;
  experience: string;
}

export interface Review {
  id: string;
  userName: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: 'haircut' | 'beard' | 'premium';
}

export interface Barbershop {
  id: string;
  name: string;
  address: string;
  distance: number;
  rating: number;
  reviewCount: number;
  images: string[];
  isOpen: boolean;
  openingHours: string;
  phone: string;
  waitTime: number;
  barbers: Barber[];
  services: Service[];
  reviews: Review[];
  specialOffers?: string[];
  coordinates: { lat: number; lng: number };
}

export interface Appointment {
  id: string;
  shopId: string;
  shopName: string;
  barberId: string;
  barberName: string;
  services: Service[];
  date: string;
  time: string;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isGuest: boolean;
  points: number;
  totalVisits: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  icon: 'scissors' | 'gift' | 'percent' | 'crown' | 'star';
  category: 'discount' | 'free-service' | 'upgrade';
}

export const rewards: Reward[] = [
  { id: 'r1', name: 'Free Line-Up', description: 'Get a free line-up with any haircut', pointsRequired: 50, icon: 'scissors', category: 'free-service' },
  { id: 'r2', name: '10% Off', description: '10% off your next booking', pointsRequired: 100, icon: 'percent', category: 'discount' },
  { id: 'r3', name: 'Free Beard Trim', description: 'Complimentary beard trim service', pointsRequired: 150, icon: 'scissors', category: 'free-service' },
  { id: 'r4', name: '20% Off', description: '20% off any service', pointsRequired: 250, icon: 'percent', category: 'discount' },
  { id: 'r5', name: 'Free Haircut', description: 'One free haircut of your choice', pointsRequired: 500, icon: 'crown', category: 'free-service' },
  { id: 'r6', name: 'VIP Treatment', description: 'Premium hot towel + scalp massage', pointsRequired: 300, icon: 'star', category: 'upgrade' },
];

export const services: Service[] = [
  { id: 's1', name: 'Classic Fade', description: 'Clean fade with precision lining', duration: 30, price: 35, category: 'haircut' },
  { id: 's2', name: 'Skin Fade', description: 'Ultra-clean skin to hair transition', duration: 40, price: 40, category: 'haircut' },
  { id: 's3', name: 'Buzz Cut', description: 'Quick and clean all-over buzz', duration: 20, price: 25, category: 'haircut' },
  { id: 's4', name: 'Taper Cut', description: 'Classic taper with natural finish', duration: 35, price: 35, category: 'haircut' },
  { id: 's5', name: 'Design Cut', description: 'Custom designs and patterns', duration: 50, price: 55, category: 'haircut' },
  { id: 's6', name: 'Line-Up', description: 'Sharp edge-up and line work', duration: 15, price: 20, category: 'haircut' },
  { id: 's7', name: 'Beard Trim', description: 'Shape and trim your beard', duration: 20, price: 20, category: 'beard' },
  { id: 's8', name: 'Beard Shape-Up', description: 'Define and sculpt your beard', duration: 25, price: 25, category: 'beard' },
  { id: 's9', name: 'Hot Towel Shave', description: 'Traditional hot towel treatment', duration: 30, price: 35, category: 'beard' },
  { id: 's10', name: 'Hot Towel Treatment', description: 'Relaxing hot towel service', duration: 15, price: 15, category: 'premium' },
  { id: 's11', name: 'Scalp Massage', description: 'Therapeutic scalp massage', duration: 20, price: 25, category: 'premium' },
  { id: 's12', name: 'Hair Coloring', description: 'Professional hair coloring', duration: 60, price: 80, category: 'premium' },
];

// Default Lusaka coordinates (City Center)
const LUSAKA_COORDS = {
  lat: -15.4167,
  lng: 28.2833
};

export const getDistanceFromCurrentLocation = (lat: number, lng: number, currentLocation?: { lat: number; lng: number }) => {
  if (!currentLocation) return 0;
  // Simple distance calculation (in km)
  const R = 6371; // Earth's radius in km
  const dLat = (lat - currentLocation.lat) * Math.PI / 180;
  const dLng = (lng - currentLocation.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(currentLocation.lat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c * 10) / 10; // Round to 1 decimal place
};

export const mockBarbershops: Barbershop[] = [
  {
    id: '1',
    name: 'Lusaka Gents Salon',
    address: 'Cairo Road, Lusaka',
    distance: 0.5,
    rating: 4.8,
    reviewCount: 245,
    images: [
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800',
    ],
    isOpen: true,
    openingHours: '8:00 AM - 8:00 PM',
    phone: '+260 97 123 4567',
    waitTime: 15,
    specialOffers: ['15% off first visit', 'Free beard trim with haircut on Tuesdays'],
    coordinates: { lat: -15.4167, lng: 28.2833 },
    barbers: [
      { id: 'b1', name: 'Marcus Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', specialty: 'Fades & Designs', rating: 4.9, experience: '8 years' },
      { id: 'b2', name: 'Derek Williams', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200', specialty: 'Classic Cuts', rating: 4.8, experience: '12 years' },
      { id: 'b3', name: 'Andre Thompson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200', specialty: 'Beard Specialist', rating: 4.7, experience: '6 years' },
    ],
    services: services,
    reviews: [
      { id: 'r1', userName: 'James K.', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100', rating: 5, comment: 'Best fade I ever got! Marcus is a true artist.', date: '2 days ago' },
      { id: 'r2', userName: 'Michael R.', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100', rating: 5, comment: 'Clean shop, professional service. Highly recommend!', date: '1 week ago' },
      { id: 'r3', userName: 'David L.', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100', rating: 4, comment: 'Great experience overall. Will be back.', date: '2 weeks ago' },
    ],
  },
  {
    id: '2',
    name: 'Ndola Elite Barbershop',
    address: 'President Avenue, Ndola',
    distance: 1.2,
    rating: 4.6,
    reviewCount: 198,
    images: [
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800',
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800',
      'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=800',
    ],
    isOpen: true,
    openingHours: '9:00 AM - 7:00 PM',
    phone: '+260 96 234 5678',
    waitTime: 20,
    specialOffers: ['Student discount with ID', 'Happy Hour: 2-4 PM'],
    coordinates: { lat: -12.9716, lng: 28.6388 },
    barbers: [
      { id: 'b4', name: 'Carlos Rivera', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200', specialty: 'Traditional Cuts', rating: 4.8, experience: '15 years' },
      { id: 'b5', name: 'Tony Martinez', avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200', specialty: 'Modern Styles', rating: 4.6, experience: '7 years' },
    ],
    services: services,
    reviews: [
      { id: 'r4', userName: 'Chris P.', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100', rating: 5, comment: 'Old school vibes with modern skills. Love it!', date: '3 days ago' },
      { id: 'r5', userName: 'Alex M.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100', rating: 4, comment: 'Great atmosphere and service.', date: '1 week ago' },
    ],
  },
  {
    id: '3',
    name: 'Kitwe Royal Cuts',
    address: 'Freedom Way, Kitwe',
    distance: 1.8,
    rating: 4.7,
    reviewCount: 312,
    images: [
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800',
      'https://images.unsplash.com/photo-1596362601603-5b81db154520?w=800',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
    ],
    isOpen: true,
    openingHours: '8:30 AM - 7:30 PM',
    phone: '+260 95 345 6789',
    waitTime: 10,
    coordinates: { lat: -12.8131, lng: 28.2139 },
    barbers: [
      { id: 'b6', name: 'Jaylen Brooks', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200', specialty: 'Creative Designs', rating: 4.9, experience: '10 years' },
      { id: 'b7', name: 'Malik Jackson', avatar: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=200', specialty: 'Precision Fades', rating: 4.8, experience: '9 years' },
      { id: 'b8', name: 'Darius King', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200', specialty: 'All-Around Expert', rating: 4.7, experience: '11 years' },
    ],
    services: services,
    reviews: [
      { id: 'r6', userName: 'Tyler H.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', rating: 5, comment: 'Jaylen did an amazing design cut. Pure talent!', date: '1 day ago' },
    ],
  },
  {
    id: '4',
    name: 'Livingstone Style Barbers',
    address: 'Mosi-oa-Tunya Road, Livingstone',
    distance: 2.5,
    rating: 4.6,
    reviewCount: 189,
    images: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800',
    ],
    isOpen: true,
    openingHours: '9:00 AM - 8:00 PM',
    phone: '+260 97 765 4321',
    waitTime: 10,
    specialOffers: ['Loyalty program: 10th cut free'],
    coordinates: { lat: -14.4309, lng: 28.4516 },
    barbers: [
      { id: 'b9', name: 'Kevin Brown', avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=200', specialty: 'Quick Cuts', rating: 4.6, experience: '5 years' },
    ],
    services: services,
    reviews: [
      { id: 'r7', userName: 'Brandon S.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', rating: 5, comment: 'Fast and efficient. Perfect for busy people.', date: '4 days ago' },
    ],
  },
  {
    id: '5',
    name: 'Kabwe Classic Cuts',
    address: 'Independence Avenue, Kabwe',
    distance: 3.2,
    rating: 4.9,
    reviewCount: 567,
    images: [
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800',
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800',
    ],
    isOpen: true,
    openingHours: '8:00 AM - 10:00 PM',
    phone: '+1 (555) 567-8901',
    waitTime: 30,
    specialOffers: ['VIP membership available', 'Complimentary drinks'],
    coordinates: { lat: -17.8536, lng: 25.8606 },
    barbers: [
      { id: 'b10', name: 'Vincent Cole', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', specialty: 'Celebrity Stylist', rating: 5.0, experience: '20 years' },
      { id: 'b11', name: 'Ray Mitchell', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200', specialty: 'Premium Services', rating: 4.9, experience: '14 years' },
      { id: 'b12', name: 'Jerome Davis', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200', specialty: 'Luxury Grooming', rating: 4.8, experience: '12 years' },
    ],
    services: services,
    reviews: [
      { id: 'r8', userName: 'Marcus W.', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100', rating: 5, comment: 'The VIP experience is worth every penny. Top tier!', date: '2 days ago' },
      { id: 'r9', userName: 'Jordan T.', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100', rating: 5, comment: 'Best barbershop in the city. Period.', date: '5 days ago' },
    ],
  },
];

export const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM'
];
