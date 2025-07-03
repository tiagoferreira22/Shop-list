<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PopularSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'First',
            'email' => 'first@example.com',
            'password' => Hash::make('senha123'),
            'email_verified_at' => now(),
        ]);

        $types = ['alimentício', 'limpeza', 'higiene pessoal', 'beleza', 'utensílios'];

        $statuses = ['comprando', 'comprado'];

        for ($i = 1; $i <= 50; $i++) {
            Product::create([
                'user_id' => $user->id,
                'name' => 'Produto ' . $i,
                'type' => $types[array_rand($types)],
                'status' => $statuses[array_rand($statuses)],
                'amount' => rand(1, 10),
                'created_at' => now()->subDays(rand(0, 30)), // Datas variadas
            ]);
        }
    }
}
