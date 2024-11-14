import React, { useState, useEffect } from 'react';
import ReviewsClientShow from '../ReviewsClientShow';
import ArcadiaBlue from '../ArcadiaBlue';
import Wildlife from './Wildlife';

const Accueil = ({ approvedReviews = [], animals = [], habitats = [], services = [] }) => {
  const [activeElement, setActiveElement] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Detect screen size for full-screen mode on mobile
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = (id) => {
    setActiveElement(id);
  };

  const handleMouseLeave = () => {
    setActiveElement(null);
  };

  return (
    <div id="accueil" className="relative min-h-screen overflow-hidden">
      <div className={`flex ${isSmallScreen ? 'flex-col' : 'flex-col sm:flex-row'} min-h-screen overflow-hidden`}>
        
        {/* ArcadiaBlue Component */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            activeElement === 'blue' || isSmallScreen ? 'w-full h-screen' : 'w-full sm:w-1/3 h-screen'
          } flex items-center justify-center bg-cover`}
          onMouseEnter={() => handleMouseEnter('blue')}
          onMouseLeave={handleMouseLeave}
        >
          <ArcadiaBlue isActive={activeElement === 'blue' || isSmallScreen} />
        </div>

        {/* Wildlife Component */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            activeElement === 'habitats' || isSmallScreen ? 'w-full h-screen bg-white' : 'w-full sm:w-1/3 h-screen'
          } flex items-center justify-center`}
          onMouseEnter={() => handleMouseEnter('habitats')}
          onMouseLeave={handleMouseLeave}
        >
          <Wildlife habitats={habitats} animals={animals} services={services} />
        </div>

        {/* Reviews Section */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            activeElement === 'reviews' || isSmallScreen ? 'w-full h-screen bg-white' : 'w-full sm:w-1/3 h-screen'
          } flex items-center justify-center`}
          style={{ backgroundColor: activeElement === 'reviews' || isSmallScreen ? 'white' : '#848C42' }}
          onMouseEnter={() => handleMouseEnter('reviews')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center justify-center w-full h-full">
            <ReviewsClientShow isHovered={activeElement === 'reviews' || isSmallScreen} reviews={approvedReviews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;