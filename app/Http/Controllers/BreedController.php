<?php
namespace App\Http\Controllers;

use App\Models\Breed;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BreedController extends Controller
{
    // Afficher la liste des races
    public function index()
    {
        $user = auth()->user();
        if ($user===null) {
        abort(403, 'Vous n\'êtes pas autorisé à voir ce rapport vétérinaire.');
        }   
        $breeds = Breed::all(); // Récupérer toutes les races
        return Inertia::render('Admin/Breeds', [
            'breeds' => $breeds,
        ]);
    }

    // Afficher le formulaire de création d'une nouvelle race
    public function create()
    {
        $user = auth()->user();
        if ($user===null) {
        abort(403, 'Vous n\'êtes pas autorisé à ajouter de race.');
        $userRoles = $user->roles->pluck('label')->toArray();
        if (in_array('Employee', $userRoles) || in_array('Veterinary', $userRoles )) {
            abort(403, 'Vous n\'êtes pas autorisé à ajouter de race.');
        }

        }   
        return Inertia::render('Admin/BreedCreate');
    }

    public function store(Request $request)
{
    $user = auth()->user();
    if (!$user) {
        abort(403, 'Vous n\'êtes pas autorisé à ajouter de race.');
    }

    $userRoles = $user->roles->pluck('label')->toArray();
    if (in_array('Employee', $userRoles) || in_array('Veterinary', $userRoles)) {
        abort(403, 'Vous n\'êtes pas autorisé à ajouter de race.');
    }

    // Logique de création de la race
    $request->validate([
        'label' => 'required|string|max:255',
    ]);

    Breed::create([
        'label' => $request->input('label'),
    ]);

    return response()->json(['message' => 'Race créée avec succès'], 201);
}

    // Supprimer une race
    public function destroy($id)
    {
        $user = auth()->user();
        if ($user===null) {
            abort(403, 'Vous n\'êtes pas autorisé à supprimer cette race.');
        }

        $userRoles = $user->roles->pluck('label')->toArray();

        // Interdire l'accès si l'utilisateur est Admin ou Employee
        if (in_array('Admin', $userRoles)) {
            abort(403, 'Vous n\'êtes pas autorisé à créer un rapport vétérinaire.');
        }
        $breed = Breed::findOrFail($id);
        $breed->delete();

        return redirect()->route('admin.breeds')->with('success', 'Race supprimée avec succès.');
    }
}