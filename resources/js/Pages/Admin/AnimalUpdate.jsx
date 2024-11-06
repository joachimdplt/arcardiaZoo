import React, { useState } from 'react';
import { useForm, Link, router } from '@inertiajs/react';

export default function AnimalUpdate({ animal, habitats, existingImages }) {
    // Initialisation du formulaire avec les données actuelles de l'animal
    const { data, setData, post, processing, errors } = useForm({
        name: animal.name || '',
        status: animal.status || '', 
        breed_id: animal.breed_id || '',
        habitat_id: animal.habitats.map(habitat => habitat.id) || [], // Pré-sélectionner l'habitat actuel
        images: [], 
    });

    const [currentImages, setCurrentImages] = useState(existingImages || []); // Images existantes

    // Fonction pour gérer les fichiers sélectionnés
    function handleImageChange(e) {
        const files = Array.from(e.target.files);
        setData('images', files); // Ajouter les fichiers directement dans useForm
    }

    // Fonction pour supprimer une image existante
    function handleImageDelete(imageId) {
        router.delete(`/admin/animals/${animal.id}/images/${imageId}`, {
            onSuccess: () => {
                // Filtrer les images restantes après suppression
                setCurrentImages(currentImages.filter(image => image.id !== imageId));
            },
            onError: (error) => {
                console.error('Erreur lors de la suppression de l\'image', error);
            }
        });
    }

    // Fonction pour soumettre le formulaire
    function handleSubmit(e) {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('status', data.status); 
        formData.append('breed_id', data.breed_id);
        formData.append('habitat_id', data.habitat_id);
        formData.append('_method', 'put');
    
        // Ajouter les images dans formData
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images[]', data.images[i]);
        }
    
        router.post(`/admin/animals/${animal.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Modifier un animal</h1>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
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

                {/* Champ pour le statut */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Statut</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={data.status}
                        onChange={e => setData('status', e.target.value)}
                    />
                    {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                </div>

                {/* Sélection de l'habitat */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Habitat</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={data.habitat_id}
                        onChange={e => setData('habitat_id', e.target.value)} 
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

                {/* Affichage des images actuelles */}
                <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2">Images actuelles</h3>
                    {currentImages.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                            {currentImages.map((image, index) => (
                                <div key={index} className="relative">
                                    <img src={`/storage/${image.image_data}`} alt={image.name} className="w-full h-40 object-cover" />
                                    <button
                                        className="absolute top-0 right-0 bg-red-500 text-white p-2"
                                        onClick={() => handleImageDelete(image.id)}
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Aucune image pour cet animal.</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Ajouter des images</label>
                    <input
                        type="file"
                        className="w-full p-2 border rounded"
                        multiple
                        onChange={handleImageChange} 
                    />
                    {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded mt-4"
                    disabled={processing}
                >
                    {processing ? 'Mise à jour...' : 'Enregistrer les modifications'}
                </button>
            </form>

            <div className="mt-6">
                <Link href={`/admin/animals/${animal.id}`} className="text-blue-500 hover:underline">
                    Retour à l'animal
                </Link>
            </div>
        </div>
    );
}