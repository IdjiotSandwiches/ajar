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
        Schema::create('disbursements', function (Blueprint $table) {
            $table->id();
            $table->string('unique_id');
            $table->string('course_name');
            $table->string('related_entry');
            $table->string('schedule');
            $table->decimal('amount', 12, 2);
            $table->enum('status', ['pending', 'paid', 'not eligible'])->default('pending');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('course_schedule_id')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('course_schedule_id')->references('id')->on('course_schedules')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disbursements');
    }
};
