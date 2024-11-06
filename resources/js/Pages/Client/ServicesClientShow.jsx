import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';

const ServicesClientShow = () => {
  // Récupérer les données du service via Inertia
  const { service } = usePage().props;
  
  // État pour gérer l'image actuelle du carrousel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Passer à l'image suivante
  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % service.images.length);
  };

  // Passer à l'image précédente
  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + service.images.length) % service.images.length);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold mb-8">{service.name}</h1>

      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-6">
        {/* Carrousel d'images */}
        {service.images.length > 0 && (
          <div className="relative w-full mb-8 flex justify-center">
            <img
              src={`/storage/${service.images[currentIndex].image_data}`}
              alt={`Image de ${service.name}`}
              className="w-1/2 h-auto object-contain rounded-lg shadow-lg"
            />
            
            {/* Boutons de navigation */}
            {service.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                >
                  ←
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                >
                  →
                </button>
              </>
            )}
          </div>
        )}

        {/* Détails du service */}
        <p className="text-xl mb-4"><strong>Description :</strong> {service.description}</p>
        <p className="text-xl mb-4"><strong>Heures d'ouverture :</strong> {service.start_time} - {service.end_time}</p>

        {/* Bouton de retour à la page précédente */}
        <div className="mt-8">
          <Link
            href="/client#servicesClient"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Retour aux services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesClientShow;