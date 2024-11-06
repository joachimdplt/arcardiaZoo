import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const ServicesClient = () => {
  // Récupérer les services via Inertia
  const { services } = usePage().props;
  console.log(services);  // Vérifier les données dans la console

  return (
    <div id="servicesClient" className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold">Découvrez nos services</h1>
      <p className="mt-4">Des services sur mesure pour vous accompagner dans votre expérience au parc.</p>

      <div className="mt-8">
        {Array.isArray(services) && services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="border p-4 rounded-lg shadow-lg">
                {/* Carrousel d'images pour chaque service */}
                <ImageCarousel images={service.images} />

                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p>{service.description}</p>
                <p className="mt-2 text-gray-600">Heures d'ouverture : {service.start_time} - {service.end_time}</p>
                
                {/* Lien vers la page de détails du service */}
                <Link
                  href={`/services/${service.id}`}
                  className="mt-4 inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                  Voir plus
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>Chargement des services...</p>
        )}
      </div>
    </div>
  );
};

// Composant pour le carrousel d'images
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Passer à l'image suivante
  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  // Passer à l'image précédente
  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  // Si pas d'images, ne rien afficher
  if (images.length === 0) {
    return <p>Aucune image disponible</p>;
  }

  return (
    <div className="relative">
      {/* Affichage de l'image actuelle */}
      <img
        src={`/storage/${images[currentIndex].image_data}`}
        alt={`Image ${currentIndex + 1}`}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      {/* Boutons pour naviguer dans le carrousel */}
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