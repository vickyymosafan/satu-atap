import React from 'react';

const FirstImpression: React.FC = () => {
  return (
    <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80" />
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Find Your Perfect Kost
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8">
          Discover verified boarding houses with ease
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
            Find Kost
          </button>
          <button className="px-8 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors">
            List Your Kost
          </button>
          <button className="px-8 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors">
            Login
          </button>
        </div>
      </div>
      
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30">
        {/* Add background image when available */}
      </div>
    </div>
  );
};

export { FirstImpression };
