<?php

namespace App\Http\Controllers;

use App\Models\VeterinaryReport;
use App\Models\Animal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class VeterinaryReportController extends Controller
{
    /**
     * Vérifie si l'utilisateur est un vétérinaire avant d'accéder aux méthodes protégées.
     */
    private function authorizeVeterinary()
    {
        $user = Auth::user();
        if (!$user || $user->role->label !== 'Veterinary') {
            abort(403, 'Seuls les vétérinaires peuvent accéder à cette ressource.');
        }
    }

    /**
     * Afficher tous les rapports vétérinaires.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            abort(403, 'Accès refusé.');
        }

        $query = VeterinaryReport::with(['animal.habitats', 'user']);

        if ($request->has('animal_id')) {
            $query->where('animal_id', $request->get('animal_id'));
        }
        if ($request->has('date')) {
            $query->where('date', $request->get('date'));
        }

        return Inertia::render('Admin/VeterinaryReports', [
            'reports' => $query->get(),
            'animals' => Animal::all(),
            'userRole' => $user->role->label, // On envoie le rôle de l'utilisateur pour React
        ]);
    }

    /**
     * Afficher le formulaire de création d'un rapport vétérinaire.
     */
    public function create()
    {
        $this->authorizeVeterinary();

        return Inertia::render('Admin/VeterinaryReportCreate', [
            'animals' => Animal::all(),
            'statuses' => VeterinaryReport::getHealthStatuses(),
        ]);
    }

    /**
     * Enregistrer un rapport vétérinaire.
     */
    public function store(Request $request)
    {
        $this->authorizeVeterinary();

        $request->validate([
            'date' => 'required|date',
            'details' => 'required|string',
            'animal_id' => 'required|exists:animals,id',
            'habitat_comment' => 'nullable|string',
            'feed_type' => 'nullable|string',
            'feed_quantity' => 'nullable|integer',
            'status' => 'required|string|in:' . implode(',', VeterinaryReport::getHealthStatuses()),
        ]);

        VeterinaryReport::create([
            'date' => $request->date,
            'details' => $request->details,
            'animal_id' => $request->animal_id,
            'user_id' => Auth::id(),
            'habitat_comment' => $request->habitat_comment,
            'feed_type' => $request->feed_type,
            'feed_quantity' => $request->feed_quantity,
            'status' => $request->status,
        ]);

        return redirect()->route('admin.veterinary-reports.index')->with('success', 'Rapport vétérinaire créé avec succès.');
    }

    /**
     * Modifier un rapport vétérinaire.
     */
    public function edit($id)
    {
        $this->authorizeVeterinary();

        return Inertia::render('Admin/VeterinaryReportUpdate', [
            'report' => VeterinaryReport::findOrFail($id),
            'animals' => Animal::all(),
            'statuses' => VeterinaryReport::getHealthStatuses(),
        ]);
    }

    /**
     * Mettre à jour un rapport vétérinaire.
     */
    public function update(Request $request, $id)
    {
        $this->authorizeVeterinary();

        $request->validate([
            'date' => 'required|date',
            'details' => 'required|string',
            'animal_id' => 'required|exists:animals,id',
            'feed_type' => 'nullable|string',
            'feed_quantity' => 'nullable|integer',
            'status' => 'required|string|in:' . implode(',', VeterinaryReport::getHealthStatuses()),
        ]);

        $report = VeterinaryReport::findOrFail($id);
        $report->update($request->all());

        return redirect()->route('admin.veterinary-reports.index')->with('success', 'Rapport vétérinaire mis à jour avec succès.');
    }

    /**
     * Afficher un rapport vétérinaire spécifique.
     */
    public function show($id)
    {
        $user = Auth::user();
        if (!$user) {
            abort(403, 'Accès refusé.');
        }

        return Inertia::render('Admin/VeterinaryReportShow', [
            'report' => VeterinaryReport::with(['animal', 'user'])->findOrFail($id),
        ]);
    }

    /**
     * Supprimer un rapport vétérinaire.
     */
    public function destroy($id)
    {
        $this->authorizeVeterinary();

        $report = VeterinaryReport::findOrFail($id);
        $report->delete();

        return redirect()->route('admin.veterinary-reports.index')
            ->with('success', 'Rapport vétérinaire supprimé avec succès.');
    }

    /**
     * Afficher les rapports d'un animal spécifique.
     */
    public function showReportsByAnimal($animalId)
    {
        $user = Auth::user();
        if (!$user) {
            abort(403, 'Accès refusé.');
        }

        return Inertia::render('Admin/VeterinaryReportsByAnimal', [
            'animal' => Animal::findOrFail($animalId),
            'reports' => VeterinaryReport::with('user')->where('animal_id', $animalId)->get(),
        ]);
    }
}