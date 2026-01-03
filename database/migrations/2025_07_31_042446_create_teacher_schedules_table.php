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
        Schema::create('teacher_schedules', function (Blueprint $table) {
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
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->boolean('active')->default(true);
            $table->unsignedBigInteger('teacher_id');
            $table->timestamps();

            $table->foreign('teacher_id')->references('user_id')->on('teachers')->onDelete('cascade');
            $table->unique(['teacher_id', 'day']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_schedules');
    }
};
