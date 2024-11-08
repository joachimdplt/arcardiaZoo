<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HabitatController;
use App\Http\Controllers\AnimalFeedController;
use App\Http\Controllers\VeterinaryReportController;
use App\Http\Controllers\BreedController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnimalController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\AnimalFeedingController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DocumentationController;

// Page d'accueil
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Tableau de bord
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Gestion du profil utilisateur
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {

// Gestion des utilisateurs (Admin)
Route::get('/admin/users', [AdminController::class, 'users'])->name('admin.users');
Route::get('/admin/users/{id}/edit', [AdminController::class, 'editUser'])->name('admin.users.edit');
Route::get('/admin/users/create', [AdminController::class, 'createUser'])->name('admin.users.create');
Route::post('/admin/users', [AdminController::class, 'storeUser'])->name('admin.users.store');
Route::post('/admin/users/{user}', [AdminController::class, 'updateUser'])->name('admin.users.update');
Route::delete('/admin/users/{id}', [AdminController::class, 'destroyUser'])->name('admin.users.destroy');

// Gestion des habitats
Route::get('/admin/habitats', [HabitatController::class, 'index'])->name('admin.habitats');
Route::get('/admin/habitats/create', [HabitatController::class, 'create'])->name('admin.habitats.create');
Route::post('/admin/habitats', [HabitatController::class, 'store'])->name('admin.habitats.store');
Route::get('/admin/habitats/{id}/edit', [HabitatController::class, 'edit'])->name('admin.habitats.edit');
Route::get('/admin/habitats/{id}', [HabitatController::class, 'show'])->name('admin.habitats.show');
Route::put('/admin/habitats/{id}', [HabitatController::class, 'update'])->name('admin.habitats.update');
Route::delete('/admin/habitats/{id}', [HabitatController::class, 'destroy'])->name('admin.habitats.destroy');
Route::delete('/admin/habitats/{habitat}/images/{image}', [HabitatController::class, 'deleteImage']);

// Gestion des animaux
Route::get('/admin/animals/{animal}/current-habitat', [AnimalController::class, 'getCurrentHabitat']);
Route::get('/admin/animals', [AnimalController::class, 'animals'])->name('admin.animals');
Route::get('/admin/animals/create', [AnimalController::class, 'create'])->name('admin.animal.create');
Route::post('/admin/animals', [AnimalController::class, 'store'])->name('admin.animal.store');
Route::get('/admin/animals/{id}', [AnimalController::class, 'show'])->name('admin.animals.show');
Route::put('/admin/animals/{id}', [AnimalController::class, 'update'])->name('admin.animals.update');
Route::get('/admin/animals/{id}/edit', [AnimalController::class, 'edit'])->name('admin.animals.edit');
Route::delete('/admin/animals/{id}', [AnimalController::class, 'destroy'])->name('admin.animals.destroy');
Route::delete('/admin/animals/{animal}/images/{image}', [AnimalController::class, 'deleteImage']);

// Gestion des services

Route::get('/admin/services', [ServiceController::class, 'index'])->name('admin.services');
Route::get('/admin/services/create', [ServiceController::class, 'create'])->name('admin.services.create');
Route::post('/admin/services', [ServiceController::class, 'store'])->name('admin.services.store');
Route::get('/admin/services/{id}/edit', [ServiceController::class, 'edit'])->name('admin.services.edit');
Route::put('/admin/services/{id}', [ServiceController::class, 'update'])->name('admin.services.update');
Route::delete('/admin/services/{id}', [ServiceController::class, 'destroy'])->name('admin.services.destroy');
Route::delete('/admin/services/{service}/images/{image}', [ServiceController::class, 'deleteImage']);

// Gestion des rapports vétérinaires
Route::get('/admin/veterinary-reports', [VeterinaryReportController::class, 'index'])->name('admin.veterinary-reports.index');
Route::get('/admin/veterinary-reports/create', [VeterinaryReportController::class, 'create'])->name('admin.veterinary-reports.create');
Route::post('/admin/veterinary-reports', [VeterinaryReportController::class, 'store'])->name('admin.veterinary-reports.store');
Route::get('/admin/veterinary-reports/{id}', [VeterinaryReportController::class, 'show'])->name('admin.veterinary-reports.show');
Route::get('/admin/veterinary-reports/{id}/edit', [VeterinaryReportController::class, 'edit'])->name('admin.veterinary-reports.edit');
Route::put('/admin/veterinary-reports/{id}', [VeterinaryReportController::class, 'update'])->name('admin.veterinary-reports.update');
Route::get('/admin/animals/{id}/veterinary-reports', [VeterinaryReportController::class, 'showReportsByAnimal'])->name('animals.veterinary-reports');
Route::delete('/admin/veterinary-reports/{id}', [VeterinaryReportController::class, 'destroy'])->name('admin.veterinary-reports.destroy');

// Gestion des habitats associés aux animaux
Route::get('/admin/animals/{animal}/habitats', [VeterinaryReportController::class, 'getHabitatsByAnimal'])->name('admin.animals.habitats');

// Gestion des races
Route::get('/admin/breeds', [BreedController::class, 'index'])->name('admin.breeds');
Route::get('/admin/breeds/create', [BreedController::class, 'create'])->name('admin.breeds.create');
Route::post('/admin/breeds', [BreedController::class, 'store'])->name('admin.breeds.store');
Route::delete('/admin/breeds/{id}', [BreedController::class, 'destroy'])->name('admin.breeds.destroy');

// Gestion des avis
Route::get('/admin/reviews', [ReviewController::class, 'index'])->name('admin.reviews');
Route::get('/admin/reviews/create', [ReviewController::class, 'create'])->name('admin.reviews.create');
Route::post('/admin/reviews', [ReviewController::class, 'store'])->name('admin.reviews.store');
Route::get('/admin/reviews/{id}/edit', [ReviewController::class, 'edit'])->name('admin.reviews.edit');
Route::put('/admin/reviews/{id}', [ReviewController::class, 'update'])->name('admin.reviews.update');
Route::delete('/admin/reviews/{id}', [ReviewController::class, 'destroy'])->name('admin.reviews.destroy');
Route::put('/admin/reviews/{id}/approve', [ReviewController::class, 'approve'])->name('admin.reviews.approve');

// Gestion des messages de contact (Admin)
Route::get('/admin/contacts', [AdminController::class, 'contactMessages'])->name('admin.contacts');
Route::get('/admin/contacts', [AdminController::class, 'showContacts'])->name('admin.contacts');

// Statistiques pour habitats et animaux
Route::get('/admin/habitat-stats', [HabitatController::class, 'showHabitatStats'])->name('admin.habitatStats');
Route::get('/admin/stats', [HabitatController::class, 'showCombinedStats'])->name('admin.stats');
Route::get('/admin/animal-stats', [AnimalController::class, 'showAnimalStats'])->name('admin.animalStats');

// Gestion des alimentations des animaux
Route::post('/admin/animals/{animal}/feedings', [AnimalFeedingController::class, 'store'])->name('animals.feedings.store');
Route::get('/admin/animals/{animalId}/feedings', [AnimalFeedingController::class, 'showFeedings'])->name('animal.feedings');


});

// Pages clients
Route::get('/client', [ClientController::class, 'index'])->name('client.home');
Route::get('/client/services', [ClientController::class, 'services'])->name('client.services');
Route::get('/services/{id}', [ClientController::class, 'showService'])->name('client.service.show');
Route::get('/client/habitats', [ClientController::class, 'habitats'])->name('client.habitats');
Route::get('/habitats/{id}', [ClientController::class, 'showHabitat'])->name('client.habitat.show');
Route::get('/animals/{id}', [ClientController::class, 'showAnimal'])->name('client.animal.show');
Route::post('/reviews', [ClientController::class, 'storeReview'])->name('reviews.store');
Route::post('/contact/submit', [ClientController::class, 'storeMessage']);
Route::get('/contact', [ClientController::class, 'contact'])->name('client.contact');


// Enregistrement des clics (statistiques)
Route::post('/habitat/{id}/click', [HabitatController::class, 'recordClick'])->name('habitat.recordClick');
Route::post('/animals/{id}/click', [AnimalController::class, 'recordAnimalClick'])->name('animal.recordClick');


// Documentation
Route::get('/admin/documentation', [DocumentationController::class, 'show'])->name('admin.documentation');



require __DIR__.'/auth.php';