<?php

namespace App\Http\Controllers;

use App\Models\Habitat;
use Illuminate\Http\Request;

class HabitatController extends Controller
{
    // Afficher la liste de tous les habitats
    public function index()
    {
        $habitats = Habitat::all();
        return response()->json($habitats);
    }

    // Afficher le formulaire de création (si nécessaire)
    public function create()
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Enregistrer un nouvel habitat
    public function store(Request $request)
    {
        // Validation des données
        $request->validate([
            'name' => 'required|max:50',
            'description' => 'required',
            'comment' => 'nullable',
        ]);

        // Créer un nouvel habitat
        $habitat = Habitat::create($request->all());
        return response()->json($habitat, 201); // Retourner l'habitat créé avec un code de statut 201
    }

    // Afficher un habitat spécifique
    public function show($id)
    {
        $habitat = Habitat::findOrFail($id);
        return response()->json($habitat);
    }

    // Afficher le formulaire d'édition d'un habitat (si nécessaire)
    public function edit($id)
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Mettre à jour un habitat spécifique
    public function update(Request $request, $id)
    {
        // Validation des données
        $request->validate([
            'name' => 'required|max:50',
            'description' => 'required',
            'comment' => 'nullable',
        ]);

        // Mettre à jour l'habitat
        $habitat = Habitat::findOrFail($id);
        $habitat->update($request->all());
        return response()->json($habitat);
    }

    // Supprimer un habitat spécifique
    public function destroy($id)
    {
        $habitat = Habitat::findOrFail($id);
        $habitat->delete();

        return response()->json(null, 204); // Retourner une réponse vide avec un code de statut 204
    }
}