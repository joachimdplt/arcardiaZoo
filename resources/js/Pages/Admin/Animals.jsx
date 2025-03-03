import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function Animals({ animals, breeds, habitats, userRoles }) {
    const { delete: destroy, processing } = useForm();

    // Vérifier si l'utilisateur est un admin
    const isAdmin = userRoles.includes('Admin');

    function handleDelete(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet animal ?')) {
            destroy(`/admin/animals/${id}`, {
                onSuccess: () => {
                    console.log('Animal supprimé avec succès');
                }
            });
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Liste des animaux</h1>

            {/* Afficher les boutons d'ajout uniquement pour les administrateurs */}
            {isAdmin && (
                <div className="flex justify-end mb-4 space-x-4">
                    <Link
                        href="/admin/animals/create"
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                    >
                        Ajouter un animal
                    </Link>

                    {/* Bouton pour aller à BreedCreate */}
                    <Link
                        href="/admin/breeds/create"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Ajouter une race
                    </Link>

                    {/* Bouton pour voir BreedShow */}
                    <Link
                        href="/admin/breeds"
                        className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700"
                    >
                        Voir les races
                    </Link>
                </div>
            )}

            <table className="min-w-full bg-white shadow-md rounded my-6">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b text-left">Nom</th>
                        <th className="py-2 px-4 border-b text-left">Race</th>
                        <th className="py-2 px-4 border-b text-left">Habitat(s)</th>
                        <th className="py-2 px-4 border-b text-left">Images</th>
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {animals && animals.length > 0 ? (
                        animals.map(animal => (
                            <tr key={animal.id}>
                                <td className="py-2 px-4 border-b">{animal.name}</td>
                                <td className="py-2 px-4 border-b">{animal.breed ? animal.breed.label : 'Non spécifiée'}</td>
                                <td className="py-2 px-4 border-b">
                                    {animal.habitats && animal.habitats.length > 0 ? (
                                        animal.habitats.map(habitat => (
                                            <span key={habitat.id} className="mr-2">
                                                {habitat.name}
                                            </span>
                                        ))
                                    ) : (
                                        <span>Aucun habitat</span>
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {animal.images && animal.images.length > 0 ? (
                                        animal.images.map(image => (
                                            <img
                                                key={image.id}
                                                src={`/storage/${image.image_data}`}
                                                alt={animal.name}
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                        ))
                                    ) : (
                                        <span>Aucune image</span>
                                    )}
                                </td>

                                <td className="py-2 px-4 border-b">
                                    <div className="flex space-x-4">
                                        <Link
                                            href={`/admin/animals/${animal.id}`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Voir
                                        </Link>
                                        {isAdmin && (
                                        <Link
                                            href={`/admin/animals/${animal.id}/edit`}
                                            className="text-green-500 hover:underline"
                                        >
                                            Modifier
                                        </Link>
                                    )}

                                        {isAdmin && (
                                            <button
                                                onClick={() => handleDelete(animal.id)}
                                                className="text-red-500 hover:underline"
                                                disabled={processing}
                                            >
                                                {processing ? 'Suppression...' : 'Supprimer'}
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="py-4 text-center">
                                Aucun animal trouvé.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-6">
                <Link href="/dashboard" className="text-blue-500 hover:underline">
                    Retour au tableau de bord
                </Link>
            </div>
        </div>
    );
}