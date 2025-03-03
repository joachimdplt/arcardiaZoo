<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ServicesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('services')->delete();
        
        \DB::table('services')->insert(array (
            0 => 
            array (
                'id' => 5,
                'name' => 'Horaires d\'ouvertures',
                'description' => 'Le zoo vous accueil tout les jours sur ces horaires',
                'start_time' => '09:00:00',
                'end_time' => '20:00:00',
                'created_at' => '2024-10-12 15:13:15',
                'updated_at' => '2024-10-31 13:37:37',
            ),
            1 => 
            array (
                'id' => 7,
                'name' => 'Arcadia snacks',
                'description' => 'Une variétés de produits "fait-maison" cuisinés chaque jours.',
                'start_time' => '11:00:00',
                'end_time' => '19:00:00',
                'created_at' => '2024-10-18 09:29:34',
                'updated_at' => '2024-10-31 13:39:04',
            ),
            2 => 
            array (
                'id' => 8,
                'name' => 'Visite avec un guide',
                'description' => 'Visitez nos habitats avec un guide spécialiste de notre parc animalier',
                'start_time' => '09:45:00',
                'end_time' => '19:45:00',
                'created_at' => '2024-10-21 10:48:18',
                'updated_at' => '2024-10-21 16:36:28',
            ),
            3 => 
            array (
                'id' => 9,
                'name' => 'Visite en petit train',
                'description' => 'La visite en petit train, une balade pour voir tous nos espaces',
                'start_time' => '14:00:00',
                'end_time' => '16:00:00',
                'created_at' => '2024-10-21 10:55:20',
                'updated_at' => '2024-10-21 16:12:18',
            ),
        ));
        
        
    }
}