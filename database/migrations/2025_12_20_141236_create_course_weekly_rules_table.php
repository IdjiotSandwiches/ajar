<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('course_weekly_rules', function (Blueprint $table) {
            $table->id();
            $table->enum('day', [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ]);
            $table->time('start_time');
            $table->time('end_time');
            $table->boolean('active')->default(true);
            $table->unsignedBigInteger('teacher_id');
            $table->unsignedBigInteger('teaching_course_id');
            $table->timestamps();

            $table->foreign('teacher_id')->references('user_id')->on('teachers')->onDelete('cascade');
            $table->foreign('teaching_course_id')->references('id')->on('teaching_courses')->onDelete('cascade');

            $table->unique(['teacher_id', 'day', 'start_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_weekly_rules');
    }
};
