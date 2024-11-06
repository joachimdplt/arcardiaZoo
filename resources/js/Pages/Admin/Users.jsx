import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';

export default function Users({ users }) {
    const [processing, setProcessing] = useState(false);

    // Fonction pour gérer la suppression d'un utilisateur
    const handleDelete = (id) => {
        if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
            setProcessing(true);
            router.delete(`/admin/users/${id}`, {
                onFinish: () => setProcessing(false),
            });
        }
    };
    console.log("Utilisateurs avec rôles :", users);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Liste des utilisateurs</h1>

            {/* Bouton pour ajouter un utilisateur */}
            <div className="flex justify-end mb-4">
                <Link
                    href="/admin/users/create"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                    Ajouter un utilisateur
                </Link>
            </div>

            {/* Table d'utilisateurs */}
            <table className="min-w-full bg-white shadow-md rounded my-6">
                <thead>
                    <tr className='bg-gray-200'> 
                        <th className="py-2 px-4 border-b w-1/5 text-left">Prénom</th>
                        <th className="py-2 px-4 border-b w-1/5 text-left">Nom</th>
                        <th className="py-2 px-4 border-b w-1/5 text-left">Email</th>
                        <th className="py-2 px-4 border-b w-1/5 text-left">Rôles</th>
                        <th className="py-2 px-4 border-b w-1/5 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="py-2 px-4 border-b w-1/5">{user.name}</td>
                            <td className="py-2 px-4 border-b w-1/5">{user.last_name}</td>
                            <td className="py-2 px-4 border-b w-1/5">{user.email}</td>
                            <td className="py-2 px-4 border-b w-1/5">
                                {user.roles.map(role => role.label).join(', ')}
                            </td>
                            <td className="py-2 px-4 border-b w-1/5">
                                <Link
                                    href={`/admin/users/${user.id}/edit`}
                                    className="text-blue-500 hover:underline"
                                >
                                    Modifier
                                </Link>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="text-red-500 hover:underline ml-4"
                                    disabled={processing}
                                >
                                    {processing ? 'Suppression...' : 'Supprimer'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Bouton retour au tableau de bord */}
            <div className="mt-6">
                <Link href="/dashboard" className="text-blue-500 hover:underline">
                    Retour au tableau de bord
                </Link>
            </div>
        </div>
    );
}