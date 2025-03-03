import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function Services({ services }) {
    const { delete: destroy, processing } = useForm();

    function handleDelete(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
            destroy(`/admin/services/${id}`, {
                onSuccess: () => {
                    console.log('Service supprimé avec succès');
                }
            });
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Liste des services</h1>

            {/* Bouton pour ajouter un service */}
            <div className="flex justify-end mb-4">
                <Link
                    href="/admin/services/create"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                    Ajouter un service
                </Link>
            </div>

            {/* Tableau des services */}
            <table className="min-w-full bg-white shadow-md rounded my-6">
                <thead>
                    <tr className='bg-gray-200'>
                        <th className="py-3 px-4 border-b text-left">Nom</th>
                        <th className="py-3 px-4 border-b text-left">Description</th>
                        <th className="py-3 px-4 border-b text-left">Heure de début</th>
                        <th className="py-3 px-4 border-b text-left">Heure de fin</th>
                        <th className="py-2 px-4 border-b text-left">Images</th> 
                        <th className="py-3 px-4 border-b text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.length > 0 ? (
                        services.map(service => (
                            <tr key={service.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b align-middle">{service.name}</td>
                                <td className="py-2 px-4 border-b align-middle">{service.description}</td>
                                <td className="py-2 px-4 border-b align-middle">
                                    {service.start_time ? service.start_time : 'Non spécifié'}
                                </td>
                                <td className="py-2 px-4 border-b align-middle">
                                    {service.end_time ? service.end_time : 'Non spécifié'}
                                </td>

                                {/* Colonne pour les images associées */}
                                <td className="py-2 px-4 border-b align-middle">
                                    {service.images.length > 0 ? (
                                        service.images.map(image => (
                                            <img
                                                key={image.id}
                                                src={`/storage/${image.image_data}`} 
                                                alt={service.name}
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                        ))
                                    ) : (
                                        <span>Aucune image</span>
                                    )}
                                </td>

                                <td className="py-2 px-4 border-b align-middle">
                                    <Link
                                        href={`/admin/services/${service.id}/edit`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Modifier
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(service.id)}
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
                            <td colSpan="6" className="text-center py-4">
                                Aucun service trouvé
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