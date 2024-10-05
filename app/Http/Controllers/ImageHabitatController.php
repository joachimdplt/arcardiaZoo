<?php

namespace App\Http\Controllers;

use App\Models\ImageHabitat;
use Illuminate\Http\Request;

class ImageHabitatController extends Controller
{
    // Afficher la liste des relations entre images et habitats
    public function index()
    {
        $imageHabitats = ImageHabitat::all();
        return response()->json($imageHabitats);
    }

    // Afficher le formulaire de création (si nécessaire)
    public function create()
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Enregistrer une nouvelle relation image-habitat
    public function store(Request $request)
    {
        // Validation des données
        $request->validate([
            'image_id' => 'required|exists:images,id',
            'habitat_id' => 'required|exists:habitats,id',
        ]);

        // Créer une nouvelle relation image-habitat
        $imageHabitat = ImageHabitat::create($request->all());
        return response()->json($imageHabitat, 201); // Retourner la relation créée avec un code de statut 201
    }

    // Afficher une relation image-habitat spécifique
    public function show($id)
    {
        $imageHabitat = ImageHabitat::findOrFail($id);
        return response()->json($imageHabitat);
    }

    // Afficher le formulaire d'édition d'une relation image-habitat (si nécessaire)
    public function edit($id)
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Mettre à jour une relation image-habitat spécifique
    public function update(Request $request, $id)
    {
        // Validation des données
        $request->validate([
            'image_id' => 'required|exists:images,id',
            'habitat_id' => 'required|exists:habitats,id',
        ]);

        // Mettre à jour la relation image-habitat
        $imageHabitat = ImageHabitat::findOrFail($id);
        $imageHabitat->update($request->all());
        return response()->json($imageHabitat);
    }

    // Supprimer une relation image-habitat spécifique
    public function destroy($id)
    {
        $imageHabitat = ImageHabitat::findOrFail($id);
        $imageHabitat->delete();

        return response()->json(null, 204); // Retourner une réponse vide avec un code de statut 204
    }
}