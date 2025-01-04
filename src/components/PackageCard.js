import React from 'react';

function PackageCard({ pkg }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={pkg.imageUrl}
        alt={pkg.title}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{pkg.title}</h3>
            <span className="inline-block px-2 py-1 text-sm text-orange-600 bg-orange-100 rounded">
              {pkg.type}
            </span>
          </div>
          <span className="text-2xl font-bold text-orange-600">
            ₹{pkg.price.toLocaleString()}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{pkg.description}</p>
        
        <ul className="space-y-2 mb-6">
          {pkg.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <span className="mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
        
        <button className="w-full bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition">
          Book Now
        </button>
      </div>
    </div>
  );
}

export default PackageCard;
