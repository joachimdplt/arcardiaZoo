import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function VeterinaryReportCreate({ animals = [], veterinarians = [], statuses = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        date: '',
        details: '',
        animal_id: '',
        user_id: '',
        habitat_id: '',
        habitat_comment: '',
        feed_type: '',
        feed_quantity: '',
        status: '', // Champ pour le statut
    });

    const [selectedHabitat, setSelectedHabitat] = useState('');

    const handleAnimalChange = async (e) => {
        const animalId = e.target.value;
        setData('animal_id', animalId);

        if (animalId) {
            const response = await fetch(`/admin/animals/${animalId}/current-habitat`);
            const data = await response.json();

            setSelectedHabitat(data.current_habitat);
            setData('habitat_id', data.current_habitat?.id || '');
        } else {
            setSelectedHabitat('');
            setData('habitat_id', '');
        }
    };

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

                {/* Champ pour le statut */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">État de santé</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                    >
                        <option value="">Sélectionner un état de santé</option>
                        {statuses.map((status) => (
                            <option key={status} value={status}>
                                {status === 'healthy' ? 'En bonne santé' : status === 'sick' ? 'Malade' : 'Critique'}
                            </option>
                        ))}
                    </select>
                    {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
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