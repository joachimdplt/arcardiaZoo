import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function VeterinaryReportUpdate({ report, animals, veterinarians }) {
    const { data, setData, put, processing, errors } = useForm({
        date: report.date || '',
        details: report.details || '',
        animal_id: report.animal_id || '',
        user_id: report.user_id || '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(`/admin/veterinary-reports/${report.id}`);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Modifier le rapport vétérinaire</h1>

            <form onSubmit={handleSubmit}>
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

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Détails</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        value={data.details}
                        onChange={e => setData('details', e.target.value)}
                    />
                    {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Commentaire sur l'habitat</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        value={data.habitat_comment}
                        onChange={(e) => setData('habitat_comment', e.target.value)}
                    />
                    {errors.habitat_comment && <p className="text-red-500 text-xs mt-1">{errors.habitat_comment}</p>}
                </div>

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