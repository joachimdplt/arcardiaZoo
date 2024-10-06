<?php

namespace App\Http\Controllers;

use App\Models\Breed;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BreedController extends Controller
{
    // Afficher la liste de toutes les races (accessible à tout le monde)
    public function index()
    {
        $breeds = Breed::all();
        return response()->json($breeds);
    }

    // Enregistrer une nouvelle race (accessible uniquement aux administrateurs et employés)
    public function store(Request $request)
    {
        // Vérification des rôles (seuls les employés et admin peuvent ajouter une race)
        if (!$request->user() || (!$request->user()->isAdmin() && !$request->user()->isEmployee())) {
            return response()->json(['error' => 'Unauthorized'], 403); // Refuser l'accès
        }

        // Validation des données
        $request->validate([
            'label' => 'required|max:50',
        ]);

        // Créer la race dans la base de données
        $breed = Breed::create($request->all());
        return response()->json($breed, 201); // Retourner la race créée avec un code de statut 201
    }

    // Afficher une race spécifique (accessible à tout le monde)
    public function show($id)
    {
        $breed = Breed::findOrFail($id);
        return response()->json($breed);
    }

    // Mettre à jour une race spécifique (accessible uniquement aux administrateurs et employés)
    public function update(Request $request, $id)
    {
        // Vérification des rôles (seuls les employés et admin peuvent modifier une race)
        if (!$request->user() || (!$request->user()->isAdmin() && !$request->user()->isEmployee())) {
            return response()->json(['error' => 'Unauthorized'], 403); // Refuser l'accès
        }

        // Validation des données
        $request->validate([
            'label' => 'required|max:50',
        ]);

        // Mettre à jour la race
        $breed = Breed::findOrFail($id);
        $breed->update($request->all());
        return response()->json($breed);
    }

    // Supprimer une race spécifique (accessible uniquement aux administrateurs)
    public function destroy(Request $request, $id)
    {
        // Vérification des rôles (seuls les administrateurs peuvent supprimer une race)
        if (!$request->user() || !$request->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403); // Refuser l'accès
        }

        // Supprimer la race
        $breed = Breed::findOrFail($id);
        $breed->delete();
        return response()->json(null, 204); // Retourner une réponse vide avec un code de statut 204
    }
}