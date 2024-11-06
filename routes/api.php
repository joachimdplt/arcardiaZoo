<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\BreedController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\AnimalController;
use App\Http\Controllers\HabitatController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\VeterinaryReportController;
use App\Http\Controllers\UserControllerApi;
use App\Http\Controllers\AdminController;

use App\Http\Controllers\ClientController;




Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



// Routes API pour les rôles
Route::apiResource('roles', RoleController::class);

// Routes API pour les services
Route::apiResource('services', ServiceController::class);

// Routes API pour les races (breeds)
Route::apiResource('breeds', BreedController::class);

// Routes API pour les images
Route::apiResource('images', ImageController::class);

// Routes API pour les animaux
Route::apiResource('animals', AnimalController::class);

// Routes API pour les habitats
Route::apiResource('habitats', HabitatController::class);

// Routes API pour les avis (reviews)
Route::apiResource('reviews', ReviewController::class);

// Routes API pour les rapports vétérinaires
Route::apiResource('veterinary-reports', VeterinaryReportController::class);

Route::apiResource('users', UserControllerApi::class);

Route::post('/contact/submit', 'App\Http\Controllers\ClientController@storeMessage');

Route::post('/api/habitats/{id}/consultation', [HabitatController::class, 'addConsultation']);
