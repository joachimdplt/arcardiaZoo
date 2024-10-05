<?php

namespace App\Http\Controllers;

use App\Models\Breed;
use Illuminate\Http\Request;

class BreedController extends Controller
{
    // Afficher la liste de toutes les races
    public function index()
    {
        $breeds = Breed::all();
        return response()->json($breeds);
    }

    // Afficher le formulaire de création (si nécessaire, pour les applications frontend)
    public function create()
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Enregistrer une nouvelle race
    public function store(Request $request)
    {
        // Validation des données si nécessaire
        $request->validate([
            'label' => 'required|max:50',
        ]);

        // Créer la race dans la base de données
        $breed = Breed::create($request->all());
        return response()->json($breed, 201); // Retourner la race créée avec un code de statut 201
    }

    // Afficher une race spécifique
    public function show($id)
    {
        $breed = Breed::findOrFail($id);
        return response()->json($breed);
    }

    // Afficher le formulaire d'édition d'une race (si nécessaire)
    public function edit($id)
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Mettre à jour une race spécifique
    public function update(Request $request, $id)
    {
        // Validation des données si nécessaire
        $request->validate([
            'label' => 'required|max:50',
        ]);

        // Mettre à jour la race
        $breed = Breed::findOrFail($id);
        $breed->update($request->all());
        return response()->json($breed);
    }

    // Supprimer une race spécifique
    public function destroy($id)
    {
        $breed = Breed::findOrFail($id);
        $breed->delete();
        return response()->json(null, 204); // Retourner une réponse vide avec un code de statut 204
    }
}