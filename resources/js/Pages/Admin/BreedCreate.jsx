import React from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function BreedCreate() {
    const { data, setData, post, processing, errors } = useForm({
        label: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/admin/breeds');
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Ajouter une race</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Nom de la race</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={data.label}
                        onChange={e => setData('label', e.target.value)}
                    />
                    {errors.label && <p className="text-red-500 text-xs mt-1">{errors.label}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mt-4"
                    disabled={processing}
                >
                    Ajouter la race
                </button>
            </form>

            <div className="mt-6">
                <Link href="/admin/animals" className="text-blue-500 hover:underline">
                    Retour à la liste des animaux
                </Link>
            </div>
        </div>
    );
}