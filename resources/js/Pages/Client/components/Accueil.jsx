import React, { useState } from 'react';
import ReviewsClientShow from '../ReviewsClientShow';
import ArcadiaBlue from '../ArcadiaBlue';
import Wildlife from './Wildlife';

const Accueil = ({ approvedReviews = [], animals = [], habitats = [], services = [] }) => {
  console.log('Données dans Accueil:', { approvedReviews, animals, habitats, services });

  const [activeElement, setActiveElement] = useState(null);

  const handleMouseEnter = (id) => {
    setActiveElement(id);
  };

  const handleMouseLeave = () => {
    setActiveElement(null);
  };

  return (
    <div id="accueil" className="relative min-h-screen overflow-hidden">
      <div className="flex flex-col sm:flex-row min-h-screen overflow-hidden">
        {/* Composant ArcadiaBlue avec les gestionnaires de survol */}
        <ArcadiaBlue
          isActive={activeElement === 'blue'}
          onMouseEnter={() => handleMouseEnter('blue')}
          onMouseLeave={handleMouseLeave}
          className="w-full sm:w-1/3 h-screen"
        />

        {/* Composant Wildlife avec les données */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            activeElement === 'habitats' ? 'w-full' : 'w-full sm:w-1/3'
          } h-1/2 sm:h-screen bg-green-100 flex items-center justify-center`}
          onMouseEnter={() => handleMouseEnter('habitats')}
          onMouseLeave={handleMouseLeave}
        >
          <Wildlife habitats={habitats} animals={animals} services={services} />
        </div>

        {/* Troisième section - Avis */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            activeElement === 'yellow' ? 'w-full' : 'w-full sm:w-1/3'
          } h-1/2 sm:h-screen bg-gray-100 flex items-center justify-center`}
          onMouseEnter={() => handleMouseEnter('yellow')}
          onMouseLeave={handleMouseLeave}
        >
          <ReviewsClientShow reviews={approvedReviews} />
        </div>
      </div>
    </div>
  );
};

export default Accueil;