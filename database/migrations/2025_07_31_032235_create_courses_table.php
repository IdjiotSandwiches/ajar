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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->text('image');
            $table->decimal('price');
            $table->integer('duration');
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('institute_id');

            $table->timestamps();
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('institute_id')->references('user_id')->on('institutes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
