import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props; // Accéder aux informations de l'utilisateur connecté
    const user = auth.user;

    // Vérifier les rôles de l'utilisateur connecté
    const isAdmin = user.roles && user.roles.some(role => role.label === 'Admin');
    const isEmployee = user.roles && user.roles.some(role => role.label === 'Employee');

    // Obtenir les rôles de l'utilisateur pour les afficher dans le titre
    const roleLabel = user.roles && user.roles.length > 0 
        ? user.roles.map(role => role.label).join(', ') 
        : 'Aucun rôle';

    // Fonction pour gérer la déconnexion
    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout'); // Effectue la déconnexion
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Dashboard - {roleLabel}</h1>

            {/* Section d'informations de l'utilisateur connecté */}
            <div className="mb-6 p-4 bg-gray-100 rounded shadow-md">
                <h2 className="text-xl font-semibold">Bienvenue, {user.name}</h2>
                <p>Email: {user.email}</p>
                <p>
                    Rôle(s): {roleLabel}
                </p>
            </div>

            {/* Bouton de déconnexion */}
            <div className="mb-4">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                    Déconnexion
                </button>
            </div>

            {/* Liens du tableau de bord */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isAdmin && (
                    <Link href="/admin/users" className="p-4 bg-blue-500 text-white rounded shadow-md hover:bg-blue-700">
                        Equipe
                    </Link>
                )}
                <Link href="/admin/habitats" className="p-4 bg-blue-500 text-white rounded shadow-md hover:bg-blue-700">
                    Habitats
                </Link>
                <Link href="/admin/animals" className="p-4 bg-blue-500 text-white rounded shadow-md hover:bg-blue-700">
                    Animaux
                </Link>
                {(isAdmin || isEmployee) && (
                    <Link href="/admin/services" className="p-4 bg-blue-500 text-white rounded shadow-md hover:bg-blue-700">
                        Services
                    </Link>
                )}
                <Link href="/admin/veterinary-reports" className="p-4 bg-blue-500 text-white rounded shadow-md hover:bg-blue-700">
                    Rapports vétérinaires
                </Link>
                {(isAdmin || isEmployee) && (
                    <Link href="/admin/reviews" className="p-4 bg-blue-500 text-white rounded shadow-md hover:bg-blue-700">
                        Commentaires
                    </Link>
                )}
                {isAdmin && (
                    <Link href="/admin/contacts" className="p-4 bg-blue-500 text-white rounded shadow-md hover:bg-blue-700">
                        Messagerie
                    </Link>
                )}
                {isAdmin && (
                    <Link href="/admin/stats" className="p-4 bg-blue-500 text-white rounded shadow-md hover:bg-blue-700">
                        Statistiques 
                    </Link>
                )}
            </div>
        </div>
    );
}