import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import useInViewAnimation from './useInViewAnimation';

const HabitatsClient = ({ isHovered }) => {
  const { habitats } = usePage().props;

  const [clickStatus, setClickStatus] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const [ref, isInView] = useInViewAnimation(0.2);

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
      ref={ref}
      id="habitatsClient" 
      className={`relative flex flex-col items-center rounded-xl justify-center w-full h-full transition-all duration-700 ease-in-out transform ${
        isInView ? 'translate-x-0 opacity-100' : 'lg:-translate-x-full sm:translate-x-full opacity-0'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        backgroundImage: 'url("/storage/service_images/YWpe5cZ8yHl2Pe4IM16GMgLkuY5GqVKbp4bx6qvX.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: isHovered || isLocked ? 'rgba(166, 162, 106, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
        borderRadius: '12px',
      }}
    >
      {isExpanded && (
        <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-md rounded-xl"></div>
      )}

      <div className="relative z-10 text-center p-6">
        <h1 
          className="text-7xl font-bold mt-10 cursor-pointer text-white transition-colors duration-300"
          style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)' }}
        >
          Visitez les habitats
        </h1>

        {isExpanded && (
          <p 
            className="mt-4 font-bold text-white transition-colors duration-300"
            style={{ textShadow: '1px 1px 5px rgba(0, 0, 0, 0.5)' }}
          >
            Des espaces de vie imaginés pour accompagner les animaux au retour à la vie sauvage.
          </p>
        )}

        <div className={`mt-4 transition-all duration-1000 ease-in-out ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <h2 
            className="text-2xl font-semibold text-white transition-colors duration-300"
            style={{ textShadow: '1px 1px 5px rgba(0, 0, 0, 0.5)' }}
          >
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
    </div>
  );
};

export default HabitatsClient;