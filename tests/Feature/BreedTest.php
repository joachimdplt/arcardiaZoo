<?php
use App\Models\Breed;
use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;


uses(RefreshDatabase::class);

// Test pour lister toutes les races avec un utilisateur authentifié
it('can list breeds', function () {
    // Créer et authentifier un utilisateur
    $user = User::factory()->create();
    $this->actingAs($user);

    // Créer des races dans la base de données
    Breed::factory()->count(3)->create();

    // Envoyer une requête pour obtenir la liste des races
    $response = $this->get('/api/breeds'); // Utilisez `get` sans `getJson` car Inertia retourne du HTML

    // Vérifiez que la réponse est 200 et qu'Inertia contient bien les races
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) =>
        $page
            ->component('Admin/Breeds')
            ->has('breeds', 3)  // Vérifie qu'il y a bien 3 races dans la réponse
    );
});

// Test pour créer une race en tant qu'administrateur
it('can create a breed as admin', function () {
    // Créer un utilisateur admin
    $admin = User::factory()->create();
    $adminRole = Role::factory()->create(['label' => 'admin']);
    $admin->roles()->attach($adminRole);

    // Authentification en tant qu'admin
    $this->actingAs($admin);

    // Données pour créer une race
    $data = ['label' => 'Lion'];

    // Requête pour créer une race
    $response = $this->postJson('/api/breeds', $data);

    $response->assertStatus(201);  // Vérifier que la race a été créée
    $this->assertDatabaseHas('breeds', $data);  // Vérifier que la race est bien dans la base de données
});

// Test pour empêcher un invité de créer une race
it('forbids guest from creating a breed', function () {
    $data = ['label' => 'Lion'];

    $response = $this->postJson('/api/breeds', $data);

    $response->assertStatus(403);  // Vérifier que l'accès est refusé
    $this->assertDatabaseMissing('breeds', $data);  // Vérifier que la race n'est pas créée dans la base de données
});

// Test pour empêcher un invité de supprimer une race
it('forbids guest from deleting a breed', function () {
    $breed = Breed::factory()->create();

    $response = $this->deleteJson("/api/breeds/{$breed->id}");

    $response->assertStatus(403);  // Vérifie que l'accès est refusé
    $this->assertDatabaseHas('breeds', ['id' => $breed->id]);  // Vérifie que la race n'a pas été supprimée de la base de données
});

// Test pour supprimer une race en tant qu'administrateur
it('can delete a breed as admin', function () {
    // Créer un utilisateur admin
    $admin = User::factory()->create();
    $adminRole = Role::factory()->create(['label' => 'admin']);
    $admin->roles()->attach($adminRole);

    // Authentification en tant qu'admin
    $this->actingAs($admin);

    // Créer une race existante
    $breed = Breed::factory()->create();

    // Requête pour supprimer la race
    $response = $this->deleteJson("/api/breeds/{$breed->id}");

    $response->assertStatus(302);  // Vérifier que la suppression a réussi
    $this->assertDatabaseMissing('breeds', ['id' => $breed->id]);  // Vérifier que la race a bien été supprimée de la base de données
});
