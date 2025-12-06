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
        Schema::create('teacher_applications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('institute_id');
            $table->unsignedBigInteger('teacher_id');
            $table->boolean('is_verified')->nullable();
            $table->timestamps();

            $table->foreign('institute_id')->references('user_id')->on('institutes')->onDelete('cascade');
            $table->foreign('teacher_id')->references('user_id')->on('teachers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_applications');
    }
};
