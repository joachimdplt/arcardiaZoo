import React from 'react';
import { Link } from '@inertiajs/react';

export default function HabitatShow({ habitat }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Détails de l'habitat</h1>

            <div className="bg-white shadow-md rounded p-6">
                <h2 className="text-2xl font-bold mb-4">Nom: {habitat.name}</h2>
                <p className="mb-2"><strong>Description:</strong> {habitat.description}</p>

                {/* Animaux associés */}
                <p className="mb-2"><strong>Animaux associés:</strong></p>
                {habitat.animals && habitat.animals.length > 0 ? (
                    <ul>
                        {habitat.animals.map(animal => (
                            <li key={animal.id} className="mb-1 text-blue-500">
                                {animal.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun animal associé</p>
                )}

                {/* Images associées */}
                <p className="mt-4 mb-2"><strong>Images associées:</strong></p>
                {habitat.images && habitat.images.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {habitat.images.map(image => (
                            <div key={image.id} className="mb-4">
                                <img
                                    src={`/storage/${image.image_data}`}
                                    alt={image.name}
                                    className="w-full h-auto rounded shadow-md"
                                />
                                <p className="mt-2 text-center">{image.name}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Aucune image associée</p>
                )}
            </div>

            <div className="mt-6">
                <Link href="/admin/habitats" className="text-blue-500 hover:underline">
                    Retour à la liste des habitats
                </Link>
            </div>
        </div>
    );
}