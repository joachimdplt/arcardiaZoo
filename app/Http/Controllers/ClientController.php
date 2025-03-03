<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Habitat;
use App\Models\Service;
use App\Models\Review;
use App\Models\ContactMessage;



use Illuminate\Http\Request;

use Inertia\Inertia;

class ClientController extends Controller
{
    public function index()
{
    // Récupérer les habitats avec les relations nécessaires pour les animaux, incluant la race, la nourriture et les rapports vétérinaires
    $habitats = Habitat::with(['animals.breed', 'animals.veterinaryReports', 'animals.images', 'images'])->get();

    // Récupérer les services avec leurs images
    $services = Service::with('images')->get();

    // Récupérer les avis approuvés
    $approvedReviews = Review::where('is_visible', true)->get();

    // Débogage: Vérification des avis approuvés
    //dd($approvedReviews);

    // Envoyer les données à Inertia et rendre le composant Home
    return Inertia::render('Client/Home', [
        'habitats' => $habitats,
        'services' => $services,
        'approvedReviews' => $approvedReviews, // Passer les avis validés
    ]);
}

    // Méthode pour afficher un animal spécifique avec sa race, ses détails et son alimentation
    public function showAnimal($id)
    {
        // Récupérer l'animal avec ses relations (race, images, rapports vétérinaires, alimentation)
        $animal = Animal::with(['breed', 'images', 'veterinaryReports', 'feedings.user'])->findOrFail($id);
        //dd($animal); // Affiche les données de l'animal dans la console
        //dd($animal->veterinaryReports);


        // Envoyer les données de l'animal à Inertia pour le rendu côté client
        return Inertia::render('Client/AnimalClientShow', [
            'animal' => $animal->load(['veterinaryReports']), // Forcer le chargement des relations pour plus de sécurité
        ]);
    }

    // Méthode pour afficher un habitat spécifique avec les animaux
    public function showHabitat($id)
    {
        $habitat = Habitat::with('animals', 'images')->findOrFail($id);

        return Inertia::render('Client/HabitatsClientShow', [
            'habitat' => $habitat,
        ]);
    }

    // Méthode pour afficher un service spécifique avec ses images
    public function showService($id)
    {
        // Récupérer le service avec ses images
        $service = Service::with('images')->findOrFail($id);

        // Envoyer les données du service à Inertia
        return Inertia::render('Client/ServicesClientShow', [
            'service' => $service,
        ]);
    }

    // Méthode pour afficher la liste des services uniquement
    public function services()
    {
        $services = Service::with('images')->get();

        return Inertia::render('Client/ServicesClient', [
            'services' => $services,
        ]);
    }

    // Méthode pour afficher la liste des habitats uniquement
    public function habitats()
    {
        $habitats = Habitat::with(['animals.breed', 'animals.veterinaryReports', 'images'])->get();

        return Inertia::render('Client/HabitatsClient', [
            'habitats' => $habitats,
        ]);
    }

    public function storeReview(Request $request)
{
    // Valider les données du formulaire
    $request->validate([
        'username' => 'required|string|max:255',
        'comment'  => 'required|string|max:1000',
    ]);

    // Créer un nouvel avis avec 'is_visible' mis à false
    Review::create([
        'username'   => $request->input('username'),
        'comment'    => $request->input('comment'),
        'is_visible' => false,  // L'avis est créé mais non visible par défaut
    ]);

    // Retourner une réponse avec succès
    return back()->with('success', 'Avis envoyé avec succès.');
}
    public function showReviews()
    {
        // Récupérer les avis validés
        $approvedReviews = Review::where('is_visible', true)->get();


        // Envoyer les avis à Inertia pour les afficher dans le composant ReviewsClientShow
        return Inertia::render('Client/ReviewsClientShow', [
            'reviews' => $approvedReviews,
        ]);
    }

   // App\Http\Controllers\ClientController
    public function storeMessage(Request $request)
    {
        // Valider les données reçues
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'subject' => 'required',
            'message' => 'required',
        ]);

        // Logique pour stocker les données (exemple fictif)
        ContactMessage::create($validated);

        return redirect()->route('client.home')->with('success', 'Message envoyé avec succès.');
    }
}