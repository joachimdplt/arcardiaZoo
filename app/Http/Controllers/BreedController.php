<?php

namespace App\Http\Controllers;

use App\Models\Breed;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BreedController extends Controller
{
    /**
     * Affiche la liste des races
     */
    public function index()
    {
        if (!auth()->check()) {
            abort(403, 'Vous n\'êtes pas autorisé à voir cette page.');
        }

        $breeds = Breed::all();
        return Inertia::render('Admin/Breeds', [
            'breeds' => $breeds,
        ]);
    }

    /**
     * Affiche le formulaire de création d'une race
     */
    public function create()
    {
        if (!auth()->check()) {
            abort(403, 'Vous n\'êtes pas autorisé à ajouter une race.');
        }

        $user = auth()->user();
        if (!in_array($user->role->label, ['Admin'])) {
            abort(403, 'Seuls les administrateurs peuvent ajouter une race.');
        }

        return Inertia::render('Admin/BreedCreate');
    }

    /**
     * Enregistre une nouvelle race
     */
    public function store(Request $request)
    {
        if (!auth()->check()) {
            abort(403, 'Vous n\'êtes pas autorisé à ajouter une race.');
        }

        $user = auth()->user();
        if (!in_array($user->role->label, ['Admin'])) {
            abort(403, 'Seuls les administrateurs peuvent ajouter une race.');
        }

        $request->validate([
            'label' => 'required|string|max:255|unique:breeds,label',
        ]);

        Breed::create([
            'label' => $request->input('label'),
        ]);

        return redirect()->route('admin.breeds')->with('success', 'Race créée avec succès.');
    }

    /**
     * Supprime une race
     */
    public function destroy($id)
    {
        if (!auth()->check()) {
            abort(403, 'Vous n\'êtes pas autorisé à supprimer cette race.');
        }

        $user = auth()->user();
        if (!in_array($user->role->label, ['Admin'])) {
            abort(403, 'Seuls les administrateurs peuvent supprimer une race.');
        }

        $breed = Breed::findOrFail($id);
        $breed->delete();

        return redirect()->route('admin.breeds')->with('success', 'Race supprimée avec succès.');
    }
}