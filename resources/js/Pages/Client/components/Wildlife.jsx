import React, { useState, useRef } from 'react';

const Wildlife = ({ habitats = [], services = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null); // Référence pour le contenu dépliable
  const animals = habitats.reduce((acc, habitat) => [...acc, ...habitat.animals], []);

  const handleToggleExpand = (e) => {
    e.preventDefault();
    setIsExpanded((prevState) => {
      const newState = !prevState;
      if (!prevState && contentRef.current) {
        // Si on passe à l'état déployé, on fait défiler
        setTimeout(() => contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
      }
      return newState;
    });
  };

  return (
    <div
      className="relative w-full h-full flex flex-col justify-center items-center transition-colors duration-500"
      style={{ backgroundColor: isExpanded ? 'white' : '#A6A26A' }}
    >
      {/* Image de fond */}
      {isExpanded && (
        <div
          className="absolute inset-0 z-0 w-full h-full"
          style={{
            backgroundImage: `url("/storage/habitat_images/GrvlrnG6O0h0XdjQIUt25EMH3MR1U6COXCUPpzFD.png")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* Contenu principal */}
      <div
        className={`relative z-10 w-full max-w-3xl p-4 sm:p-6 md:p-8 text-center transition-all duration-300 ${
          isExpanded ? 'bg-opacity-50 bg-white rounded-lg shadow-lg' : ''
        }`}
        onClick={handleToggleExpand} // Basculer l'état d'expansion
      >
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold mb-4 cursor-pointer text-white transition-colors duration-300"
          style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)' }}
        >
          Wildlife Expérience
        </h1>
        <p
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-bold"
          style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)' }}
        >
          Un parc animalier de réadaptation à la vie sauvage
        </p>

        {/* Contenu dépliable */}
        <div
          ref={contentRef} // Référence pour faire défiler
          className={`transition-all duration-500 ease-in-out ${
            isExpanded ? 'max-h-screen opacity-100 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          {/* Liste des habitats */}
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

          {/* Liste des services */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4 sm:mt-6 md:mt-8 px-2 sm:px-3">
            {services.slice(0, 3).map((service) => (
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

          {/* Liste des animaux */}
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