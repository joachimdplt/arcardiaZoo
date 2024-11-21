import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function Habitats({ habitats, userRoles }) {
    const { delete: destroy, processing } = useForm();

    // Vérifier si l'utilisateur est un administrateur
    const isAdmin = userRoles.includes('Admin');

    function handleDelete(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet habitat ?')) {
            destroy(`/admin/habitats/${id}`, {
                onSuccess: () => {
                    console.log('Habitat supprimé avec succès');
                }
            });
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Liste des habitats</h1>

            {/* Bouton pour ajouter un habitat, visible uniquement pour les administrateurs */}
            {isAdmin && (
                <div className="flex justify-end mb-4">
                    <Link
                        href="/admin/habitats/create"
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                    >
                        Ajouter un habitat
                    </Link>
                </div>
            )}

            <table className="min-w-full bg-white shadow-md rounded my-6">
                <thead>
                    <tr className='bg-gray-200'>
                        <th className="py-2 px-4 border-b text-left">Nom</th>
                        <th className="py-2 px-4 border-b text-left">Description</th>
                        <th className="py-2 px-4 border-b text-left">Images</th> {/* Nouvelle colonne pour les images */}
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr> 
                </thead>
                <tbody>
                    {habitats.map(habitat => (
                        <tr key={habitat.id}>
                            <td className="py-2 px-4 border-b">{habitat.name}</td>
                            <td className="py-2 px-4 border-b">{habitat.description}</td>

                            {/* Colonne pour les images associées */}
                            <td className="py-2 px-4 border-b">
                                {habitat.images.length > 0 ? (
                                    habitat.images.map(image => (
                                        <img
                                            key={image.id}
                                            src={`/storage/${image.image_data}`}
                                            alt={habitat.name}
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
                                        href={`/admin/habitats/${habitat.id}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Voir
                                    </Link>
                                    {/* Boutons de modification et suppression visibles uniquement pour les administrateurs */}
                                    {isAdmin && (
                                        <>
                                            <Link
                                                href={`/admin/habitats/${habitat.id}/edit`}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Modifier
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(habitat.id)}
                                                className="text-red-500 hover:underline"
                                                disabled={processing}
                                            >
                                                {processing ? 'Suppression...' : 'Supprimer'}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
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