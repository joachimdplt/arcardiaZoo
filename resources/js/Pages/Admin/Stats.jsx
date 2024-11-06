import React, { useEffect } from 'react';
import { Link } from '@inertiajs/react';

const Stats = ({ habitatStats = [], animalStats = [] }) => {
  useEffect(() => {
    console.log("Données de habitatStats :", habitatStats);
    console.log("Données de animalStats :", animalStats);
  }, [habitatStats, animalStats]);

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Statistiques de Consultation</h1>

      {/* Table des habitats */}
      {habitatStats.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-6">Consultations des Habitats</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nom de l'Habitat</th>
                <th className="py-2 px-4 border-b">Nombre de clics</th>
              </tr>
            </thead>
            <tbody>
              {habitatStats.map((stat) => (
                <tr key={stat._id}>
                  <td className="py-2 px-4 border-b text-center">{stat.name}</td>
                  <td className="py-2 px-4 border-b text-center">{stat.click_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Table des animaux */}
      {animalStats.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-6">Consultations des Animaux</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nom de l'Animal</th>
                <th className="py-2 px-4 border-b">Nombre de clics</th>
              </tr>
            </thead>
            <tbody>
              {animalStats.map((stat) => (
                <tr key={stat._id}>
                  <td className="py-2 px-4 border-b text-center">{stat.name}</td>
                  <td className="py-2 px-4 border-b text-center">{stat.click_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Message si aucune donnée n'est disponible */}
      {habitatStats.length === 0 && animalStats.length === 0 && (
        <p className="text-center py-4">Aucune donnée de consultation disponible.</p>
      )}

      {/* Lien de retour au tableau de bord */}
      <div className="mt-6">
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          Retour au tableau de bord
        </Link>
      </div>
    </div>
  );
};

export default Stats;