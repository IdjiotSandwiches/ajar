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
        Schema::create('course_quiz_options', function (Blueprint $table) {
            $table->id();
            $table->string('option_text');
            $table->boolean('is_correct')->default(false);
            $table->unsignedBigInteger('course_quiz_id');
            $table->timestamps();

            $table->foreign('course_quiz_id')->references('id')->on('course_quizzes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_quiz_options');
    }
};
