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
        Schema::create('student_quiz_answers', function (Blueprint $table) {
            $table->id();

            $table->foreignId('attempt_id')
                ->constrained('student_quiz_attempts')
                ->cascadeOnDelete();

            $table->foreignId('quiz_id')
                ->constrained('course_quizzes')
                ->cascadeOnDelete();

            $table->foreignId('selected_option_id')
                ->nullable()
                ->constrained('course_quiz_options')
                ->nullOnDelete();

            $table->boolean('is_correct')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_quiz_answers');
    }
};
