<?php
use App\Models\VeterinaryReport;
use App\Models\User;
use App\Models\Role;
use App\Models\Animal;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;


uses(RefreshDatabase::class);

// Test pour lister tous les rapports vétérinaires en tant qu'admin, vétérinaire ou employee

it('can list veterinary reports as admin, veterinary or employee', function () {

    // Créer un utilisateur admin, vétérinaire et employee
    
    $admin = User::factory()->create();
    $adminRole = Role::factory()->create(['label' => 'Admin']);
    $admin->roles()->attach($adminRole);

    $veterinary = User::factory()->create();
    $veterinaryRole = Role::factory()->create(['label' => 'Veterinary']);
    $veterinary->roles()->attach($veterinaryRole);

    $employee = User::factory()->create();
    $employeeRole = Role::factory()->create(['label' => 'Employee']);
    $employee->roles()->attach($employeeRole);

    // Créer quelques rapports vétérinaires
    VeterinaryReport::factory()->count(3)->create();

    // Authentification en tant qu'admin
    $this->actingAs($admin);
    $response = $this->getJson('/api/veterinary-reports');
    $response->assertStatus(200);
    $response->assertInertia(function (AssertableInertia $page) {
        $page
            ->component('Admin/VeterinaryReports');
            });

    // Authentification en tant que vétérinaire
    $this->actingAs($veterinary);
    $response->assertStatus(200);
    $response->assertInertia(function (AssertableInertia $page) {
        $page
            ->component('Admin/VeterinaryReports');
            });

     // Authentification en tant que vétérinaire
     $this->actingAs($employee);
     $response->assertStatus(200);
     $response->assertInertia(function (AssertableInertia $page) {
         $page
             ->component('Admin/VeterinaryReports');
             });

    
});

// Test pour empêcher un invité de lister les rapports vétérinaires
it('forbids guests  from listing veterinary reports', function () {

    // Tentative sans être connecté (invité)
    $response = $this->getJson('/api/veterinary-reports');
    $response->assertStatus(403); // Vérifier que l'accès est refusé

});

// Test pour créer un rapport vétérinaire en tant que vétérinaire
it('can create a veterinary report as veterinary', function () {
    // Créer un utilisateur vétérinaire
    $veterinary = User::factory()->create();
    $veterinaryRole = Role::factory()->create(['label' => 'Veterinary']);
    $veterinary->roles()->attach($veterinaryRole);

    // Authentification en tant que vétérinaire
    $this->actingAs($veterinary);

    // Créer un animal associé
    $animal = Animal::factory()->create();

    // Données pour créer un rapport vétérinaire
    $data = [
        'date' => now()->toDateString(),
        'details' => 'Animal check-up completed',
        'animal_id' => $animal->id,
        'user_id' => $veterinary->id,
    ];

    // Requête pour créer un rapport vétérinaire
    $response = $this->postJson('/api/veterinary-reports', $data);

    $response->assertStatus(302); // Vérifier que le rapport a été créé
    $this->assertDatabaseHas('veterinary_reports', $data); // Vérifier que le rapport est bien dans la base de données
});

// Test pour empêcher un invité ou un employé de créer un rapport vétérinaire
it('forbids guests and employees from creating a veterinary report', function () {
    $animal = Animal::factory()->create();
    $veterinary = User::factory()->create();

    $data = [
        'date' => now()->toDateString(),
        'details' => 'Animal check-up completed',
        'animal_id' => $animal->id,
        'user_id' => $veterinary->id,
    ];

    // Tentative sans être connecté (invité)
    $response = $this->postJson('/api/veterinary-reports', $data);
    
    $response->assertStatus(403); // Vérifier que l'accès est refusé

    // Créer un employé et tenter la création
    $employee = User::factory()->create();
    $employeeRole = Role::factory()->create(['label' => 'Employee']);
    $employee->roles()->attach($employeeRole);

    // Authentification en tant qu'employé
    $this->actingAs($employee);
    $response = $this->postJson('/api/veterinary-reports', $data);
    $response->assertStatus(403); // Vérifier que l'accès est refusé
});

