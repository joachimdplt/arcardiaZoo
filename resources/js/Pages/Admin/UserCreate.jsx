import React from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function UserCreate({ roles }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [],
    });

    // Filtrer les rôles pour éviter les doublons et exclure le rôle "Admin"
    const uniqueRoles = Array.from(new Set(roles.map(role => role.label)))
        .map(label => roles.find(role => role.label === label))
        .filter(role => role.label !== 'Admin'); // Exclure le rôle "Admin"

    function handleSubmit(e) {
        e.preventDefault();
        post('/admin/users');
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Ajouter un utilisateur</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Prenom</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Nom</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={data.last_name}
                        onChange={e => setData('last_name', e.target.value)}
                    />
                    {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 border rounded"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Mot de passe</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Confirmer le mot de passe</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={data.password_confirmation}
                        onChange={e => setData('password_confirmation', e.target.value)}
                    />
                    {errors.password_confirmation && (
                        <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Rôles</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={data.roles}
                        onChange={e =>
                            setData('roles', Array.from(e.target.selectedOptions, option => option.value))
                        }
                    >
                        {uniqueRoles.map(role => (
                            <option key={role.id} value={role.id}>
                                {role.label}
                            </option>
                        ))}
                    </select>
                    {errors.roles && <p className="text-red-500 text-xs mt-1">{errors.roles}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mt-4"
                    disabled={processing}   
                >
                    Ajouter utilisateur
                </button>
            </form>

            <div className="mt-6">
                <Link href="/admin/users" className="text-blue-500 hover:underline">
                    Retour à la liste des utilisateurs
                </Link>
            </div>
        </div>
    );
}