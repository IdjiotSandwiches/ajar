<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            CategorySeeder::class,
            DegreeTypeSeeder::class,
            NotificationTypeSeeder::class,
            SkillSeeder::class,
            SocialMediaTypeSeeder::class,
            UserSeeder::class,
            TeacherSeeder::class,
            InstituteSeeder::class,
            CourseSeeder::class,
            CourseLearningObjectiveSeeder::class,
            CourseOverviewSeeder::class,
            CourseSkillSeeder::class,
            CourseStudentBenefitSeeder::class,
            CourseTeacherBenefitSeeder::class,
            CourseScheduleSeeder::class,
            TeacherReviewSeeder::class,
        ]);
    }
}
