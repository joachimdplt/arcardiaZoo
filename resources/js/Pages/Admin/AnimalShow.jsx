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
                <p className="mb-2"><strong>Habitats:</strong> {animal.habitats && animal.habitats.length > 0 ? animal.habitats.map(habitat => habitat.name).join(', ') : 'Aucun habitat'}</p>

                {/* Dernier commentaire sur l'habitat */}
                {lastVeterinaryReport?.habitat_comment && (
                    <div className="mt-4 bg-yellow-100 p-4 rounded">
                        <h3 className="text-lg font-bold mb-2">Dernier commentaire sur l'habitat</h3>
                        <p>{lastVeterinaryReport.habitat_comment}</p>
                    </div>
                )}

                {/* Dernier rapport vétérinaire */}
                {lastVeterinaryReport ? (
                    <div className="mt-4 bg-gray-100 p-4 rounded">
                        <h3 className="text-lg font-bold mb-2">Dernier rapport vétérinaire</h3>
                        <p className="mb-2">
                            <strong>Date:</strong> {new Date(lastVeterinaryReport.date).toLocaleDateString()}
                        </p>
                     
                        <p className="mb-2">
                            <strong>Détails:</strong> {lastVeterinaryReport.details || 'Aucun détail'}
                        </p>
                        <p className="mb-2">
                            <strong>État de santé:</strong>{' '}
                            {lastVeterinaryReport.status === 'healthy'
                                ? 'En bonne santé'
                                : lastVeterinaryReport.status === 'sick'
                                ? 'Malade'
                                : lastVeterinaryReport.status === 'critical'
                                ? 'Critique'
                                : 'Non spécifié'}
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-500 mt-4">Aucun rapport vétérinaire disponible.</p>
                )}

                {/* Images */}
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

                {/* Section alimentation */}
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