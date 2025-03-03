import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function HabitatCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        images: [], 
    });

    function handleFileChange(e) {
        setData('images', Array.from(e.target.files)); // ✅ Convertir FileList en tableau
    }

    function handleSubmit(e) {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
    
        if (data.images.length > 0) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append(`images[]`, data.images[i]); // ✅ Correction ici
            }
        }
    
        console.log("🚀 Données envoyées :", Object.fromEntries(formData)); // 🔥 Voir si les données sont envoyées
    
        post('/admin/habitats', formData, {
            forceFormData: true, // ✅ Obligatoire pour envoyer FormData
            onSuccess: () => console.log('✅ Habitat créé avec succès !'),
            onError: (err) => console.log('❌ Erreur :', err)
        });
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Ajouter un habitat</h1>

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

                {/* Champ pour télécharger les images */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Télécharger des images</label>
                    <input
                        type="file"
                        multiple
                        className="w-full p-2 border rounded"
                        onChange={handleFileChange} // ✅ Correction du `onChange`
                    />
                    {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mt-4"
                    disabled={processing}
                >
                    Ajouter habitat
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