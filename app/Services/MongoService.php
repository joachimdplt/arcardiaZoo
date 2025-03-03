<?php

namespace App\Services;

use MongoDB\Client;

class MongoService
{
    protected $client;
    protected $collection;

    public function __construct()
    {
        // Initialiser le client MongoDB avec les variables d’environnement
        $this->client = new Client(env('MONGO_URI', 'mongodb://127.0.0.1:27017'));
        $this->collection = $this->client->selectCollection(env('DB_DATABASE'), 'consultations_habitat');
    }

    public function incrementClickCount($habitatId)
    {
        // Incrémente le nombre de clics pour un habitat spécifique
        return $this->collection->updateOne(
            ['habitat_id' => $habitatId],
            ['$inc' => ['click_count' => 1]],
            ['upsert' => true] // Crée le document s’il n’existe pas
        );
    }

    public function getStats()
    {
        // Récupère toutes les statistiques de consultations
        return $this->collection->find()->toArray();
    }
}