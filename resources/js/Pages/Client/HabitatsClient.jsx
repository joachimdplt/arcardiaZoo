import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

const HabitatsClient = ({ isHovered }) => {
  const { habitats } = usePage().props;
  const [clickStatus, setClickStatus] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); // Controls content visibility
  const [isLocked, setIsLocked] = useState(false); // Controls locked state for background color

  const handleConsultationClick = async (habitatId) => {
    setClickStatus('loading');
    try {
      router.post(`/habitat/${habitatId}/click`, {}, {
        onSuccess: () => {
          setClickStatus('success');
          router.visit(`/habitats/${habitatId}`);
        },
        onError: () => {
          setClickStatus('error');
        }
      });
    } catch (error) {
      setClickStatus('error');
    }
  };

  const handleMouseEnter = () => {
    setIsLocked(true); // Locks the background color
    setIsExpanded(true); // Shows content on hover
  };

  const handleMouseLeave = () => {
    setIsExpanded(false); // Hides content when leaving
    setIsLocked(false); // Resets lock, allowing background to turn white
  };

  return (
    <div 
      id="habitatsClient" 
      className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-500 ${
        isHovered || isLocked ? 'bg-custom-color' : 'bg-white'
      }`}
      onMouseEnter={handleMouseEnter} // Activates color and displays content on hover
      onMouseLeave={handleMouseLeave} // Hides content and resets lock on exit
      onClick={() => setIsExpanded(!isExpanded)} // Toggles content visibility on click
      style={{ backgroundColor: isHovered || isLocked ? '#A6A26A' : 'white' }}
    >
      <h1 
        className={`text-7xl font-bold mt-10 cursor-pointer transition-colors duration-300 ${
          isHovered || isLocked ? 'text-white' : 'text-black'
        }`}
      >
        Visitez les habitats 
      </h1>

      <p 
        className={`mt-4 transition-colors duration-300 ${
          isHovered || isLocked ? 'text-white' : 'text-black'
        }`}
      >
        Des espaces de vie imaginés pour accompagner les animaux au retour à la vie sauvage.
      </p>

      {/* Details section with transition */}
      <div className={`mt-4 transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <h2 className={`text-2xl font-semibold transition-colors duration-300 ${
          isHovered || isLocked ? 'text-white' : 'text-black'
        }`}>
          Habitats
        </h2>
        
        {Array.isArray(habitats) && habitats.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {habitats.map((habitat) => (
              <div key={habitat.id} className="border p-4 rounded-lg shadow-lg bg-white">
                {habitat.images.length > 0 && (
                  <ImageCarousel images={habitat.images} />
                )}
                
                <h3 className="text-xl font-bold mb-2">{habitat.name}</h3>
                <p>{habitat.description}</p>
                <p className="mt-2 text-gray-600">Nombre d'animaux : {habitat.animals.length}</p>
                
                {habitat.animals.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">Animaux dans cet habitat :</h4>
                    <ul className="list-disc list-inside">
                      {habitat.animals.slice(0, 3).map((animal) => (
                        <li key={animal.id}>
                          {animal.image && (
                            <img
                              src={`/storage/${animal.image}`} 
                              alt={`Image de ${animal.name}`}
                              className="w-16 h-16 object-cover rounded-full inline-block mr-2"
                            />
                          )}
                          {animal.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Updated button with green color as default */}
                <Link
                  href={`/habitats/${habitat.id}`}
                  className="mt-4 inline-block bg-[#38401A] text-white py-2 px-4 rounded hover:bg-green-700"
                  onClick={(e) => {
                    e.preventDefault();
                    handleConsultationClick(habitat.id);
                  }}
                >
                  Voir plus
                </Link>

                {clickStatus === 'loading' && <p className="text-blue-500">Enregistrement du clic...</p>}
                {clickStatus === 'success' && <p className="text-green-500">Consultation enregistrée avec succès !</p>}
                {clickStatus === 'error' && <p className="text-red-500">Erreur lors de l'enregistrement du clic.</p>}
              </div>
            ))}
          </div>
        ) : (
          <p>Chargement des habitats...</p>
        )}
      </div>
    </div>
  );
};

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-48 overflow-hidden rounded-lg">
      {images.length > 1 && (
        <button 
          onClick={prevImage}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        >
          ←
        </button>
      )}
      <img
        src={`/storage/${images[currentIndex].image_data}`}
        alt="Habitat Image"
        className="w-full h-full object-cover"
      />
      {images.length > 1 && (
        <button 
          onClick={nextImage}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        >
          →
        </button>
      )}
    </div>
  );
};

export default HabitatsClient;