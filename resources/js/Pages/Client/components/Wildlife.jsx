import React, { useState } from 'react';

const Wildlife = ({ habitats = [], services = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const animals = habitats.reduce((acc, habitat) => [...acc, ...habitat.animals], []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsExpanded(false);
  };

  return (
    <div 
      className={`wildlife-carousel w-full h-full flex flex-col justify-center items-center transition-colors duration-500 ${
        isHovered ? 'bg-white' : ''
      }`}
      style={{ backgroundColor: isHovered ? 'white' : '#A6A26A' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="w-full max-w-3xl p-4 sm:p-6 md:p-8 text-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
      <h1 
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 cursor-pointer transition-colors duration-300 ${
          isHovered ? '' : 'text-white'
        }`}
        style={{ color: isHovered ? '#38401A' : 'white' }}
      >
        Wildlife Expérience
      </h1>
        <p className={`text-sm sm:text-base md:text-lg lg:text-xl ${isHovered ? 'text-gray-800' : 'text-gray-200'}`}>
          Un parc animalier de réadaptation à la vie sauvage
        </p>

        <div 
          className={`transition-all duration-500 ease-in-out ${
            isExpanded ? 'max-h-screen opacity-100 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          {/* Grid pour les habitats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4 sm:mt-6 md:mt-8 px-2 sm:px-3">
            {habitats.map((habitat) => (
              <div key={habitat.id} className="p-3 sm:p-4 bg-white rounded shadow-md">
                {habitat.images.length > 0 && (
                  <img
                    src={`/storage/${habitat.images[0].image_data}`}
                    alt={habitat.name}
                    className="h-32 sm:h-36 md:h-40 w-full object-cover rounded mb-2"
                  />
                )}
                <h3 className="text-sm sm:text-base md:text-lg font-semibold">{habitat.name}</h3>
              </div>
            ))}
          </div>

          {/* Grid pour les services */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4 sm:mt-6 md:mt-8 px-2 sm:px-3">
            {services.slice(1, 4).map((service) => (
              <div key={service.id} className="p-3 sm:p-4 bg-white rounded shadow-md">
                {service.images.length > 0 && (
                  <img
                    src={`/storage/${service.images[0].image_data}`}
                    alt={service.name}
                    className="h-32 sm:h-36 md:h-40 w-full object-cover rounded mb-2"
                  />
                )}
                <h3 className="text-sm sm:text-base md:text-lg font-semibold">{service.name}</h3>
              </div>
            ))}
          </div>

          {/* Grid pour les animaux */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4 sm:mt-6 md:mt-8 px-2 sm:px-3">
            {animals.slice(0, 3).map((animal) => (
              <div key={animal.id} className="p-3 sm:p-4 bg-white rounded shadow-md">
                {animal.images && animal.images.length > 0 && (
                  <img
                    src={`/storage/${animal.images[0].image_data}`}
                    alt={animal.name}
                    className="h-32 sm:h-36 md:h-40 w-full object-cover rounded mb-2"
                  />
                )}
                <h3 className="text-sm sm:text-base md:text-lg font-semibold">{animal.name}</h3>
                <p className="text-xs sm:text-sm md:text-base">{animal.breed?.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wildlife;