// Test pour mettre à jour un rapport vétérinaire en tant que vétérinaire
it('can update a veterinary report as veterinary', function () {
    // Créer un utilisateur vétérinaire
    $veterinary = User::factory()->create();
    $veterinaryRole = Role::factory()->create(['label' => 'Veterinary']);
    $veterinary->roles()->attach($veterinaryRole);

    // Authentification en tant que vétérinaire
    $this->actingAs($veterinary);

    // Créer un rapport vétérinaire existant
    $report = VeterinaryReport::factory()->create([
        'user_id' => $veterinary->id,
    ]);

    // Données pour la mise à jour
    $data = [
        'date' => now()->toDateString(),
        'details' => 'Updated report details',
        'animal_id' => $report->animal_id,
        'user_id' => $veterinary->id,
    ];

    // Requête pour mettre à jour le rapport vétérinaire
    $response = $this->putJson("/api/veterinary-reports/{$report->id}", $data);

    $response->assertStatus(302); // Vérifier que la mise à jour a réussi
    $this->assertDatabaseHas('veterinary_reports', $data); // Vérifier que la mise à jour est bien en base de données
});

// Test pour empêcher un invité ou un employé de mettre à jour un rapport vétérinaire
it('forbids guests and employees from updating a veterinary report', function () {
    $report = VeterinaryReport::factory()->create();

    $data = [
        'date' => now()->toDateString(),
        'details' => 'Updated report details',
        'animal_id' => $report->animal_id,
        'user_id' => $report->user_id,
    ];

    // Tentative sans être connecté (invité)
    $response = $this->putJson("/api/veterinary-reports/{$report->id}", $data);
    $response->assertStatus(403); // Vérifier que l'accès est refusé

    // Créer un employé et tenter la mise à jour
    $employee = User::factory()->create();
    $employeeRole = Role::factory()->create(['label' => 'Employee']);
    $employee->roles()->attach($employeeRole);

    // Authentification en tant qu'employé
    $this->actingAs($employee);
    $response = $this->putJson("/api/veterinary-reports/{$report->id}", $data);
    $response->assertStatus(403); // Vérifier que l'accès est refusé
});

// Test pour supprimer un rapport vétérinaire en tant qu'administrateur
it('can not delete a veterinary report as admin', function () {
    // Créer un utilisateur admin
    $admin = User::factory()->create();
    $adminRole = Role::factory()->create(['label' => 'Admin']);
    $admin->roles()->attach($adminRole);

    // Authentification en tant qu'admin
    $this->actingAs($admin);

    // Créer un rapport vétérinaire existant
    $report = VeterinaryReport::factory()->create();

    // Requête pour supprimer le rapport vétérinaire
    $response = $this->deleteJson("/api/veterinary-reports/{$report->id}");

    $response->assertStatus(403); // Vérifier que la suppression a réussi
    $this->assertDatabaseHas('veterinary_reports', ['id' => $report->id]); // Vérifier que le rapport a bien été supprimé
});

// Test pour empêcher un invité de supprimer un rapport vétérinaire
it('forbids guests from deleting a veterinary report', function () {

    // Créer un rapport vétérinaire existant
    $report = VeterinaryReport::factory()->create();

    // Tentative sans être connecté (invité)
    $response = $this->deleteJson("/api/veterinary-reports/{$report->id}");
    $response->assertStatus(403); // Vérifier que l'accès est refusé
});

it('allow veterinarians to delete a veterinary report', function () {
    // Créer un vétérinaire
    $veterinary = User::factory()->create();
    $veterinaryRole = Role::factory()->create(['label' => 'Veterinary']);
    $veterinary->roles()->attach($veterinaryRole);

    // Créer un rapport vétérinaire existant
    $report = VeterinaryReport::factory()->create();

    // Authentification en tant que vétérinaire
    $this->actingAs($veterinary);

    // Tentative sans être connecté (invité)
    $response = $this->deleteJson("/api/veterinary-reports/{$report->id}");
    $response->assertStatus(302); // Vérifier que l'accès est autorisé
});