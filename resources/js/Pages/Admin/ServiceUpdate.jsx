import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';

export default function ServiceUpdate({ service, existingImages }) {
    const [data, setData] = useState({
        name: service.name || '',
        description: service.description || '',
        start_time: service.start_time || '',
        end_time: service.end_time || '',
        is_visible: service.is_visible || true,
        images: [],
    });

    const [currentImages, setCurrentImages] = useState(existingImages || []); // Images existantes

     // Fonction pour supprimer une image existante
     function handleImageDelete(imageId) {
        router.delete(`/admin/services/${service.id}/images/${imageId}`, {
            onSuccess: () => {
                // Filtrer les images restantes après suppression
                setCurrentImages(currentImages.filter(image => image.id !== imageId));
            },
            onError: (error) => {
                console.error('Erreur lors de la suppression de l\'image', error);
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);

        // Vérifier et formater start_time et end_time pour être sûr qu'ils sont au format H:i
        if (data.start_time) {
            formData.append('start_time', formatTime(data.start_time));
        }

        if (data.end_time) {
            formData.append('end_time', formatTime(data.end_time));
        }

        // Envoyer true ou false pour is_visible
        // FormData doit envoyer une valeur booléenne, pas une chaîne de caractères
        formData.append('is_visible', data.is_visible ? 1 : 0); // 1 pour true, 0 pour false
        formData.append('_method', 'put');

        // Ajouter les images au FormData
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images[]', data.images[i]);
            console.log('Image ajoutée :', data.images[i].name); // Log pour chaque image
        }

        // Envoyer la requête avec Inertia
        router.post(`/admin/services/${service.id}`, formData, {
            forceFormData: true,
            onSuccess: () => {
                console.log('Service mis à jour avec succès');
            },
            onError: (errors) => {
                console.error('Erreur lors de la mise à jour du service', errors);
            },
        });
    };

    // Fonction pour formater l'heure au format H:i (00:00 - 23:59)
    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        const validHours = hours.padStart(2, '0'); // S'assurer que les heures ont 2 chiffres
        const validMinutes = minutes.padStart(2, '0'); // S'assurer que les minutes ont 2 chiffres
        return `${validHours}:${validMinutes}`;
    };

    // Gestion des fichiers sélectionnés
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setData((prevData) => ({
            ...prevData,
            images: files,
        }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Modifier le service</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Nom du service</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Description</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        value={data.description}
                        onChange={(e) => setData({ ...data, description: e.target.value })}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Heure de début</label>
                    <input
                        type="time"
                        className="w-full p-2 border rounded"
                        value={data.start_time}
                        onChange={(e) => setData({ ...data, start_time: e.target.value })}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Heure de fin</label>
                    <input
                        type="time"
                        className="w-full p-2 border rounded"
                        value={data.end_time}
                        onChange={(e) => setData({ ...data, end_time: e.target.value })}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Visible</label>
                    <input
                        type="checkbox"
                        checked={data.is_visible}
                        onChange={(e) => setData({ ...data, is_visible: e.target.checked })}
                    />
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
                        <p>Aucune image pour cet habitat.</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Télécharger des images</label>
                    <input
                        type="file"
                        multiple
                        className="w-full p-2 border rounded"
                        onChange={handleImageChange}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    disabled={false}
                >
                    Modifier le service
                </button>
            </form>
            <div className="mt-6">
                <Link href="/admin/services" className="text-blue-500 hover:underline">
                    Retour à la liste des habitats
                </Link>
            </div>

        </div>
    );
}