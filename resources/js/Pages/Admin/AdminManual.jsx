import React from 'react';

const AdminManual = ( { onBack } ) => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Manuel de l'Administrateur</h2>
      <p>Bienvenue dans le manuel d'utilisation pour les administrateurs. Voici les principales fonctionnalités disponibles pour vous :</p>
      
      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>
          <strong>Equipe :</strong> Gérez les membres de l'équipe du parc, leurs rôles et leurs informations. Vous pouvez ajouter, modifier ou supprimer des profils.
        </li>
        
        <li>
          <strong>Habitats :</strong> Surveillez et gérez les habitats de chaque animal. Cette fonctionnalité vous permet d'ajouter de nouveaux habitats, de les modifier ou de les supprimer. Vous pouvez également ajouter ou supprimer des photos associées aux habitats.
        </li>
        
        <li>
          <strong>Animaux :</strong> Ajoutez de nouveaux animaux, mettez à jour leurs informations, et gérez leur état de santé. Vous avez également la possibilité d’ajouter ou de supprimer des photos pour chaque animal afin de documenter visuellement leur profil.
        </li>
        
        <li>
          <strong>Services :</strong> Gérez les différents services proposés par le parc, tels que les visites guidées. Vous pouvez modifier les offres de services pour améliorer l'expérience des visiteurs et ajouter ou supprimer des photos pour illustrer chaque service.
        </li>
        
        <li>
          <strong>Rapports vétérinaires :</strong> Accédez aux rapports vétérinaires pour chaque animal, ce qui permet de suivre leur état de santé, d'historiciser les consultations, de suggérer des alimentations, ainsi que de commenter les habitats dans lequel se trouve l'animal.
        </li>
        
        <li>
          <strong>Commentaires :</strong> Consultez les commentaires des visiteurs concernant leur expérience dans le parc. Vos employés sont chargés d'approuver, supprimer ou répondre aux avis pour améliorer la satisfaction des visiteurs.
        </li>
        
        <li>
          <strong>Messagerie :</strong> Consultez les messages des visiteurs concernant leurs demandes spécifiques.
        </li>
        
        <li>
          <strong>Statistiques :</strong> Consultez les statistiques du parc, telles que les visites d'habitats et d'animaux pour obtenir des informations précieuses sur la fréquentation et l'engagement des visiteurs.
        </li>
      </ul>
      <div className="mt-6">
        <button onClick={onBack} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
          Retour
        </button>
      </div>
    </div>
  );
};

export default AdminManual;