<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ImageController extends Controller
{
    // Afficher la liste de toutes les images (accessible à tout le monde)
    public function index()
    {
        $images = Image::all();
        return response()->json($images);
    }

    // Enregistrer une nouvelle image (accessible uniquement aux administrateurs et employés)
    public function store(Request $request)
    {
        // Vérification des rôles (seuls les employés et admin peuvent ajouter une image)
        if (!$request->user() || (!$request->user()->isAdmin() && !$request->user()->isEmployee())) {
            return response()->json(['error' => 'Unauthorized'], 403); // Refuser l'accès
        }

        // Validation des données
        $request->validate([
            'image_data' => 'required|file',
        ]);

        // Enregistrer l'image
        $image = new Image();
        $image->image_data = $request->file('image_data')->store('images');
        $image->save();

        return response()->json($image, 201); // Retourner l'image créée avec un code de statut 201
    }

    // Afficher une image spécifique (accessible à tout le monde)
    public function show($id)
    {
        $image = Image::findOrFail($id);
        return response()->json($image);
    }

    // Mettre à jour une image spécifique (accessible uniquement aux administrateurs et employés)
    public function update(Request $request, $id)
    {
        // Vérification des rôles (seuls les employés et admin peuvent modifier une image)
        if (!$request->user() || (!$request->user()->isAdmin() && !$request->user()->isEmployee())) {
            return response()->json(['error' => 'Unauthorized'], 403); // Refuser l'accès
        }

        // Validation des données
        $request->validate([
            'image_data' => 'required|file',
        ]);

        // Mettre à jour l'image
        $image = Image::findOrFail($id);
        $image->image_data = $request->file('image_data')->store('images');
        $image->save();

        return response()->json($image);
    }

    // Supprimer une image spécifique (accessible uniquement aux administrateurs)
    public function destroy(Request $request, $id)
    {
        // Vérification des rôles (seuls les administrateurs peuvent supprimer une image)
        if (!$request->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403); // Refuser l'accès
        }

        // Supprimer l'image
        $image = Image::findOrFail($id);
        $image->delete();

        return response()->json(null, 204); // Retourner une réponse vide avec un code de statut 204
    }
}