<?php
use App\Models\Review;
use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);


// Test pour créer un avis (pour un visiteur ou un utilisateur non authentifié)
it('can create a review as a guest', function () {
    $data = [
        'username' => 'JohnDoe',
        'comment' => 'Great place!',
        'is_visible' => false,  
    ];

    $response = $this->postJson('/reviews', $data);

    $response->assertStatus(302);

    $this->assertDatabaseHas('reviews', [
        'username' => 'JohnDoe',
        'comment' => 'Great place!',
        'is_visible' => false,
    ]);
});


// Test pour mettre à jour un avis (autorisé uniquement pour les employés)
it('can update a review as employee', function () {
    $employee = User::factory()->create();
    $employeeRole = Role::factory()->create(['label' => 'Employee']);
    $employee->roles()->attach($employeeRole);

    $this->actingAs($employee);  // Authentification en tant qu'employé

    $review = Review::factory()->create();

    $data = [
        'is_visible' => true,
    ];

    $response = $this->putJson("/admin/reviews/{$review->id}/approve", $data);

    $response->assertStatus(302);
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

    $response = $this->putJson("/admin/reviews/{$review->id}/approve", $data);

    // Vérifier que l'accès est refusé avec un statut 403
    $response->assertStatus(403);
});

// Test pour supprimer un avis (autorisé uniquement pour les employés)
it('can delete a review as employee', function () {
    $employee = User::factory()->create();
    $employeeRole = Role::factory()->create(['label' => 'Employee']);
    $employee->roles()->attach($employeeRole);

    $this->actingAs($employee);  // Authentification en tant qu'admin

    $review = Review::factory()->create();

    $response = $this->deleteJson("/api/reviews/{$review->id}");

    $response->assertStatus(302);
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