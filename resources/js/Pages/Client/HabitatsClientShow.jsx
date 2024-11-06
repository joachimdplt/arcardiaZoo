import React from 'react';
import { Link, router } from '@inertiajs/react';

const HabitatsClientShow = ({ habitat }) => {
  if (!habitat) {
    return <p>Chargement des détails de l'habitat...</p>;
  }

  const handleAnimalClick = (animalId) => {
    console.log(`Enregistrement du clic pour l'animal ID: ${animalId}`);
    router.post(`/animals/${animalId}/click`, {}, {
      onSuccess: () => {
        console.log(`Consultation enregistrée avec succès pour l'animal ID: ${animalId}`);
      },
      onError: (error) => {
        console.error("Erreur lors de l'enregistrement de la consultation de l'animal", error);
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold mb-8">{habitat.name}</h1>

      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        {habitat.images.length > 0 && <ImageCarousel images={habitat.images} />}
        
        <p className="text-xl mb-4"><strong>Description :</strong> {habitat.description}</p>
        <p className="text-xl mb-4"><strong>Nombre d'animaux :</strong> {habitat.animals.length}</p>

        {habitat.animals.length > 0 && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Animaux présents :</h4>
            <ul className="list-disc list-inside">
              {habitat.animals.map((animal) => (
                <li key={animal.id} className="mb-2">
                  {animal.image && (
                    <img
                      src={`/storage/${animal.image}`}
                      alt={`Image de ${animal.name}`}
                      className="w-8 h-8 object-cover rounded-full inline-block mr-2"
                    />
                  )}
                  <Link
                    href={`/animals/${animal.id}`}
                    className="text-blue-500 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAnimalClick(animal.id);
                      router.visit(`/animals/${animal.id}`);
                    }}
                  >
                    {animal.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-8">
        <Link
          href="/client#habitatsClient"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Retour aux habitats
        </Link>
      </div>
    </div>
  );
};

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg">
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

export default HabitatsClientShow;