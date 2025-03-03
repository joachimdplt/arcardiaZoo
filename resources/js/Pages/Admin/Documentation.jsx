// Documentation.js
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AdminManual from './AdminManual';
import EmployeManual from './EmployeManual';
import VeterinaryManual from './VeterinaryManual';

const Documentation = () => {
  const [showAdminManual, setShowAdminManual] = useState(false);
  const [showEmployeeManual, setShowEmployeeManual] = useState(false);
  const [showVeterinaryManual, setShowVeterinaryManual] = useState(false);




  const handleAdminClick = () => {
    setShowAdminManual(true);
    setShowEmployeeManual(false); 
    setShowVeterinaryManual(false);

  };

  const handleEmployeeClick = () => {
    setShowEmployeeManual(true);
    setShowAdminManual(false); 
    setShowVeterinaryManual(false);
  };

  const handleVeterinaryClick = () => {
    setShowVeterinaryManual(true);
    setShowEmployeeManual(false);
    setShowAdminManual(false); 
  };

  const handleBackToMain = () => {
    setShowAdminManual(false);
    setShowEmployeeManual(false);
    setShowVeterinaryManual(false);
  };

  // Affiche le manuel approprié en fonction de l'état
  if (showAdminManual) {
    return <AdminManual onBack={handleBackToMain} />;
  }

  if (showEmployeeManual) {
    return <EmployeManual onBack={handleBackToMain} />;
  }

  if (showVeterinaryManual) {
    return <VeterinaryManual onBack={handleBackToMain} />;
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-6">
    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold mb-4 text-gray-300">Manuel d'Utilisation</h1>
        <p className="text-lg text-gray-400">
          Consultez le guide complet pour une utilisation efficace d'Arcadia, votre application de gestion de parc zoologique.
        </p>
      </header>

      <main className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Fonctionnalités disponibles pour tous */}
        <section className="flex flex-col gap-4 rounded-lg bg-zinc-800 p-6 shadow-md ring-1 ring-gray-700 transition duration-300 hover:text-gray-300 hover:ring-gray-600">
          <h2 className="text-2xl font-semibold text-gray-200">Fonctionnalités disponibles pour tous les membres</h2>
          <p className="mt-4 text-sm text-gray-400">
            <strong>Accès à la liste des animaux :</strong> Tous les membres peuvent accéder à la liste des animaux avec leurs informations de base.
          </p>
          <p className="mt-4 text-sm text-gray-400">
            <strong>Visualisation des détails d'un Animal :</strong> Chaque utilisateur peut consulter la fiche détaillée d'un animal avec ses informations, ses habitats, ses images, ses alimentations passées, et ses rapports vétérinaires.
          </p>
         
        </section>

        {/* Fonctionnalités spécifiques par rôle */}
        <section className="flex flex-col gap-4 rounded-lg bg-zinc-800 p-6 shadow-md ring-1 ring-gray-700 transition duration-300 hover:text-gray-300 hover:ring-gray-600">
          <h2 className="text-2xl font-semibold text-gray-200">Fonctionnalités spécifiques par rôle</h2>

          <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-300">Administrateurs</h3>
              <button onClick={handleAdminClick} className="text-blue-400 hover:underline">
                Ouvrir le Manuel Administrateur
              </button>
              <ul className="list-disc pl-6 text-sm text-gray-400">
                <li>Création, modification, et suppression d'animaux</li>
                <li>Gestion des races et des habitats</li>
                <li>Mise à jour du statut des animaux</li>
                <li>Gestion des utilisateurs et des rôles</li>
                <li>Consultation des statistiques des animaux</li>
                <li>Gestion et modification des services</li>
              </ul>
            </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-300">Employés</h3>
            <button onClick={handleEmployeeClick} className="text-blue-400 hover:underline">
                Ouvrir le Manuel Employés
              </button>
            <ul className="list-disc pl-6 text-sm text-gray-400">
              <li>Enregistrement des alimentations</li>
              <li>Accès aux rapports vétérinaires</li>
              <li>Consultation des alimentations passées</li>
              <li>Gestion et modification des services</li>
              <li>Création d'animaux</li>
              <li>Modification et suppression d'animaux</li>
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-300">Vétérinaires</h3>
            <button onClick={handleVeterinaryClick} className="text-blue-400 hover:underline">
                Ouvrir le Manuel Vétérinaires
              </button>
            <ul className="list-disc pl-6 text-sm text-gray-400">
              <li>Création de rapports vétérinaires</li>
              <li>Consultation de l'historique médical complet</li>
              <li>Consultation des alimentations et recommandations</li>
            </ul>
          </div>
        </section>

          {/* Récapitulatif des fonctionnalités */}
          <section className="col-span-2 flex flex-col gap-4 rounded-lg bg-zinc-800 p-6 shadow-md ring-1 ring-gray-700 transition duration-300 hover:text-gray-300 hover:ring-gray-600 overflow-y-scroll max-h-96">
            <h2 className="text-2xl font-semibold text-gray-200">Récapitulatif des Fonctionnalités par Rôle</h2>
            <table className="min-w-full bg-zinc-900 shadow-md rounded my-6">
              <thead>
                <tr className="bg-gray-800">
                  <th className="py-2 px-4 border-b text-left text-gray-300">Fonctionnalité</th>
                  <th className="py-2 px-4 border-b text-center text-gray-300">Administrateurs</th>
                  <th className="py-2 px-4 border-b text-center text-gray-300">Employés</th>
                  <th className="py-2 px-4 border-b text-center text-gray-300">Vétérinaires</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b text-gray-400">Accès à la liste des animaux</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-gray-400">Visualisation des détails d'un animal</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-gray-400">Accès aux rapports vétérinaires</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                </tr>

                <tr>
                  <td className="py-2 px-4 border-b text-gray-400">Consultation des alimentations passées</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-gray-400">Consultation de l'historique médical complet</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-gray-400">Gestion des services</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                </tr>
                
                <tr>
                  <td className="py-2 px-4 border-b text-gray-400">Création d'animaux</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-gray-400">Modification et suppression d'animaux</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-gray-400">Gestion des races et habitats</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                </tr>
               
                <tr>
                  <td className="py-2 px-4 border-b text-gray-400">Mise à jour du statut des animaux</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                </tr>
                
                <tr>
                  <td className="py-2 px-4 border-b text-gray-400">Consultation des statistiques des animaux</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-gray-400">Consultation de la messagerie</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-gray-400">Gestion des utilisateurs et des rôles</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-gray-400">Enregistrement des alimentations</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-gray-400">Enregistrement des avis des visiteurs</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-gray-400">Création de rapports vétérinaires</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">❌</td>
                  <td className="py-2 px-4 border-b text-center text-gray-400">✅</td>
                </tr>
                
               
                
              </tbody>
            </table>
          </section>
        </main>

        <footer className="mt-8 text-center">
          <Link href="/" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
            Retour au tableau de bord
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Documentation;