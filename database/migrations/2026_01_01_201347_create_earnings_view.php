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
        DB::statement("
            CREATE OR REPLACE VIEW earnings_view AS
            SELECT
                d.id,
                d.course_name,
                d.related_entry AS related_user,
                d.schedule,
                d.amount,
                d.status,
                d.created_at,
                d.user_id
            FROM disbursements d

            UNION ALL

            SELECT
                cs.id,
                c.name AS course_name,
                -- Determine related_user: if teacher, show institute name; if institute, show teacher name
                CASE
                    WHEN cs.teacher_id IS NOT NULL THEN i.name
                    ELSE t.name
                END AS related_user,
                CONCAT(DATE_FORMAT(cs.start_time, '%d %b %Y'), ' ', TIME_FORMAT(cs.start_time, '%H:%i'), ' - ', TIME_FORMAT(cs.end_time, '%H:%i')) AS schedule,
                -- Amount: teacher_salary for teacher, price - teacher_salary for institute
                CASE
                    WHEN cs.teacher_id IS NOT NULL THEN c.teacher_salary
                    ELSE c.price - c.teacher_salary
                END AS amount,
                'pending' AS status,
                cs.start_time AS created_at,
                -- user_id: teacher_id if teacher, else institute_id
                CASE
                    WHEN cs.teacher_id IS NOT NULL THEN cs.teacher_id
                    ELSE c.institute_id
                END AS user_id
            FROM course_schedules cs
            JOIN courses c ON cs.course_id = c.id
            LEFT JOIN users t ON cs.teacher_id = t.id
            LEFT JOIN users i ON c.institute_id = i.id
            WHERE cs.status = 'completed'
            AND cs.is_verified IS NULL
            AND cs.recording_link IS NOT NULL
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS earnings_view");
    }
};
