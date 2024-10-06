<?php

namespace App\Http\Controllers;

use App\Models\Habitat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HabitatController extends Controller
{
    // Afficher la liste de tous les habitats (accessible à tous)
    public function index()
    {
        $habitats = Habitat::all();
        return response()->json($habitats);
    }

    // Enregistrer un nouvel habitat (admin ou employé uniquement)
    public function store(Request $request)
    {
        // Vérification du rôle admin ou employé
        if (!$request->user() || (!$request->user()->isAdmin() && !$request->user()->isEmployee())) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Validation des données
        $request->validate([
            'name' => 'required|max:50',
            'description' => 'required',
            'comment' => 'nullable',
        ]);

        // Créer un nouvel habitat
        $habitat = Habitat::create($request->all());
        return response()->json($habitat, 201);
    }

    // Afficher un habitat spécifique (accessible à tous)
    public function show($id)
    {
        $habitat = Habitat::findOrFail($id);
        return response()->json($habitat);
    }

    // Mettre à jour un habitat spécifique (admin ou employé uniquement)
    public function update(Request $request, $id)
    {
        // Vérification du rôle admin ou employé
        if (!$request->user() || (!$request->user()->isAdmin() && !$request->user()->isEmployee())) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

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

    // Supprimer un habitat spécifique (admin uniquement)
    public function destroy(Request $request, $id)
    {
        // Vérification du rôle admin
        if (!$request->user() || !$request->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Supprimer l'habitat
        $habitat = Habitat::findOrFail($id);
        $habitat->delete();

        return response()->json(null, 204);
    }
}