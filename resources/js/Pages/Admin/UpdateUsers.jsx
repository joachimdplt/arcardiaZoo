import React from 'react';
import { useForm, Link, usePage, router } from '@inertiajs/react'; 

export default function UserEdit({ user }) {
    const { errors } = usePage().props;
    const { data, setData, processing } = useForm({
        name: user.name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        router.post(`/admin/users/${user.id}`, data, {
            onSuccess: () => {
                // Rediriger vers la liste des utilisateurs après la mise à jour
                router.visit('/admin/users');
            },
        });
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Modifier l'utilisateur</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Prénom</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Nom de famille</label>
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
                    <label className="block text-sm font-bold mb-2">Mot de passe (laisser vide pour ne pas changer)</label>
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
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded mt-4"
                    disabled={processing}
                >
                    Enregistrer les modifications
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