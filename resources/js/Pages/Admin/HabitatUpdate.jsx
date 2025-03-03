import { useForm, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function HabitatUpdate({ habitat, existingImages }) {
    const { data, setData, post, processing, errors } = useForm({
        name: habitat.name || '',
        description: habitat.description || '',
        location: habitat.location || '',
        comment: habitat.comment || '',
        images: [], // Pour les nouvelles images en tant que fichiers
    });

    const [currentImages, setCurrentImages] = useState(existingImages || []); // Images existantes

    // Fonction pour gérer les fichiers sélectionnés
    function handleImageChange(e) {
        const files = Array.from(e.target.files);
        setData('images', files); // Ajouter les fichiers directement dans useForm
    }

    // Fonction pour supprimer une image existante
    function handleImageDelete(imageId) {
        router.delete(`/admin/habitats/${habitat.id}/images/${imageId}`, {
            onSuccess: () => {
                // Filtrer les images restantes après suppression
                setCurrentImages(currentImages.filter(image => image.id !== imageId));
            },
            onError: (error) => {
                console.error('Erreur lors de la suppression de l\'image', error);
            }
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('_method', 'put');

        // Ajouter les images dans formData
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images[]', data.images[i]);
        }

        router.post(`/admin/habitats/${habitat.id}`, formData);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Modifier l'habitat</h1>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Nom de l'habitat</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Description</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

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
                        <p>Aucune image pour cet habitat.</p>
                    )}
                </div>

                {/* Champ pour l'ajout de nouvelles images */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Ajouter des images</label>
                    <input 
                        type="file"
                        className="w-full p-2 border rounded"
                        multiple
                        onChange={handleImageChange} // Gestion directe des fichiers
                    />
                    {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4"
                    disabled={processing}
                >
                    Modifier habitat
                </button>
            </form>

            <div className="mt-6">
                <Link href="/admin/habitats" className="text-blue-500 hover:underline">
                    Retour à la liste des habitats
                </Link>
            </div>
        </div>
    );
}