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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('enrolled_course_id');
            $table->unsignedBigInteger('user_id');
            $table->string('unique_id');
            $table->string('snap_token')->nullable();
            $table->integer('amount');
            $table->enum('status', ['pending', 'paid', 'expired'])->default('pending');
            $table->timestamps();

            $table->foreign('enrolled_course_id')->references('id')->on('enrolled_courses')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
