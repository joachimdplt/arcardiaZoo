import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function VeterinaryReportCreate({ animals = [], veterinarians = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        date: '',
        details: '', // Champ pour les détails du rapport
        animal_id: '',
        user_id: '', // Vétérinaire assigné
        habitat_id: '',  // Champ pour l'habitat (lecture seule pour l'habitat par défaut)
        habitat_comment: '', // Champ pour le commentaire sur l'habitat
        feed_type: '', // Type d'alimentation recommandé
        feed_quantity: '' // Quantité de nourriture recommandée
    });

    const [habitats, setHabitats] = useState([]);
    const [selectedHabitat, setSelectedHabitat] = useState('');

    // Fonction pour charger l'habitat actuel de l'animal sélectionné
    const handleAnimalChange = async (e) => {
        const animalId = e.target.value;
        setData('animal_id', animalId);
        
        if (animalId) {
            // Requête pour charger l’habitat actuel de l’animal
            const response = await fetch(`/admin/animals/${animalId}/current-habitat`);
            const data = await response.json();

            // Définir l'habitat actuel pour l'animal sélectionné
            setSelectedHabitat(data.current_habitat);
            setData('habitat_id', data.current_habitat?.id || ''); // Définit l'ID de l'habitat actuel
        } else {
            setSelectedHabitat('');
            setData('habitat_id', '');
        }
    };

    // Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/veterinary-reports', data);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Créer un rapport vétérinaire</h1>

            <form onSubmit={handleSubmit}>
                {/* Champ Date */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Date</label>
                    <input
                        type="date"
                        className="w-full p-2 border rounded"
                        value={data.date}
                        onChange={(e) => setData('date', e.target.value)}
                    />
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                </div>

                {/* Sélection d'un Animal */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Animal</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={data.animal_id}
                        onChange={handleAnimalChange}
                    >
                        <option value="">Sélectionner un animal</option>
                        {animals.map((animal) => (
                            <option key={animal.id} value={animal.id}>
                                {animal.name}
                            </option>
                        ))}
                    </select>
                    {errors.animal_id && <p className="text-red-500 text-xs mt-1">{errors.animal_id}</p>}
                </div>

               

                {/* Commentaire sur l'habitat */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Commentaire sur l'habitat</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        value={data.habitat_comment}
                        onChange={(e) => setData('habitat_comment', e.target.value)}
                    />
                    {errors.habitat_comment && <p className="text-red-500 text-xs mt-1">{errors.habitat_comment}</p>}
                </div>

                {/* Détails du rapport */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Détails du rapport</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        value={data.details}
                        onChange={(e) => setData('details', e.target.value)}
                    />
                    {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details}</p>}
                </div>

                {/* Type d'alimentation recommandé */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Type d'alimentation recommandé</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={data.feed_type}
                        onChange={(e) => setData('feed_type', e.target.value)}
                    />
                    {errors.feed_type && <p className="text-red-500 text-xs mt-1">{errors.feed_type}</p>}
                </div>

                {/* Quantité de nourriture */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Quantité de nourriture</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={data.feed_quantity}
                        onChange={(e) => setData('feed_quantity', e.target.value)}
                    />
                    {errors.feed_quantity && <p className="text-red-500 text-xs mt-1">{errors.feed_quantity}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    disabled={processing}
                >
                    Créer un rapport
                </button>
            </form>

            <div className="mt-6">
                <Link href="/dashboard" className="text-blue-500 hover:underline">
                    Retour au tableau de bord
                </Link>
            </div>
        </div>
    );
}