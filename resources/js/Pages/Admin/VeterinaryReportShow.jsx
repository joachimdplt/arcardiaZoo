import React from 'react';
import { Link } from '@inertiajs/react';

export default function VeterinaryReportShow({ report }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Détails du rapport vétérinaire</h1>

            <div className="bg-white shadow-md rounded p-6">
                <h2 className="text-2xl font-bold mb-4">Date: {new Date(report.date).toLocaleDateString()}</h2>

                {/* Informations sur l'animal */}
                <p className="mb-2"><strong>Animal:</strong> {report.animal ? report.animal.name : 'Aucun'}</p>

                {/* Informations sur le vétérinaire */}
                <p className="mb-2"><strong>Vétérinaire:</strong> {report.user ? report.user.name : 'N/A'}</p>

                {/* Détails du rapport */}
                <p className="mb-2"><strong>Détails:</strong> {report.details}</p>

                {/* Affichage du commentaire sur l'habitat */}
                <p className="mb-2"><strong>Commentaire sur l'habitat:</strong> {report.habitat_comment || 'Aucun commentaire'}</p>
            </div>

            <div className="mt-6">
                <Link href="/admin/veterinary-reports" className="text-blue-500 hover:underline">
                    Retour à la liste des rapports
                </Link>
            </div>
        </div>
    );
}