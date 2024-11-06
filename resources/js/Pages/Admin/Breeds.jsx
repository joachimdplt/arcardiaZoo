import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';

export default function Breeds({ breeds }) {
    const [processing, setProcessing] = useState(false);

    // Fonction pour gérer la suppression d'une race
    const handleDelete = (id) => {
        if (confirm('Voulez-vous vraiment supprimer cette race ?')) {
            setProcessing(true);
            router.delete(`/admin/breeds/${id}`, {
                onFinish: () => setProcessing(false),
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Liste des races</h1>

            {/* Bouton pour ajouter une race */}
            <div className="flex justify-end mb-4">
                <Link
                    href="/admin/breeds/create"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                    Ajouter une race
                </Link>
            </div>

            {/* Tableau des races */}
            <table className="min-w-full bg-white shadow-md rounded my-6">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-3 px-4 border-b text-left">Nom de la race</th>
                        <th className="py-3 px-4 border-b text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {breeds.length > 0 ? (
                        breeds.map(breed => (
                            <tr key={breed.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{breed.label}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleDelete(breed.id)}
                                        className="text-red-500 hover:underline ml-4"
                                        disabled={processing}
                                    >
                                        {processing ? 'Suppression...' : 'Supprimer'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="text-center py-4">
                                Aucune race trouvée
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-6">
                <Link href="/admin/animals" className="text-blue-500 hover:underline">
                    Retour à la liste des animaux
                </Link>
            </div>
        </div>
    );
}