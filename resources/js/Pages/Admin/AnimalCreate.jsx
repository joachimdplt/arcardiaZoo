import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function AnimalCreate({ breeds, habitats }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        breed_id: '',
        images: [],  // Champ pour les images
        habitat_id: '',
    });

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('breed_id', data.breed_id);
        formData.append('habitat_id', data.habitat_id);

        // Ajouter les images dans formData
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images[]', data.images[i]);
        }

        // Utilisez formData directement sans le passer dans un objet `data`
        post('/admin/animals', formData, {
            onError: () => {
                console.log('Erreur lors de la soumission du formulaire');
            }
        });
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Ajouter un animal</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Nom de l'animal</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Race</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={data.breed_id}
                        onChange={e => setData('breed_id', e.target.value)}
                    >
                        <option value="">Sélectionner une race</option>
                        {breeds.map(breed => (
                            <option key={breed.id} value={breed.id}>
                                {breed.label}
                            </option>
                        ))}
                    </select>
                    {errors.breed_id && <p className="text-red-500 text-xs mt-1">{errors.breed_id}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Habitat</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={data.habitat_id}
                        onChange={e => setData('habitat_id', [e.target.value])} // Mettez cette ligne ici
                    >
                        <option value="">Sélectionner un habitat</option>
                        {habitats.map(habitat => (
                            <option key={habitat.id} value={habitat.id}>
                                {habitat.name}
                            </option>
                        ))}
                    </select>
                    {errors.habitat_id && <p className="text-red-500 text-xs mt-1">{errors.habitat_id}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Image</label>
                    <input
                        type="file"
                        multiple
                        className="w-full p-2 border rounded"
                        onChange={e => setData('images', e.target.files)}
                    />
                    {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mt-4"
                    disabled={processing}
                >
                    Ajouter l'animal
                </button>
            </form>

            <div className="mt-6">
                <Link href="/admin/animals" className="text-blue-500 hover:underline">
                    Retour à la liste des animaux
                </Link>
            </div>
        </div>
    );
}