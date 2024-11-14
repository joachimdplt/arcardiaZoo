import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const ServicesClient = () => {
  const { services } = usePage().props;
  const [isExpanded, setIsExpanded] = useState(false); // Controls content visibility
  const [isLocked, setIsLocked] = useState(false); // Controls locked state for background color

  const handleMouseEnter = () => {
    setIsLocked(true); // Lock the background color
    setIsExpanded(true); // Show the content on hover
  };

  const handleMouseLeave = () => {
    setIsExpanded(false); // Hide the content on mouse leave
    setIsLocked(false); // Reset the lock to allow the background to turn white
  };

  return (
    <div 
      id="servicesClient" 
      className={`flex flex-col items-center justify-center w-full transition-colors duration-500 ${
        isLocked ? 'bg-custom-color' : 'bg-white'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExpanded(!isExpanded)} // Toggle content visibility on click
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

      {/* Content section with transition */}
      <div className={`transition-all duration-500 ease-in-out w-full ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        {Array.isArray(services) && services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full">
            {services.map((service) => (
              <div key={service.id} className="border p-4 rounded-lg shadow-lg bg-white hover:bg-gray-100">
                <ImageCarousel images={service.images} />

                <h3 className="text-xl font-bold mb-1">{service.name}</h3>
                <p className="text-sm">{service.description}</p>
                <p className="mt-1 text-gray-600 text-sm">Heures d'ouverture : {service.start_time} - {service.end_time}</p>
                
                {/* Button with bg color applied */}
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

// Image carousel component
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
          <button
            onClick={prevImage}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 text-white p-2 rounded-full"
          >
            ←
          </button>
          <button
            onClick={nextImage}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 text-white p-2 rounded-full"
          >
            →
          </button>
        </>
      )}
    </div>
  );
};

export default ServicesClient;