<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    // Afficher la liste de toutes les images
    public function index()
    {
        $images = Image::all();
        return response()->json($images);
    }

    // Afficher le formulaire de création (si nécessaire)
    public function create()
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Enregistrer une nouvelle image
    public function store(Request $request)
    {
        // Validation des données si nécessaire
        $request->validate([
            'image_data' => 'required|file',
        ]);

        // Enregistrer l'image
        $image = new Image();
        $image->image_data = $request->file('image_data')->store('images');
        $image->save();

        return response()->json($image, 201); // Retourner l'image créée avec un code de statut 201
    }

    // Afficher une image spécifique
    public function show($id)
    {
        $image = Image::findOrFail($id);
        return response()->json($image);
    }

    // Afficher le formulaire d'édition d'une image (si nécessaire)
    public function edit($id)
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Mettre à jour une image spécifique
    public function update(Request $request, $id)
    {
        $request->validate([
            'image_data' => 'required|file',
        ]);

        $image = Image::findOrFail($id);
        $image->image_data = $request->file('image_data')->store('images');
        $image->save();

        return response()->json($image);
    }

    // Supprimer une image spécifique
    public function destroy($id)
    {
        $image = Image::findOrFail($id);
        $image->delete();

        return response()->json(null, 204); // Retourner une réponse vide avec un code de statut 204
    }
}