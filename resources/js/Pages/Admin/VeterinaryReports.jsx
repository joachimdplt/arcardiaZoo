import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

export default function VeterinaryReports({ reports = [], animals = [] }) {
    const { userRoles } = usePage().props;
    const [processing, setProcessing] = useState(false);
    const [selectedAnimal, setSelectedAnimal] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const isAdminOrEmployee = userRoles.includes('Admin') || userRoles.includes('Employee');

    const handleDelete = (id) => {
        if (confirm('Voulez-vous vraiment supprimer ce rapport vétérinaire ?')) {
            setProcessing(true);
            router.delete(`/admin/veterinary-reports/${id}`, {
                onFinish: () => setProcessing(false),
                onError: () => setProcessing(false),
            });
        }
    };

    const filteredReports = reports.filter((report) => {
        const matchesAnimal = selectedAnimal ? report.animal?.id === parseInt(selectedAnimal) : true;
        const matchesDate = selectedDate ? report.date === selectedDate : true;
        return matchesAnimal && matchesDate;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Liste des rapports vétérinaires</h1>

            <div className="mb-6 flex space-x-4">
                <div>
                    <label htmlFor="animal" className="block mb-1 font-bold">Filtrer par animal</label>
                    <select
                        id="animal"
                        className="p-2 border rounded w-full"
                        value={selectedAnimal}
                        onChange={(e) => setSelectedAnimal(e.target.value)}
                    >
                        <option value="">Tous les animaux</option>
                        {animals.map((animal) => (
                            <option key={animal.id} value={animal.id}>
                                {animal.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="date" className="block mb-1 font-bold">Filtrer par date</label>
                    <input
                        id="date"
                        type="date"
                        className="p-2 border rounded w-full"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>
            </div>

            {!isAdminOrEmployee && (
                <div className="flex justify-end mb-4">
                    <Link
                        href="/admin/veterinary-reports/create"
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                    >
                        Ajouter un rapport vétérinaire
                    </Link>
                </div>
            )}

            <table className="min-w-full bg-white shadow-md rounded my-6">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-3 px-4 border-b text-left">Date</th>
                        <th className="py-3 px-4 border-b text-left">Animal</th>
                        <th className="py-3 px-4 border-b text-left">Vétérinaire</th>
                        <th className="py-3 px-4 border-b text-left">Détails</th>
                        <th className="py-3 px-4 border-b text-left">Type de nourriture</th>
                        <th className="py-3 px-4 border-b text-left">Quantité de nourriture</th>
                        <th className="py-3 px-4 border-b text-left">Habitat</th>
                        <th className="py-3 px-4 border-b text-left">Commentaire habitat</th>
                        <th className="py-3 px-4 border-b text-left">Statut</th> {/* Nouvelle colonne */}
                        <th className="py-3 px-4 border-b text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReports.length > 0 ? (
                        filteredReports.map((report) => (
                            <tr key={report.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b align-middle">{new Date(report.date).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b align-middle">{report.animal ? report.animal.name : 'Aucun'}</td>
                                <td className="py-2 px-4 border-b align-middle">{report.user ? report.user.name : 'N/A'}</td>
                                <td className="py-2 px-4 border-b align-middle">{report.details}</td>
                                <td className="py-2 px-4 border-b align-middle">{report.feed_type}</td>
                                <td className="py-2 px-4 border-b align-middle">{report.feed_quantity}</td>
                                <td className="py-2 px-4 border-b align-middle">
                                    {report.animal && report.animal.habitats.length > 0
                                        ? report.animal.habitats.map(habitat => habitat.name).join(', ')
                                        : 'Aucun habitat'}
                                </td>
                                <td className="py-2 px-4 border-b align-middle">{report.habitat_comment}</td>
                                <td className="py-2 px-4 border-b align-middle">
                                    {report.status === 'healthy'
                                        ? 'En bonne santé'
                                        : report.status === 'sick'
                                        ? 'Malade'
                                        : 'Critique'}
                                </td> {/* Affichage du statut */}
                                <td className="py-2 px-4 border-b align-middle flex space-x-4">
                                    <Link
                                        href={`/admin/veterinary-reports/${report.id}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Voir
                                    </Link>
                                    {!isAdminOrEmployee && (
                                        <>
                                            <Link
                                                href={`/admin/veterinary-reports/${report.id}/edit`}
                                                className="text-yellow-500 hover:underline"
                                            >
                                                Modifier
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(report.id)}
                                                className="text-red-500 hover:underline"
                                                disabled={processing}
                                            >
                                                {processing ? 'Suppression...' : 'Supprimer'}
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="text-center py-4">
                                Aucun rapport trouvé
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-6">
                <Link href="/dashboard" className="text-blue-500 hover:underline">
                    Retour au tableau de bord
                </Link>
            </div>
        </div>
    );
}