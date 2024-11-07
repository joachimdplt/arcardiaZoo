<?php

test('registration screen cannot be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(404); // Ou utilisez 302 si vous redirigez
});

it('forbids new users from registering', function () {
    $data = [
        'name' => 'John Doe',
        'email' => 'johndoe@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ];

    $response = $this->post('/register', $data);

    $response->assertStatus(404); // Ou utilisez 302 si vous redirigez
    $this->assertGuest(); // Vérifie que personne n'est authentifié
});
