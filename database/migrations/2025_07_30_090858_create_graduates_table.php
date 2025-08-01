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
        Schema::create('graduates', function (Blueprint $table) {
            $table->id();
            $table->string('degree_title');
            $table->string('university_name');
            $table->unsignedBigInteger('teacher_id');
            $table->unsignedBigInteger('degree_type_id');
            $table->timestamps();

            $table->foreign('teacher_id')->references('user_id')->on('teachers')->onDelete('cascade');
            $table->foreign('degree_type_id')->references('id')->on('degree_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('graduates');
    }
};
