<?php

use App\Models\Role;
use App\Models\Service;
use App\Models\Breed;
use App\Models\Image;
use App\Models\Animal;
use App\Models\Habitat;
use App\Models\Review;
use App\Models\VeterinaryReport;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('can list roles', function () {
    Role::factory()->count(3)->create();

    $response = $this->getJson('/api/roles');

    $response->assertStatus(200);
    $response->assertJsonCount(3);
});

it('can create a role', function () {
    $data = ['label' => 'Admin'];

    $response = $this->postJson('/api/roles', $data);

    $response->assertStatus(201);
    $this->assertDatabaseHas('roles', $data);
});

it('can show a specific role', function () {
    $role = Role::factory()->create();

    $response = $this->getJson("/api/roles/{$role->id}");

    $response->assertStatus(200);
    $response->assertJson(['id' => $role->id, 'label' => $role->label]);
});

it('can update a role', function () {
    $role = Role::factory()->create();
    $data = ['label' => 'Updated Role'];

    $response = $this->putJson("/api/roles/{$role->id}", $data);

    $response->assertStatus(200);
    $this->assertDatabaseHas('roles', $data);
});

it('can delete a role', function () {
    $role = Role::factory()->create();

    $response = $this->deleteJson("/api/roles/{$role->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('roles', ['id' => $role->id]);
});

// Add similar tests for each entity

it('can list services', function () {
    Service::factory()->count(3)->create();

    $response = $this->getJson('/api/services');

    $response->assertStatus(200);
    $response->assertJsonCount(3);
});

it('can create a service', function () {
    $data = ['name' => 'Service Name', 'description' => 'Service Description'];

    $response = $this->postJson('/api/services', $data);

    $response->assertStatus(201);
    $this->assertDatabaseHas('services', $data);
});

// Add more tests for each of your entities (Breeds, Images, Animals, etc.)

it('can list animals', function () {
    Animal::factory()->count(3)->create();


    $response = $this->getJson('/api/animals');

    $response->assertStatus(200);
    $response->assertJsonCount(3);
});

it('can create an animal', function () {

    $image= Image::factory()->create()->id;
    $breed= Breed::factory()->create()->id;

    $data = ['name' => 'Lion', 'status' => 'Healthy', 'breed_id' => $breed, 'image_id' => $image];

    $response = $this->postJson('/api/animals', $data);

    $response->assertStatus(201);
    $this->assertDatabaseHas('animals', $data);
});

// Tests pour Habitat
it('can list habitats', function () {
    Habitat::factory()->count(3)->create();

    $response = $this->getJson('/api/habitats');

    $response->assertStatus(200);
    $response->assertJsonCount(3);
});

it('can create a habitat', function () {
    $data = ['name' => 'Forest', 'description' => 'Dense forest', 'comment' => 'High humidity'];

    $response = $this->postJson('/api/habitats', $data);

    $response->assertStatus(201);
    $this->assertDatabaseHas('habitats', $data);
});

it('can update a habitat', function () {
    $habitat = Habitat::factory()->create();
    $data = ['name' => 'Updated Forest', 'description' => 'Updated description'];

    $response = $this->putJson("/api/habitats/{$habitat->id}", $data);

    $response->assertStatus(200);
    $this->assertDatabaseHas('habitats', $data);
});

it('can delete a habitat', function () {
    $habitat = Habitat::factory()->create();

    $response = $this->deleteJson("/api/habitats/{$habitat->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('habitats', ['id' => $habitat->id]);
});

it('can list reviews', function () {
    Review::factory()->count(3)->create();  // Créer 3 reviews

    $response = $this->getJson('/api/reviews');  // Effectue une requête GET sur l'API

    $response->assertStatus(200);  // Vérifie que la réponse est 200 (OK)
    $response->assertJsonCount(3);  // Vérifie que 3 reviews sont retournées
});

// Test pour la création d'un avis (review)
it('can create a review', function () {
    $data = [
        'username' => 'JohnDoe',
        'comment' => 'Great place!',
        'is_visible' => true,
    ];

    // Effectue une requête POST pour créer une review
    $response = $this->postJson('/api/reviews', $data);

    $response->assertStatus(201);  // Vérifie que la création est réussie avec un statut 201 (Created)
    $this->assertDatabaseHas('reviews', $data);  // Vérifie que la review est bien enregistrée dans la base de données
});

// Test pour afficher un avis spécifique
it('can show a specific review', function () {
    $review = Review::factory()->create();  // Crée une review

    $response = $this->getJson("/api/reviews/{$review->id}");  // Effectue une requête GET sur l'API pour afficher la review

    $response->assertStatus(200);  // Vérifie que la réponse est 200 (OK)
    $response->assertJson(['id' => $review->id, 'username' => $review->username, 'comment' => $review->comment]);
});

// Test pour la mise à jour d'un avis (review)
it('can update a review', function () {
    $review = Review::factory()->create();  // Crée une review

    $data = [
        'username' => 'UpdatedUser',
        'comment' => 'Updated comment',
        'is_visible' => false,
    ];

    // Effectue une requête PUT pour mettre à jour la review
    $response = $this->putJson("/api/reviews/{$review->id}", $data);

    $response->assertStatus(200);  // Vérifie que la mise à jour est réussie avec un statut 200
    $this->assertDatabaseHas('reviews', $data);  // Vérifie que la review mise à jour est bien enregistrée dans la base de données
});

// Test pour la suppression d'un avis (review)
it('can delete a review', function () {
    $review = Review::factory()->create();  // Crée une review

    // Effectue une requête DELETE pour supprimer la review
    $response = $this->deleteJson("/api/reviews/{$review->id}");

    $response->assertStatus(204);  // Vérifie que la suppression est réussie avec un statut 204 (No Content)
    $this->assertDatabaseMissing('reviews', ['id' => $review->id]);  // Vérifie que la review n'est plus dans la base de données
});

// Tests pour VeterinaryReport
it('can list veterinary reports', function () {
    VeterinaryReport::factory()->count(3)->create();

    $response = $this->getJson('/api/veterinary-reports');

    $response->assertStatus(200);
    $response->assertJsonCount(3);
});
it('can create a veterinary report with associated user and animal', function () {
    // Crée un utilisateur, un animal et un rapport vétérinaire
    $user = \App\Models\User::factory()->create()->id;
    $animal = Animal::factory()->create()->id;
    $data = [
        'date' => now()->toDateString(),
        'details' => 'Report details',
        'animal_id' => $animal,
        'user_id' => $user,
    ];
    // Création du rapport vétérinaire dans la table veterinary_reports
    $veterinaryReportResponse = $this->postJson('/api/veterinary-reports', $data);
    $veterinaryReportResponse->assertStatus(201);

    // Vérification dans la base de données
    $this->assertDatabaseHas('veterinary_reports', $data);
});

it('can update a veterinary report', function () {
    $report = VeterinaryReport::factory()->create();
    $user = \App\Models\User::factory()->create()->id;
    $animal = Animal::factory()->create()->id;
    $data = [
        'date' => now()->toDateString(),
        'details' => 'Report details',
        'animal_id' => $animal,
        'user_id' => $user,
    ];

    $response = $this->putJson("/api/veterinary-reports/{$report->id}", $data);

    $response->assertStatus(200);
    $this->assertDatabaseHas('veterinary_reports', $data);
});

it('can delete a veterinary report', function () {
    $report = VeterinaryReport::factory()->create();

    $response = $this->deleteJson("/api/veterinary-reports/{$report->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('veterinary_reports', ['id' => $report->id]);
});