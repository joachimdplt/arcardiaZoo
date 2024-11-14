import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

const HabitatsClient = ({ isHovered }) => {
  const { habitats } = usePage().props;

  const [clickStatus, setClickStatus] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

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
          console.error("Erreur lors de l'enregistrement de la consultation");
        }
      });
    } catch (error) {
      setClickStatus('error');
      console.error("Erreur lors de l'enregistrement de la consultation", error);
    }
  };

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
      id="habitatsClient" 
      className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-500 ${
        isHovered || isLocked ? 'bg-custom-color' : 'bg-white'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExpanded(!isExpanded)}
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
                  <img src={habitat.images[0].url} alt={habitat.name} className="rounded-lg mb-4" />
                )}
                <h3 className="text-lg font-bold">{habitat.name}</h3>
                <p className="mt-2 text-gray-600">{habitat.description}</p>
                
                <Link
                  href={`/habitats/${habitat.id}`}
                  className="mt-4 inline-block bg-[#38401A] text-white py-2 px-4 rounded hover:bg-green-700"
                  onClick={(e) => {
                    e.preventDefault();
                    handleConsultationClick(habitat.id);
                  }}
                >
                  Voir l'habitat
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-gray-600">Aucun habitat disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default HabitatsClient;