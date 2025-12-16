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
            $table->date('session_date');
            $table->string('meeting_link')->nullable();
            $table->unsignedBigInteger('teacher_schedule_id');
            $table->enum('status', ['scheduled', 'canceled', 'completed'])
                ->default('scheduled');
            $table->timestamps();

            $table->foreign('teacher_schedule_id')->references('id')->on('teacher_schedules')->onDelete('cascade');
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
