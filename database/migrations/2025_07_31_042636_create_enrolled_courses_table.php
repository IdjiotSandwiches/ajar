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
        Schema::create('enrolled_courses', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_complete');
            $table->boolean('is_verified')->nullable();
            $table->unsignedBigInteger('course_schedule_id');
            $table->unsignedBigInteger('student_id');
            $table->timestamps();

            $table->foreign('course_schedule_id')->references('id')->on('course_schedules')->onDelete('cascade');
            $table->foreign('student_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrolled_courses');
    }
};
