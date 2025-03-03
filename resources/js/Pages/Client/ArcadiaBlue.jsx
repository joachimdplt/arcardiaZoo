import React, { useState } from 'react';

const ArcadiaBlue = ({ isActive, onMouseEnter, onMouseLeave }) => {
  const images = [
    '/storage/habitat_images/bgArcadia.png',
    '/storage/habitat_images/bg2arcadia.png',
    '/storage/habitat_images/bg3arcadia.png'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNextImage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const handlePrevImage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
        setIsTransitioning(false);
      }, 500);
    }
  };

  return (
    <div
      className={`relative transition-all duration-500 ease-in-out ${
        isActive ? 'flex-1 w-full' : 'flex-1 w-full sm:w-1/3'
      } h-screen flex items-center justify-center`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ minHeight: '100vh' }} // Assure une hauteur de 100% de l'écran
    >
      {/* Conteneur des images avec `object-cover` */}
      <div className="relative w-full h-full overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
              currentImageIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Background ${index}`}
              className="w-full h-full object-cover" // Assure le remplissage complet sans déformation
            />
          </div>
        ))}
      </div>

      {/* Bouton précédent */}
      <button
        onClick={handlePrevImage}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 px-3 py-2 rounded-full z-10 hover:bg-opacity-100 transition duration-300"
      >
        &#8592;
      </button>

      {/* Bouton suivant */}
      <button
        onClick={handleNextImage}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 px-3 py-2 rounded-full z-10 hover:bg-opacity-100 transition duration-300"
      >
        &#8594;
      </button>
    </div>
  );
};

export default ArcadiaBlue;