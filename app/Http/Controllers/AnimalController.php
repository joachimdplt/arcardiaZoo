<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnimalController extends Controller
{
    // Afficher la liste de tous les animaux (accessible à tout le monde)
    public function index()
    {
        $animals = Animal::all();
        return response()->json($animals);
    }

    // Enregistrer un nouvel animal (accessible uniquement aux administrateurs et employés)
    public function store(Request $request)
    {
        // Vérification des rôles (seuls les employés et admin peuvent ajouter un animal)
        if (!$request->user() || (!$request->user()->isAdmin() && !$request->user()->isEmployee())) {
            return response()->json(['error' => 'Unauthorized'], 403); // Refuser l'accès
        }

        // Validation des données
        $request->validate([
            'name' => 'required|max:50',
            'status' => 'required|max:50',
            'breed_id' => 'required|exists:breeds,id', // Vérification si la race existe
            'image_id' => 'nullable|exists:images,id', // Vérification si l'image existe
        ]);

        // Créer un nouvel animal
        $animal = Animal::create($request->all());
        return response()->json($animal, 201); // Retourner l'animal créé avec un code de statut 201
    }

    // Afficher un animal spécifique (accessible à tout le monde)
    public function show($id)
    {
        $animal = Animal::findOrFail($id);
        return response()->json($animal);
    }

    // Mettre à jour un animal spécifique (accessible uniquement aux administrateurs et employés)
    public function update(Request $request, $id)
    {
        // Vérification des rôles (seuls les employés et admin peuvent modifier un animal)
        if (!$request->user() || (!$request->user()->isAdmin() && !$request->user()->isEmployee())) {
            return response()->json(['error' => 'Unauthorized'], 403); // Refuser l'accès
        }

        // Validation des données
        $request->validate([
            'name' => 'required|max:50',
            'status' => 'required|max:50',
            'breed_id' => 'required|exists:breeds,id', // Vérification si la race existe
            'image_id' => 'nullable|exists:images,id', // Vérification si l'image existe
        ]);

        // Mettre à jour l'animal
        $animal = Animal::findOrFail($id);
        $animal->update($request->all());
        return response()->json($animal);
    }

    // Supprimer un animal spécifique (accessible uniquement aux administrateurs)
    public function destroy(Request $request, $id)
    {
        // Vérification des rôles (seuls les administrateurs peuvent supprimer un animal)
        if (!$request->user() || !$request->user()->isAdmin()) {

            return response()->json(['error' => 'Unauthorized'], 403); // Refuser l'accès
        }

        // Supprimer l'animal
        $animal = Animal::findOrFail($id);
        $animal->delete();

        return response()->json(null, 204); // Retourner une réponse vide avec un code de statut 204
    }
}