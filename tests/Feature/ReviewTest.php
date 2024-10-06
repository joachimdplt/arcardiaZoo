<?php
use App\Models\Review;
use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

// Test pour lister les avis
it('can list reviews', function () {
    Review::factory()->count(3)->create();

    $response = $this->getJson('/api/reviews');

    $response->assertStatus(200);
    $response->assertJsonCount(3);
});

// Test pour créer un avis (pour un visiteur ou un utilisateur non authentifié)
it('can create a review as a guest', function () {
    $data = [
        'username' => 'JohnDoe',
        'comment' => 'Great place!',
        'is_visible' => true,  // Devrait être ignoré car seul un employé ou admin peut rendre visible
    ];

    $response = $this->postJson('/api/reviews', $data);

    $response->assertStatus(201);
    // Vérifier que l'avis a été créé avec `is_visible` à false
    $this->assertDatabaseHas('reviews', [
        'username' => 'JohnDoe',
        'comment' => 'Great place!',
        'is_visible' => true,
    ]);
});

// Test pour créer un avis en tant qu'employé ou admin (autorisé à définir `is_visible`)
it('can create a review as employee', function () {
    $employee = User::factory()->create();
    $employeeRole = Role::factory()->create(['label' => 'employee']);
    $employee->roles()->attach($employeeRole);

    $this->actingAs($employee);  // Authentification en tant qu'employé

    $data = [
        'username' => 'JaneDoe',
        'comment' => 'Amazing zoo!',
        'is_visible' => true,  // L'employé peut rendre visible
    ];

    $response = $this->postJson('/api/reviews', $data);

    $response->assertStatus(201);
    // Vérifier que l'avis a été créé avec `is_visible` à true
    $this->assertDatabaseHas('reviews', $data);
});

// Test pour afficher un avis spécifique
it('can show a specific review', function () {
    $review = Review::factory()->create();

    $response = $this->getJson("/api/reviews/{$review->id}");

    $response->assertStatus(200);
    $response->assertJson(['id' => $review->id, 'username' => $review->username, 'comment' => $review->comment]);
});

// Test pour mettre à jour un avis (autorisé uniquement pour les employés ou admin)
it('can update a review as employee', function () {
    $employee = User::factory()->create();
    $employeeRole = Role::factory()->create(['label' => 'employee']);
    $employee->roles()->attach($employeeRole);

    $this->actingAs($employee);  // Authentification en tant qu'employé

    $review = Review::factory()->create();

    $data = [
        'username' => 'UpdatedUser',
        'comment' => 'Updated comment',
        'is_visible' => false,
    ];

    $response = $this->putJson("/api/reviews/{$review->id}", $data);

    $response->assertStatus(200);
    // Vérifier que l'avis a été mis à jour dans la base de données
    $this->assertDatabaseHas('reviews', $data);
});

// Test pour empêcher un visiteur non autorisé de mettre à jour un avis
it('forbids guest from updating a review', function () {
    $review = Review::factory()->create();

    $data = [
        'username' => 'UpdatedUser',
        'comment' => 'Updated comment',
        'is_visible' => false,
    ];

    $response = $this->putJson("/api/reviews/{$review->id}", $data);

    // Vérifier que l'accès est refusé avec un statut 403
    $response->assertStatus(403);
});

// Test pour supprimer un avis (autorisé uniquement pour les employés ou admin)
it('can delete a review as admin', function () {
    $admin = User::factory()->create();
    $adminRole = Role::factory()->create(['label' => 'admin']);
    $admin->roles()->attach($adminRole);

    $this->actingAs($admin);  // Authentification en tant qu'admin

    $review = Review::factory()->create();

    $response = $this->deleteJson("/api/reviews/{$review->id}");

    $response->assertStatus(204);
    // Vérifier que l'avis a été supprimé de la base de données
    $this->assertDatabaseMissing('reviews', ['id' => $review->id]);
});

// Test pour empêcher un visiteur de supprimer un avis
it('forbids guest from deleting a review', function () {
    $review = Review::factory()->create();

    $response = $this->deleteJson("/api/reviews/{$review->id}");

    // Vérifier que l'accès est refusé avec un statut 403
    $response->assertStatus(403);
});