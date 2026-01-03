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
        Schema::create('institute_reviews', function (Blueprint $table) {
            $table->id();
            $table->decimal('rating', 3, 2);
            $table->text('description')->nullable();
            $table->unsignedBigInteger('reviewer_id');
            $table->unsignedBigInteger('institute_id');
            $table->unsignedBigInteger('enrolled_course_id');
            $table->timestamps();

            $table->foreign('reviewer_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('institute_id')->references('user_id')->on('institutes')->onDelete('cascade');
            $table->foreign('enrolled_course_id')->references('id')->on('enrolled_courses')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('institute_reviews');
    }
};
