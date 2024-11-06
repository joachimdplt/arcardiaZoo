// Dans un formulaire React avec Inertia, le jeton CSRF est ajouté en arrière-plan :
import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';

export default function Reviews({ pendingReviews = [], approvedReviews = [], userRoles = [] }) {
    const [processing, setProcessing] = useState(false);

    // Vérifie si l'utilisateur a le rôle "Employee"
    const isEmployee = userRoles.includes('Employee');

    // Fonction pour approuver un avis
    const approveReview = (id) => {
        if (confirm('Êtes-vous sûr de vouloir approuver cet avis ?')) {
            setProcessing(true);
            router.put(`/admin/reviews/${id}/approve`, {
                onFinish: () => setProcessing(false),
                onError: () => setProcessing(false),
            });
        }
    };

    // Fonction pour supprimer un avis
    const deleteReview = (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
            setProcessing(true);
            router.delete(`/admin/reviews/${id}`, {
                onFinish: () => setProcessing(false),
                onError: () => setProcessing(false),
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Gestion des avis</h1>

            {/* Avis en attente de validation */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Avis à valider</h2>

                {pendingReviews.length > 0 ? (
                    <table className="min-w-full bg-white shadow-md rounded">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-3 px-4 border-b text-left">Utilisateur</th>
                                <th className="py-3 px-4 border-b text-left">Commentaire</th>
                                {isEmployee && <th className="py-3 px-4 border-b text-left">Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {pendingReviews.map((review) => (
                                <tr key={review.id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b align-middle">{review.username}</td>
                                    <td className="py-2 px-4 border-b align-middle">{review.comment}</td>
                                    {isEmployee && (
                                        <td className="py-2 px-4 border-b align-middle flex space-x-4">
                                            <button
                                                onClick={() => approveReview(review.id)}
                                                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700"
                                                disabled={processing}
                                            >
                                                {processing ? 'Validation...' : 'Valider'}
                                            </button>
                                            <button
                                                onClick={() => deleteReview(review.id)}
                                                className="text-red-500 hover:underline"
                                                disabled={processing}
                                            >
                                                {processing ? 'Suppression...' : 'Supprimer'}
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Aucun avis en attente de validation.</p>
                )}
            </section>

            {/* Avis validés */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Avis validés</h2>

                {approvedReviews.length > 0 ? (
                    <table className="min-w-full bg-white shadow-md rounded">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-3 px-4 border-b text-left">Utilisateur</th>
                                <th className="py-3 px-4 border-b text-left">Commentaire</th>
                                {isEmployee && <th className="py-3 px-4 border-b text-left">Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {approvedReviews.map((review) => (
                                <tr key={review.id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b align-middle">{review.username}</td>
                                    <td className="py-2 px-4 border-b align-middle">{review.comment}</td>
                                    {isEmployee && (
                                        <td className="py-2 px-4 border-b align-middle flex space-x-4">
                                            <button
                                                onClick={() => deleteReview(review.id)}
                                                className="text-red-500 hover:underline"
                                                disabled={processing}
                                            >
                                                {processing ? 'Suppression...' : 'Supprimer'}
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Aucun avis validé.</p>
                )}
            </section>

            <div className="mt-6">
                <Link href="/dashboard" className="text-blue-500 hover:underline">
                    Retour au tableau de bord
                </Link>
            </div>
        </div>
    );
}