<?php

namespace App\Http\Controllers;

use App\Models\AnimalHabitat;
use Illuminate\Http\Request;

class AnimalHabitatController extends Controller
{
    // Afficher la liste des relations entre animaux et habitats
    public function index()
    {
        $animalHabitats = AnimalHabitat::all();
        return response()->json($animalHabitats);
    }

    // Afficher le formulaire de création (si nécessaire)
    public function create()
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Enregistrer une nouvelle relation animal-habitat
    public function store(Request $request)
    {
        // Validation des données
        $request->validate([
            'animal_id' => 'required|exists:animals,id',
            'habitat_id' => 'required|exists:habitats,id',
        ]);

        // Créer une nouvelle relation animal-habitat
        $animalHabitat = AnimalHabitat::create($request->all());
        return response()->json($animalHabitat, 201); // Retourner la relation créée avec un code de statut 201
    }

    // Afficher une relation animal-habitat spécifique
    public function show($id)
    {
        $animalHabitat = AnimalHabitat::findOrFail($id);
        return response()->json($animalHabitat);
    }

    // Afficher le formulaire d'édition d'une relation animal-habitat (si nécessaire)
    public function edit($id)
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Mettre à jour une relation animal-habitat spécifique
    public function update(Request $request, $id)
    {
        // Validation des données
        $request->validate([
            'animal_id' => 'required|exists:animals,id',
            'habitat_id' => 'required|exists:habitats,id',
        ]);

        // Mettre à jour la relation animal-habitat
        $animalHabitat = AnimalHabitat::findOrFail($id);
        $animalHabitat->update($request->all());
        return response()->json($animalHabitat);
    }

    // Supprimer une relation animal-habitat spécifique
    public function destroy($id)
    {
        $animalHabitat = AnimalHabitat::findOrFail($id);
        $animalHabitat->delete();

        return response()->json(null, 204); // Retourner une réponse vide avec un code de statut 204
    }
}