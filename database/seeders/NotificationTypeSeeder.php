<?php

namespace Database\Seeders;

use App\Models\NotificationType;
use Illuminate\Database\Seeder;

class NotificationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $notificationTypes = [
            ['name' => 'Accepted'],
            ['name' => 'Rejected'],
            ['name' => 'Request']
        ];

        foreach ($notificationTypes as $notificationType) {
            NotificationType::firstOrCreate(['name' => $notificationType['name']]);
        }
    }
}
