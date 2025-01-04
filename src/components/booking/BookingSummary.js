import React from 'react';

export function BookingSummary({ formData, selectedPackage }) {
  const calculateTotal = () => {
    const nights = Math.ceil(
      (new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) 
      / (1000 * 60 * 60 * 24)
    );
    const basePrice = selectedPackage.price;
    const totalGuests = parseInt(formData.adults) + parseInt(formData.children);
    return basePrice * nights * totalGuests;
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Package</span>
          <span className="font-medium">{selectedPackage.title}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Dates</span>
          <span className="font-medium">
            {formData.checkIn} to {formData.checkOut}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Guests</span>
          <span className="font-medium">
            {formData.adults} Adults, {formData.children} Children
          </span>
        </div>
        
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Amount</span>
            <span>₹{calculateTotal().toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
