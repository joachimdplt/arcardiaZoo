import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function VeterinaryReportUpdate({ report, animals, veterinarians, statuses }) {
    const { data, setData, put, processing, errors } = useForm({
        date: report.date || '',
        details: report.details || '',
        animal_id: report.animal_id || '',
        user_id: report.user_id || '',
        habitat_comment: report.habitat_comment || '',
        feed_type: report.feed_type || '',
        feed_quantity: report.feed_quantity || '',
        status: report.status || '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(`/admin/veterinary-reports/${report.id}`);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Modifier le rapport vétérinaire</h1>

            <form onSubmit={handleSubmit}>
                {/* Date */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Date</label>
                    <input
                        type="date"
                        className="w-full p-2 border rounded"
                        value={data.date}
                        onChange={e => setData('date', e.target.value)}
                    />
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                </div>

                {/* Détails */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Détails</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        value={data.details}
                        onChange={e => setData('details', e.target.value)}
                    />
                    {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details}</p>}
                </div>

                {/* Commentaire sur l'habitat */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Commentaire sur l'habitat</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        value={data.habitat_comment}
                        onChange={e => setData('habitat_comment', e.target.value)}
                    />
                    {errors.habitat_comment && <p className="text-red-500 text-xs mt-1">{errors.habitat_comment}</p>}
                </div>

                {/* Animal */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Animal</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={data.animal_id}
                        onChange={e => setData('animal_id', e.target.value)}
                    >
                        <option value="">Sélectionner un animal</option>
                        {animals.map(animal => (
                            <option key={animal.id} value={animal.id}>
                                {animal.name}
                            </option>
                        ))}
                    </select>
                    {errors.animal_id && <p className="text-red-500 text-xs mt-1">{errors.animal_id}</p>}
                </div>

                {/* Type de nourriture */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Type de nourriture</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={data.feed_type}
                        onChange={e => setData('feed_type', e.target.value)}
                    />
                    {errors.feed_type && <p className="text-red-500 text-xs mt-1">{errors.feed_type}</p>}
                </div>

                {/* Quantité de nourriture */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Quantité de nourriture (en grammes)</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={data.feed_quantity}
                        onChange={e => setData('feed_quantity', e.target.value)}
                    />
                    {errors.feed_quantity && <p className="text-red-500 text-xs mt-1">{errors.feed_quantity}</p>}
                </div>

                {/* Statut */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">État de santé</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={data.status}
                        onChange={e => setData('status', e.target.value)}
                    >
                        <option value="">Sélectionner un état de santé</option>
                        {statuses.map(status => (
                            <option key={status} value={status}>
                                {status === 'healthy' ? 'En bonne santé' : status === 'sick' ? 'Malade' : 'Critique'}
                            </option>
                        ))}
                    </select>
                    {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                </div>

                {/* Bouton de soumission */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded mt-4"
                    disabled={processing}
                >
                    Enregistrer les modifications
                </button>
            </form>

            <div className="mt-6">
                <Link href="/admin/veterinary-reports" className="text-blue-500 hover:underline">
                    Retour à la liste des rapports
                </Link>
            </div>
        </div>
    );
}