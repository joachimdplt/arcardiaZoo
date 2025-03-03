import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function ServiceCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        start_time: '',
        end_time: '',
        is_visible: true,
        images: [], 
    });

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('start_time', data.start_time);
        formData.append('end_time', data.end_time);

        // Ajouter les images dans formData
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images[]', data.images[i]);
        }

        post('/admin/services', {
            data: formData,
            onError: () => {
                console.log('Erreur lors de la soumission du formulaire');
            }
        });
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Ajouter un service</h1>

            <form onSubmit={handleSubmit}>
                {/* Champ Nom du service */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Nom du service</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Champ Description */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Description</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                {/* Champ Heure de début */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Heure de début</label>
                    <input
                        type="time"
                        className="w-full p-2 border rounded"
                        value={data.start_time}
                        onChange={e => setData('start_time', e.target.value)}
                    />
                    {errors.start_time && <p className="text-red-500 text-xs mt-1">{errors.start_time}</p>}
                </div>

                {/* Champ Heure de fin */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Heure de fin</label>
                    <input
                        type="time"
                        className="w-full p-2 border rounded"
                        value={data.end_time}
                        onChange={e => setData('end_time', e.target.value)}
                    />
                    {errors.end_time && <p className="text-red-500 text-xs mt-1">{errors.end_time}</p>}
                </div>

                {/* Champ Visibilité */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Visible</label>
                    <input
                        type="checkbox"
                        checked={data.is_visible}
                        onChange={e => setData('is_visible', e.target.checked)}
                    />
                </div>
                
                 {/* Champ pour télécharger les images */}
                 <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Télécharger des images</label>
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
                    Ajouter le service
                </button>
            </form>

            <div className="mt-6">
                <Link href="/admin/services" className="text-blue-500 hover:underline">
                    Retour à la liste des services
                </Link>
            </div>
        </div>
    );
}