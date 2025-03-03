<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index()
{
    $pendingReviews = Review::where('is_visible', false)->get();
    $approvedReviews = Review::where('is_visible', true)->get();
    $userRoles = auth()->user()->roles->pluck('label')->toArray(); // Vérifiez que "Employee" est inclus ici

    return Inertia::render('Admin/Reviews', [
        'pendingReviews' => $pendingReviews,
        'approvedReviews' => $approvedReviews,
        'userRoles' => $userRoles, // Envoyez les rôles de l'utilisateur au frontend
    ]);
}

    // Approuver un avis (uniquement pour les employés)
    public function approve($id)
    {
        $user = auth()->user();
        if (!$user || !$user->roles->contains('label', 'Employee')) {
            abort(403, 'Unauthorized action.');
        }
    
        $review = Review::findOrFail($id);
        $review->update(['is_visible' => true]);
    
        return redirect()->route('admin.reviews')->with('success', 'Review approved successfully.');
    }
    
    public function destroy($id)
    {
        $user = auth()->user();
        if (!$user || !$user->roles->contains('label', 'Employee')) {
            abort(403, 'Unauthorized action.');
        }
    
        $review = Review::findOrFail($id);
        $review->delete();
    
        return redirect()->route('admin.reviews')->with('success', 'Review deleted successfully.');
    }
}