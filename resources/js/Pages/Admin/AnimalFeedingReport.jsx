import React from 'react';
import { Link } from '@inertiajs/react';

export default function AnimalFeedingReport({ animal, feedings }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Rapport d'alimentation pour {animal.name}</h1>

            <table className="table-auto w-full mt-4">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Heure</th>
                        <th className="px-4 py-2">Type d'alimentation</th>
                        <th className="px-4 py-2">Quantité</th>
                        <th className="px-4 py-2">Nourri par</th>
                    </tr>
                </thead>
                <tbody>
                    {feedings.map((feeding, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{feeding.feed_date}</td>
                            <td className="border px-4 py-2">{feeding.feed_time}</td>
                            <td className="border px-4 py-2">{feeding.feed_type}</td>
                            <td className="border px-4 py-2">{feeding.feed_quantity} g</td>
                            <td className="border px-4 py-2">
                                {feeding.user ? feeding.user.name : 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-6">
                <Link href={`/admin/animals`} className="text-blue-500 hover:underline">
                    Retour à la liste des animaux
                </Link>
            </div>
        </div>
    );
}