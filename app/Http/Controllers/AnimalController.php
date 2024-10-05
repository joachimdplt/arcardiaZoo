<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use Illuminate\Http\Request;

class AnimalController extends Controller
{
    // Afficher la liste de tous les animaux
    public function index()
    {
        $animals = Animal::all();
        return response()->json($animals);
    }

    // Afficher le formulaire de création (si nécessaire)
    public function create()
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Enregistrer un nouvel animal
    public function store(Request $request)
    {
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

    // Afficher un animal spécifique
    public function show($id)
    {
        $animal = Animal::findOrFail($id);
        return response()->json($animal);
    }

    // Afficher le formulaire d'édition d'un animal (si nécessaire)
    public function edit($id)
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Mettre à jour un animal spécifique
    public function update(Request $request, $id)
    {
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

    // Supprimer un animal spécifique
    public function destroy($id)
    {
        $animal = Animal::findOrFail($id);
        $animal->delete();

        return response()->json(null, 204); // Retourner une réponse vide avec un code de statut 204
    }
}