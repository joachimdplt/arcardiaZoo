// VeterinaryManual.jsx
import React from 'react';

const VeterinaryManual = ({ onBack }) => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Manuel du Vétérinaire</h2>
      <p>Bienvenue dans le manuel d'utilisation pour les vétérinaires. Voici les principales fonctionnalités disponibles pour vous :</p>
      
      {/* Onglets */}
      <div className="flex gap-4 mt-6">
        <button className="bg-zinc-700 text-white py-2 px-4 rounded hover:bg-zinc-600">Habitats</button>
        <button className="bg-zinc-700 text-white py-2 px-4 rounded hover:bg-zinc-600">Animaux</button>
        <button className="bg-zinc-700 text-white py-2 px-4 rounded hover:bg-zinc-600">Rapports vétérinaires</button>
      </div>

      {/* Liste des fonctionnalités */}
      <ul className="list-disc pl-6 mt-6 space-y-2">
        <li>
          <strong>Accès à la liste des animaux :</strong> Vous pouvez accéder à la liste complète des animaux du parc, avec leurs informations de base pour faciliter vos consultations et interventions.
        </li>
        
        <li>
          <strong>Visualisation des détails d'un animal :</strong> Consultez la fiche détaillée de chaque animal, incluant les informations générales, son habitat, ses images, ses alimentations passées, et les rapports vétérinaires associés.
        </li>
        
        <li>
          <strong>Accès aux rapports vétérinaires :</strong> Accédez aux rapports vétérinaires précédents de chaque animal, ce qui permet de mieux comprendre son historique médical.
        </li>
        
        <li>
          <strong>Consultation des alimentations passées :</strong> Consultez les historiques d'alimentation des animaux pour mieux adapter les soins et les prescriptions en fonction de leur alimentation passée.
        </li>
        
        <li>
          <strong>Consultation de l'historique médical complet :</strong> Accédez à l'historique médical complet de chaque animal pour mieux évaluer sa condition de santé.
        </li>
        
        <li>
          <strong>Création de rapports vétérinaires :</strong> Créez de nouveaux rapports vétérinaires après chaque visite ou intervention, permettant ainsi d'archiver les soins et recommandations pour chaque animal.
        </li>

        <li>
          <strong>Création de commentaires sur les habitats :</strong> Lors de la création de vos rapports vétérinaires vous pouvez commenter les habitats dans lequels se trouvent les aniamux.
        </li>
      </ul>

      {/* Bouton de retour */}
      <div className="mt-6">
        <button onClick={onBack} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
          Retour 
        </button>
      </div>
    </div>
  );
};

export default VeterinaryManual;