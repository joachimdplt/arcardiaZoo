import React from 'react';
import { useForm } from '@inertiajs/react';

export default function AnimalFeedingForm({ animalId, feedType, feedQuantity }) {
    const { data, setData, post, processing, errors } = useForm({
        feed_date: new Date().toISOString().slice(0, 10), // Date actuelle par défaut
        feed_time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        feed_type: feedType || '', // Utilisation de feedType en tant que valeur par défaut
        feed_quantity: feedQuantity || 0, // Utilisation de feedQuantity en tant que valeur par défaut
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/animals/${animalId}/feedings`, {
            onSuccess: () => alert('Alimentation enregistrée avec succès'),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow-md mt-4">
            <h2 className="text-xl font-bold mb-4">Enregistrer une alimentation</h2>
            
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Date</label>
                <input
                    type="date"
                    value={data.feed_date}
                    onChange={(e) => setData('feed_date', e.target.value)}
                    className="w-full p-2 border rounded"
                />
                {errors.feed_date && <p className="text-red-500 text-xs">{errors.feed_date}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Heure</label>
                <input
                    type="time"
                    value={data.feed_time}
                    onChange={(e) => setData('feed_time', e.target.value)}
                    className="w-full p-2 border rounded"
                />
                {errors.feed_time && <p className="text-red-500 text-xs">{errors.feed_time}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Type d'alimentation</label>
                <input
                    type="text"
                    value={data.feed_type}
                    onChange={(e) => setData('feed_type', e.target.value)}
                    className="w-full p-2 border rounded"
                />
                {errors.feed_type && <p className="text-red-500 text-xs">{errors.feed_type}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Quantité</label>
                <input
                    type="number"
                    value={data.feed_quantity}
                    onChange={(e) => setData('feed_quantity', e.target.value)}
                    className="w-full p-2 border rounded"
                />
                {errors.feed_quantity && <p className="text-red-500 text-xs">{errors.feed_quantity}</p>}
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={processing}>
                Enregistrer
            </button>
        </form>
    );
}