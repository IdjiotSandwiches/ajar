<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $technology = Category::create(['name' => 'Technology']);
        $design = Category::create(['name' => 'Design']);

        Category::create(['name' => 'Artificial Intelligence', 'parent_id' => $technology->id]);
        Category::create(['name' => 'Network', 'parent_id' => $technology->id]);
        Category::create(['name' => 'Cyber Security', 'parent_id' => $technology->id]);
        Category::create(['name' => 'Cloud Computing', 'parent_id' => $technology->id]);
        Category::create(['name' => 'Data Science', 'parent_id' => $technology->id]);

        Category::create(['name' => 'Photoshop', 'parent_id' => $design->id]);
        Category::create(['name' => 'Illustrator', 'parent_id' => $design->id]);
        Category::create(['name' => 'Blender', 'parent_id' => $design->id]);
        Category::create(['name' => 'Color Theory', 'parent_id' => $design->id]);
        Category::create(['name' => 'Figma', 'parent_id' => $design->id]);
    }
}
