import React from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function UserCreate({ roles }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: '', // ✅ Stocke directement le rôle sélectionné
    });

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Données envoyées :", data); // ✅ Vérifie les données envoyées
        post('/admin/users', data);
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-3">Ajouter un utilisateur</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="block text-sm font-semibold mb-1">Prénom</label>
                    <input
                        type="text"
                        className="w-1/3 p-1 border rounded" 
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div className="mb-3">
                    <label className="block text-sm font-semibold mb-1">Nom</label>
                    <input
                        type="text"
                        className="w-1/3 p-1 border rounded"
                        value={data.last_name}
                        onChange={e => setData('last_name', e.target.value)}
                    />
                    {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                </div>
                
                <div className="mb-3">
                    <label className="block text-sm font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        className="w-1/3 p-1 border rounded"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                
                <div className="mb-3">
                    <label className="block text-sm font-semibold mb-1">Mot de passe</label>
                    <input
                        type="password"
                        className="w-1/3 p-1 border rounded"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                
                <div className="mb-3">
                    <label className="block text-sm font-semibold mb-1">Confirmer le mot de passe</label>
                    <input
                        type="password"
                        className="w-1/3 p-1 border rounded"
                        value={data.password_confirmation}
                        onChange={e => setData('password_confirmation', e.target.value)}
                    />
                    {errors.password_confirmation && (
                        <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>
                    )}
                </div>
                
                <div className="mb-3">
                    <label className="block text-sm font-semibold mb-1">Rôle</label>
                    <select
                        className="w-1/3 p-1 border rounded"
                        value={data.role_id}
                        onChange={e => setData('role_id', e.target.value)}
                    >
                        <option value="">Sélectionnez un rôle</option>
                        {roles.map(role => (
                            <option key={role.id} value={role.id}>
                                {role.label}
                            </option>
                        ))}
                    </select>
                    {errors.role_id && <p className="text-red-500 text-xs mt-1">{errors.role_id}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700 mt-3"
                    disabled={processing}
                >
                    Ajouter utilisateur
                </button>
            </form>
            
            <div className="mt-4">
                <Link href="/admin/users" className="text-blue-500 hover:underline">
                    Retour à la liste des utilisateurs
                </Link>
            </div>
        </div>
    );
}