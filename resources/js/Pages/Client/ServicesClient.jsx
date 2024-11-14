import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const ServicesClient = ({ isHovered }) => {
  const { services } = usePage().props;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const handleMouseEnter = () => {
    setIsLocked(true);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
    setIsLocked(false);
  };

  return (
    <div
      id="servicesClient"
      className={`flex flex-col items-center justify-center w-full transition-colors duration-500 ${
        isLocked ? 'bg-custom-color' : 'bg-white'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{ backgroundColor: isLocked ? '#A6A26A' : 'white' }}
    >
      <h1
        className={`text-7xl mt-7 font-bold cursor-pointer transition-colors duration-300 ${
          isLocked ? 'text-white' : 'text-black'
        }`}
      >
        Découvrez nos services
      </h1>
      <p
        className={`mt-2 text-center transition-colors duration-300 ${
          isLocked ? 'text-white' : 'text-black'
        }`}
      >
        Des services sur mesure pour vous accompagner dans votre expérience au parc.
      </p>

      <div className={`transition-all duration-500 ease-in-out w-full ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        {Array.isArray(services) && services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full">
            {services.map((service) => (
              <div key={service.id} className="border p-4 rounded-lg shadow-lg bg-white hover:bg-gray-100">
                <ImageCarousel images={service.images} />

                <h3 className="text-xl font-bold mb-1">{service.name}</h3>
                <p className="text-sm">{service.description}</p>
                <p className="mt-1 text-gray-600 text-sm">Heures d'ouverture : {service.start_time} - {service.end_time}</p>

                <Link
                  href={`/services/${service.id}`}
                  className="mt-3 inline-block bg-[#38401A] text-white py-2 px-4 rounded hover:bg-green-700 text-sm"
                >
                  Voir plus
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4">Chargement des services...</p>
        )}
      </div>
    </div>
  );
};

// Composant pour le carrousel d'images
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return <p>Aucune image disponible</p>;
  }

  return (
    <div className="relative">
      <img
        src={`/storage/${images[currentIndex].image_data}`}
        alt={`Image ${currentIndex + 1}`}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      {images.length > 1 && (
        <>
          <button onClick={prevImage} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-75 text-white rounded-full p-2">
            ‹
          </button>
          <button onClick={nextImage} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-75 text-white rounded-full p-2">
            ›
          </button>
        </>
      )}
    </div>
  );
};

export default ServicesClient;