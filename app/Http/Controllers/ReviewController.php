<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index()
    {
        $pendingReviews = Review::where('is_visible', false)->get();
        $approvedReviews = Review::where('is_visible', true)->get();

        $user = $user = Auth::user();
        $userRole = $user ? ($user->role->label ?? null) : null; // Vérifie si l'utilisateur et son rôle existent

        return Inertia::render('Admin/Reviews', [
            'pendingReviews' => $pendingReviews,
            'approvedReviews' => $approvedReviews,
            'userRole' => $userRole, // Envoyer un seul rôle au lieu d'un tableau
        ]);
    }

    // Approuver un avis (uniquement pour les employés)
    public function approve($id)
    {
        $user = $user = Auth::user();
        if (!$user || !$user->role || $user->role->label !== 'Employee') {
            abort(403, 'Unauthorized action.');
        }

        $review = Review::findOrFail($id);
        $review->update(['is_visible' => true]);

        return redirect()->route('admin.reviews')->with('success', 'Review approved successfully.');
    }

    public function destroy($id)
    {
        $user = $user = Auth::user();

        if (!$user || !$user->role || $user->role->label !== 'Employee') {
            abort(403, 'Unauthorized action.');
        }

        $review = Review::findOrFail($id);
        $review->delete();

        return redirect()->route('admin.reviews')->with('success', 'Review deleted successfully.');
    }
}