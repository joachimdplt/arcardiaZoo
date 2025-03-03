import React from 'react';

const EmployeeManual = ( { onBack } ) => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Manuel de l'Employé</h2>
      <p>Bienvenue dans le manuel d'utilisation pour les employés. Voici les principales fonctionnalités et actions disponibles pour vous :</p>
      
      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>
          <strong>Habitats :</strong> Accédez aux informations des habitats pour chaque animal. Vous pouvez consulter  les détails des habitats afin de savoir ou se trouve chaque animal.
        </li>

        <li>
          <strong>Animaux :</strong> Voir les animaux. Vous avez la possibilité de nourrir et consulter l'historique d'alimentation, voir les rapports vétérinaires et sugestions d'alimentations. Vous ne pourrez nourir un animal que si une alimentation à été préalablement sugérée afin de vous informer au mieux sur les besoins des animaux.
        </li>
        
        <li>
          <strong>Services :</strong> Gérez les services proposés aux visiteurs du parc. Vous pouvez modifier les services pour améliorer l'expérience des visiteurs en fonction des besoins et des recommandations et ajouter ou supprimer des photos pour illustrer chaque service.
        </li>

        <li>
          <strong>Rapports vétérinaires :</strong> Consultez les rapports vétérinaires pour chaque animal afin de suivre leur état de santé. Cela vous permet de rester informé des besoins spécifiques des animaux.
        </li>
        
        <li>
          <strong>Commentaires :</strong> Consultez et gérez les commentaires laissés par les visiteurs. Vous pouvez approuver, supprimer ou répondre aux avis pour améliorer la satisfaction des visiteurs.
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

export default EmployeeManual;