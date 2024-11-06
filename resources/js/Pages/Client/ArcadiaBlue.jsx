import React, { useState } from 'react';

const ArcadiaBlue = ({ isActive, onMouseEnter, onMouseLeave }) => {
  // Les chemins des images
  const images = [
    '/storage/habitat_images/bgArcadia.png',
    '/storage/habitat_images/bg2arcadia.png',
    '/storage/habitat_images/bg3arcadia.png'
  ];

  // État pour gérer l'index de l'image actuelle
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false); // Pour gérer l'état de transition

  // Fonction pour aller à l'image suivante
  const handleNextImage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 500); // Durée de la transition
    }
  };

  // Fonction pour aller à l'image précédente
  const handlePrevImage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
        setIsTransitioning(false);
      }, 500); // Durée de la transition
    }
  };

  return (
    <div
      className={`relative transition-all duration-500 ease-in-out ${
        isActive ? 'w-full' : 'w-1/3'
      } h-screen bg-blue-100 flex items-center justify-center`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Conteneur des images */}
      <div className="relative w-full h-full overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-500 ease-in-out ${
              currentImageIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        ))}
      </div>

      {/* Bouton précédent */}
      <button
        onClick={handlePrevImage}
        className="absolute left-5 bg-white bg-opacity-50 px-3 py-2 rounded-full z-10"
      >
        &#8592;
      </button>

      {/* Bouton suivant */}
      <button
        onClick={handleNextImage}
        className="absolute right-5 bg-white bg-opacity-50 px-3 py-2 rounded-full z-10"
      >
        &#8594;
      </button>
    </div>
  );
};

export default ArcadiaBlue;