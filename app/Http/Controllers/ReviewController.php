<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    // Afficher la liste de tous les avis
    public function index()
    {
        $reviews = Review::all();
        return response()->json($reviews);
    }

    // Afficher le formulaire de création (si nécessaire)
    public function create()
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Enregistrer un nouvel avis
    public function store(Request $request)
    {
        // Validation des données
        $request->validate([
            'username' => 'required|max:50',
            'comment' => 'required',
            'is_visible' => 'required|boolean',
        ]);

        // Créer un nouvel avis
        $review = Review::create($request->all());
        return response()->json($review, 201); // Retourner l'avis créé avec un code de statut 201
    }

    // Afficher un avis spécifique
    public function show($id)
    {
        $review = Review::findOrFail($id);
        return response()->json($review);
    }

    // Afficher le formulaire d'édition d'un avis (si nécessaire)
    public function edit($id)
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Mettre à jour un avis spécifique
    public function update(Request $request, $id)
    {
        // Validation des données
        $request->validate([
            'username' => 'required|max:50',
            'comment' => 'required',
            'is_visible' => 'required|boolean',
        ]);

        // Mettre à jour l'avis
        $review = Review::findOrFail($id);
        $review->update($request->all());
        return response()->json($review);
    }

    // Supprimer un avis spécifique
    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();

        return response()->json(null, 204); // Retourner une réponse vide avec un code de statut 204
    }
}