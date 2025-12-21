<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('course_schedules', function (Blueprint $table) {
            $table->id();
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->string('meeting_link')->nullable();
            $table->unsignedBigInteger('course_id');
            $table->unsignedBigInteger('teacher_id');
            $table->enum('status', ['scheduled', 'canceled', 'completed'])
                ->default('scheduled');
            $table->timestamps();

            $table->foreign('course_id')->references('id')->on('courses')->onDelete('restrict');
            $table->foreign('teacher_id')->references('user_id')->on('teachers')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_schedules');
    }
};
