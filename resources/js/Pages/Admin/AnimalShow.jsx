import { Link } from '@inertiajs/react';
import { useState } from 'react';
import AnimalFood from './AnimalFood';
import AnimalFeedingForm from './AnimalFeedingForm';

export default function AnimalShow({ animal, lastVeterinaryReport, userRoles }) {
    const [showFeedingForm, setShowFeedingForm] = useState(false);
    const isEmployee = userRoles.includes('Employee');
    const isAdmin = userRoles.includes('Admin');

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Détails de l'animal</h1>

            <div className="bg-white shadow-md rounded p-6">
                <h2 className="text-2xl font-bold mb-4">Nom: {animal.name}</h2>
                <p className="mb-2"><strong>Race:</strong> {animal.breed ? animal.breed.label : 'N/A'}</p>
                <p className="mb-2"><strong>Statut:</strong> {animal.status}</p>
                <p className="mb-2"><strong>Habitats:</strong> {animal.habitats && animal.habitats.length > 0 ? animal.habitats.map(habitat => habitat.name).join(', ') : 'Aucun habitat'}</p>

                <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2">Commentaire(s) sur l'habitat:</h3>
                    {animal.habitats && animal.habitats.length > 0 ? (
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Nom de l'habitat</th>
                                    <th className="px-4 py-2">Commentaire</th>
                                </tr>
                            </thead>
                            <tbody>
                                {animal.habitats.map((habitat) => (
                                    <tr key={habitat.id}>
                                        <td className="border px-4 py-2">{habitat.name}</td>
                                        <td className="border px-4 py-2">{habitat.comment ? habitat.comment : 'Aucun commentaire'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Aucun habitat pour cet animal.</p>
                    )}
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2">Images:</h3>
                    {animal.images && animal.images.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {animal.images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={`/storage/${image.image_data}`}
                                        alt={image.name}
                                        className="w-full h-40 object-cover rounded"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Aucune image pour cet animal.</p>
                    )}
                </div>

                {lastVeterinaryReport && (
                    <AnimalFood 
                        feedType={lastVeterinaryReport.feed_type} 
                        feedQuantity={lastVeterinaryReport.feed_quantity} 
                    />
                )}

                {isEmployee && (
                    <div className="mt-4">
                        <button
                            onClick={() => setShowFeedingForm(!showFeedingForm)}
                            className={`px-4 py-2 rounded ${lastVeterinaryReport ? 'bg-green-500 text-white hover:bg-green-700' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                            disabled={!lastVeterinaryReport} 
                        >
                            {showFeedingForm ? "Fermer le formulaire d'alimentation" : "Nourrir l'animal"}
                        </button>
                    </div>
                )}

                {showFeedingForm && lastVeterinaryReport && isEmployee && (
                    <AnimalFeedingForm 
                        animalId={animal.id} 
                        feedType={lastVeterinaryReport.feed_type} 
                        feedQuantity={lastVeterinaryReport.feed_quantity} 
                    />
                )}

                <div className="mt-4 flex space-x-4">
                    <Link
                        href={`/admin/animals/${animal.id}/feedings`}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Voir les alimentations
                    </Link>

                    <Link
                        href={`/admin/animals/${animal.id}/veterinary-reports`}
                        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                        Voir les rapports vétérinaires
                    </Link>

                    {isAdmin && (
                        <Link
                            href={`/admin/animals/${animal.id}/edit`}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Modifier Statut
                        </Link>
                    )}
                </div>
            </div>

            <div className="mt-6">
                <Link href="/admin/animals" className="text-blue-500 hover:underline">
                    Retour à la liste des animaux
                </Link>
            </div>
        </div>
    );
}