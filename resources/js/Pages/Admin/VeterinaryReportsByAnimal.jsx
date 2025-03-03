import { Link } from '@inertiajs/react';

export default function VeterinaryReportsByAnimal({ animal, reports }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Rapports vétérinaires pour {animal.name}</h1>

            {reports.length > 0 ? (
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Vétérinaire</th>
                            <th className="px-4 py-2">Animal</th>
                            <th className="px-4 py-2">Détails du rapport</th>
                            <th className="px-4 py-2">Commentaire sur l'habitat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.id}>
                                <td className="border px-4 py-2">{new Date(report.date).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{report.user ? `${report.user.name} ${report.user.last_name}` : 'Inconnu'}</td>
                                <td className="border px-4 py-2">{animal.name}</td>
                                <td className="border px-4 py-2">
                                    {report.details ? report.details : 'Pas de détails disponibles'}
                                </td>
                                <td className="border px-4 py-2">
                                    {report.habitat_comment ? report.habitat_comment : 'Pas de commentaire'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun rapport vétérinaire disponible pour cet animal.</p>
            )}

            <div className="mt-6">
                <Link href={`/admin/animals/${animal.id}`} className="text-blue-500 hover:underline">
                    Retour aux détails de l'animal
                </Link>
            </div>
        </div>
    );
}