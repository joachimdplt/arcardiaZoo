<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    // Afficher les avis, à la fois approuvés et en attente d'approbation
    public function index()
    {
        // Récupérer les avis en attente et les avis approuvés
        $pendingReviews = Review::where('is_visible', false)->get();
        $approvedReviews = Review::where('is_visible', true)->get();

        // Retourner la vue avec les avis
        return Inertia::render('Admin/Reviews', [
            'pendingReviews' => $pendingReviews,
            'approvedReviews' => $approvedReviews,
        ]);
    }

    // Approuver un avis (uniquement pour les employés)
    public function approve($id)
    {
        $user = auth()->user();
        $userRoles = $user->roles->pluck('label')->toArray();

        // Vérifier que l'utilisateur a le rôle d'employé
        if (!in_array('Employee', $userRoles)) {
            abort(403, 'Vous n\'êtes pas autorisé à approuver cet avis.');
        }

        // Trouver l'avis et le marquer comme approuvé
        $review = Review::findOrFail($id);
        $review->update(['is_visible' => true]);

        return redirect()->route('admin.reviews')->with('success', 'Avis approuvé avec succès.');
    }

    // Supprimer un avis (uniquement pour les employés)
    public function destroy($id)
    {
        $user = auth()->user();
        $userRoles = $user->roles->pluck('label')->toArray();

        // Vérifier que l'utilisateur a le rôle d'employé
        if (!in_array('Employee', $userRoles)) {
            abort(403, 'Vous n\'êtes pas autorisé à supprimer cet avis.');
        }

        // Trouver et supprimer l'avis
        $review = Review::findOrFail($id);
        $review->delete();

        return redirect()->route('admin.reviews')->with('success', 'Avis supprimé avec succès.');
    }
}