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
        $breeds = Breed::all(); // Récupérer toutes les races
        return Inertia::render('Admin/Breeds', [
            'breeds' => $breeds,
        ]);
    }

    // Afficher le formulaire de création d'une nouvelle race
    public function create()
    {
        return Inertia::render('Admin/BreedCreate');
    }

    // Enregistrer une nouvelle race
    public function store(Request $request)
    {
        $request->validate([
            'label' => 'required|max:50',
        ]);

        Breed::create($request->only('label'));

        return redirect()->route('admin.breeds')->with('success', 'Race créée avec succès.');
    }

    // Supprimer une race
    public function destroy($id)
    {
        $breed = Breed::findOrFail($id);
        $breed->delete();

        return redirect()->route('admin.breeds')->with('success', 'Race supprimée avec succès.');
    }
}