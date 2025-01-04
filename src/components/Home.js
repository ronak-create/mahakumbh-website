import React from 'react';
import { Hero } from '../components/Hero';
import { Introduction } from '../components/landing/Introduction';
import { Countdown } from '../components/Countdown';
import { EventsList } from '../components/events/EventsList';
import { PackageCard } from '../components/PackageCard';
import { TestimonialsList } from '../components/testimonials/TestimonialsList';
import { AuthProvider } from '../context/AuthContext';

const featuredPackages = [
  {
    id: '1',
    title: 'Royal Kumbh Experience',
    type: 'Luxury',
    price: 75000,
    duration: '5 Days 4 Nights',
    description: 'Experience Mahakumbh in ultimate luxury with premium accommodations.',
    features: [
      'Luxury tent accommodation',
      'Private bathroom',
      'Gourmet meals',
      'Personal guide',
      'VIP access to ceremonies'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    title: 'Spiritual Sojourn',
    type: 'Standard',
    price: 25000,
    duration: '3 Days 2 Nights',
    description: 'A spiritual retreat at the divine confluence with basic amenities.',
    features: [
      'Shared tent accommodation',
      'Shared bathroom facilities',
      'Daily vegetarian meals',
      'Guided spiritual tours',
      'Cultural events access'
    ],
    imageUrl: 'https://plus.unsplash.com/premium_photo-1691839307627-85132e035ad1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3Bpcml0dWFsJTIwU29qb3VybiUyMG1haGFrdW1iaHxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: '3',
    title: 'Mystic Ganga View',
    type: 'Deluxe',
    price: 50000,
    duration: '4 Days 3 Nights',
    description: 'Enjoy the sacred river with a touch of comfort and scenic beauty.',
    features: [
      'Deluxe tent with river view',
      'Private bathroom',
      'Three meals a day',
      'Local guide',
      'Sundown spiritual session'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80'
  },
  {
    id: '4',
    title: 'Kumbh Day Explorer',
    type: 'Budget',
    price: 5000,
    duration: '1 Day',
    description: 'A quick immersion into the Mahakumbh Mela; perfect for solo travelers.',
    features: [
      'Guided tour for one day',
      'Lunch',
      'Access to key events',
      'Transport within Mela area'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80'
  },
  {
    id: '5',
    title: 'Family Kumbh Adventure',
    type: 'Family',
    price: 40000,
    duration: '4 Days 3 Nights',
    description: 'A family-friendly package with activities for all ages.',
    features: [
      'Family tents',
      'Shared bathroom facilities',
      'Family meals',
      'Cultural workshops for kids',
      'Family-oriented spiritual tours'
    ],
    imageUrl: 'https://plus.unsplash.com/premium_photo-1729038881971-aac0e05a9036?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RmFtaWx5JTIwQWR2ZW50dXJlJTIwbWFoYWt1bWJoJTIwdHllbXBsZXxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: '6',
    title: 'Pilgrim’s Path',
    type: 'Economy',
    price: 15000,
    duration: '2 Days 1 Night',
    description: 'A minimalist approach to experiencing the holy festival.',
    features: [
      'Basic tent accommodation',
      'Shared sanitation',
      'Two meals',
      'Group spiritual activities',
      'Access to common bathing sessions'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1520312622401-cac590a0d473?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBpbGdyaW0lMjBpbmRpYSUyMG1haGFrdW1iaHxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: '7',
    title: 'Sacred Sunrise Retreat',
    type: 'Wellness',
    price: 35000,
    duration: '3 Days 2 Nights',
    description: 'Begin each day with yoga at sunrise, embracing the spiritual essence.',
    features: [
      'Wellness tent',
      'Daily yoga sessions',
      'Healthy vegetarian meals',
      'Meditation and spiritual talks',
      'Access to special sunrise ceremonies'
    ],
    imageUrl: 'https://media.istockphoto.com/id/658188932/photo/ghats-on-the-ganges-river.webp?a=1&b=1&s=612x612&w=0&k=20&c=j1yuwpK0ZGtOg8gIBZmCnMea14Q3CRDRBnjGZ3XNeqE='
  }
];

export function HomePage() {
  return (
    <div>
      <AuthProvider>
        <Hero />
      </AuthProvider>
      <Introduction />
      <Countdown />
      <EventsList />
      
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Featured Packages
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      <TestimonialsList />
    </div>
  );
}
