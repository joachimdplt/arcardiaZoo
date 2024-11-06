import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';

const AnimalClientShow = () => {
  const { animal } = usePage().props;
  console.log("Animal complet:", animal);

  const images = animal.images || [];
  const feeds = animal.feedings || [];
  const reports = animal.veterinary_reports || [];

  // État pour le carrousel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fonction pour passer à l'image suivante
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Fonction pour revenir à l'image précédente
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <h1 className="text-4xl font-bold mb-8">{animal.name}</h1>

      {/* Carrousel d'images de l'animal */}
      {images.length > 0 && (
        <div className="w-full max-w-md mb-8 relative">
          <img
            src={`/storage/${images[currentImageIndex].image_data}`}
            alt={`Image de ${animal.name}`}
            className="w-full h-auto object-contain rounded-lg shadow-lg"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-900"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-900"
              >
                →
              </button>
            </>
          )}
        </div>
      )}

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Section pour les Détails */}
        <div className="p-4 bg-gray-100 rounded shadow">
          <h3 className="text-2xl font-semibold mb-4">Détails</h3>
          <p className="text-xl mb-4"><strong>Race :</strong> {animal.breed?.label}</p>
          <p className="text-xl mb-4"><strong>État :</strong> {animal.status}</p>
        </div>

        {/* Section pour l'Alimentation */}
        <div className="p-4 bg-gray-100 rounded shadow">
          <h3 className="text-2xl font-semibold mb-4">Alimentation</h3>
          {feeds.length > 0 ? (
            feeds.map((feed, index) => (
              <div key={index} className="mb-4">
                <p><strong>Date de l'alimentation :</strong> {new Date(feed.feed_date).toLocaleDateString()}</p>
                <p><strong>Heure de l'alimentation :</strong> {feed.feed_time}</p>
                <p><strong>Type de nourriture :</strong> {feed.feed_type}</p>
                <p><strong>Quantité :</strong> {feed.feed_quantity} grammes</p>
                <p><strong>Nourri par :</strong> {feed.user?.name || 'Utilisateur inconnu'}</p>
              </div>
            ))
          ) : (
            <p className="text-xl">Aucune alimentation disponible pour cet animal.</p>
          )}
        </div>

        {/* Section pour les Rapports Vétérinaires */}
        <div className="p-4 bg-gray-100 rounded shadow">
          <h3 className="text-2xl font-semibold mb-4">Rapports Vétérinaires</h3>
          {reports.length > 0 ? (
            reports.map((report, index) => (
              <div key={index} className="mb-4">
                <p><strong>Date de passage :</strong> {report.date ? new Date(report.date).toLocaleDateString() : 'Non disponible'}</p>
                <p><strong>Détails :</strong> {report.details || 'Non disponible'}</p>
                <p><strong>Commentaires sur l'habitat:</strong> {report.habitat_comment || 'Aucun commentaire supplémentaire.'}</p>
                <p><strong>Type de nourriture recommandée :</strong> {report.feed_type || 'Non disponible'}</p>
                <p><strong>Quantité recommandée :</strong> {report.feed_quantity ? `${report.feed_quantity} grammes` : 'Non disponible'}</p>
              </div>
            ))
          ) : (
            <p className="text-xl">Aucun rapport vétérinaire disponible pour cet animal.</p>
          )}
        </div>
      </div>

      {/* Bouton de retour à l'habitat */}
      <button
        onClick={() => window.history.back()}
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition mt-6"
      >
        Retour à l'habitat
      </button>
    </div>
  );
};

export default AnimalClientShow;