import React from 'react';
import { BookingSteps } from './BookingSteps';
import { PersonalDetails } from './PersonalDetails';
import AccommodationDetails from './AccommodationDetails';
import { DateSelection } from './DateSelection';
import { GuestDetails } from './GuestDetails';

export function BookingForm() {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    name: '',
    phoneNumber: '',
    accommodationType: '',
    checkIn: '',
    adults: '',
    children: ''
  });

  // Assume token is stored in localStorage or state
  const token = localStorage.getItem('userToken'); // Replace this if needed to get the token from your user state

  const handleInputChange = (name, value) => {
    setFormData(prev => {
      const updatedData = { ...prev, [name]: value };
      console.log('Updated Form Data:', updatedData); // Log the updated data
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Send the token here
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Form data successfully submitted');
        // Handle success (e.g., reset form, show success message)
      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
        Book Your Spiritual Journey
      </h2>

      <BookingSteps currentStep={step} />

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {step === 1 && (
          <PersonalDetails
            formData={formData}
            onChange={handleInputChange}
          />
        )}

        {step === 2 && (
          <AccommodationDetails
            formData={formData}
            onChange={handleInputChange}
          />
        )}

        {step === 3 && (
          <DateSelection
            formData={formData}
            onChange={handleInputChange}
          />
        )}

        {step === 4 && (
          <GuestDetails
            formData={formData}
            onChange={handleInputChange}
          />
        )}

        <div className="flex justify-between pt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              className="px-6 py-2 text-orange-600 border border-orange-600 rounded-full hover:bg-orange-50"
            >
              Previous
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(s => s + 1)}
              className="ml-auto px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700"
            >
              Submit Booking
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
