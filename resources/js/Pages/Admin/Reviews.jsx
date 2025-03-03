import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';

export default function Reviews({ pendingReviews = [], approvedReviews = [], userRoles = [] }) {
    const [loadingIds, setLoadingIds] = useState({}); // Suivre l'état de chargement par ID d'avis

    // Vérifier si l'utilisateur a le rôle "Employé"
    const isEmployee = userRoles.includes('Employee');

    // Fonction pour approuver un avis
    const approveReview = (id) => {
        if (confirm('Êtes-vous sûr de vouloir approuver cet avis ?')) {
            setLoadingIds((prev) => ({ ...prev, [id]: true }));
            router.put(`/admin/reviews/${id}/approve`, {}, {
                onFinish: () => setLoadingIds((prev) => ({ ...prev, [id]: false })),
                onError: () => setLoadingIds((prev) => ({ ...prev, [id]: false })),
            });
        }
    };

    // Fonction pour supprimer un avis
    const deleteReview = (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
            setLoadingIds((prev) => ({ ...prev, [id]: true }));
            router.delete(`/admin/reviews/${id}`, {
                onFinish: () => setLoadingIds((prev) => ({ ...prev, [id]: false })),
                onError: () => setLoadingIds((prev) => ({ ...prev, [id]: false })),
            });
        }
    };

    // Composant pour afficher les actions sur les avis
    const ReviewActions = ({ id, isApproved }) => (
        <td className="py-2 px-4 border-b align-middle flex space-x-4">
            {!isApproved && (
                <button
                    onClick={() => approveReview(id)}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700"
                    disabled={loadingIds[id]}
                >
                    {loadingIds[id] ? 'Validation...' : 'Valider'}
                </button>
            )}
            <button
                onClick={() => deleteReview(id)}
                className="text-red-500 hover:underline"
                disabled={loadingIds[id]}
            >
                {loadingIds[id] ? 'Suppression...' : 'Supprimer'}
            </button>
        </td>
    );

    // Composant pour afficher un tableau d'avis
    const ReviewsTable = ({ reviews, isApproved }) => (
        <table className="min-w-full bg-white shadow-md rounded">
            <thead>
                <tr className="bg-gray-200">
                    <th className="py-3 px-4 border-b text-left">Utilisateur</th>
                    <th className="py-3 px-4 border-b text-left">Commentaire</th>
                    {isEmployee && <th className="py-3 px-4 border-b text-left">Actions</th>}
                </tr>
            </thead>
            <tbody>
                {reviews.map((review) => (
                    <tr key={review.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b align-middle">{review.username}</td>
                        <td className="py-2 px-4 border-b align-middle">{review.comment}</td>
                        {isEmployee && <ReviewActions id={review.id} isApproved={isApproved} />}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Gestion des avis</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Avis à valider</h2>
                {pendingReviews.length > 0 ? (
                    <ReviewsTable reviews={pendingReviews} isApproved={false} />
                ) : (
                    <p className="text-gray-600">Aucun avis en attente de validation.</p>
                )}
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Avis validés</h2>
                {approvedReviews.length > 0 ? (
                    <ReviewsTable reviews={approvedReviews} isApproved={true} />
                ) : (
                    <p className="text-gray-600">Aucun avis validé.</p>
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