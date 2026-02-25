<?php

namespace App\Services;

use App\Models\CourseQuizOption;
use App\Models\MyCourse;
use App\Enums\CourseStatusEnum;
use App\Models\StudentQuizAnswer;
use App\Models\StudentQuizAttempt;
use Exception;
use Illuminate\Support\Facades\Auth;

class StudentService
{
    public function getProfile()
    {
        $user = Auth::user();
        return $user;
    }

    public function updateProfile($data)
    {
        $user = Auth::user();
        $user->update([
            'name' => $data['name'],
            'phone_number' => $data['phone_number'],
            'email' => $data['email']
        ]);
    }

    public function getMyCourses($filters)
    {
        $user = Auth::user();
        $courses = MyCourse::with('course.institute.user')
            ->where('user_id', $user->id)
            ->when(
                !empty($filters['search']),
                fn($q) => $q->whereHas(
                    'course',
                    fn($query) =>
                    $query->where('name', 'like', "%{$filters['search']}%")
                )
            )
            ->paginate(10)
            ->through(fn($q) => [
                'id' => $q->id,
                'course_id' => $q->course->id,
                'name' => $q->course->name,
                'description' => $q->course->description,
                'image' => $q->course->image,
                'institute' => $q->course->institute->user->name
            ]);

        return $courses;
    }

    public function getMyCourse($id)
    {
        $user = Auth::user();
        $q = MyCourse::with(
            'course.courseSessions',
            'course.courseSchedules',
            'course.courseQuizzes.options',
            'quizAttempt.answers'
        )
            ->where('user_id', $user->id)
            ->where('course_id', $id)
            ->first();

        return [
            'id' => $q->id,
            'course_id' => $q->course->id,
            'name' => $q->course->name,
            'description' => $q->course->description,
            'image' => $q->course->image,
            'has_schedule' => $q->course->courseSchedules
                ->where('status', CourseStatusEnum::Scheduled)
                ->count() != 0,
            'sessions' => $q->course->courseSessions
                ->map(fn($item) => [
                    'description' => $item->description,
                    'link' => $item->video_link
                ]),
            'quizzes' => $q->course->courseQuizzes
                ->map(fn($item) => [
                    'id' => $item->id,
                    'question' => $item->question,
                    'options' => $item->options->map(fn($option) => [
                        'id' => $option->id,
                        'option_text' => $option->option_text,
                        'is_correct' => $option->is_correct
                    ])
                ]),
            'attempt' => $q->quizAttempt
                ? [
                    'score' => $q->quizAttempt->score,
                    'answers' => $q->quizAttempt->answers
                        ->map(fn($item) => [
                            'quiz_id' => $item->quiz_id,
                            'selected_option_id' => $item->selected_option_id,
                            'is_correct' => $item->is_correct
                        ])
                ]
                : null
        ];
    }

    public function submitAnswer($validated, $courseId)
    {
        $userId = Auth::user()->id;
        $exists = StudentQuizAttempt::where('my_course_id', $courseId)
            ->where('user_id', $userId)
            ->exists();

        if ($exists) {
            throw new Exception('Already submitted.');
        }

        $attempt = StudentQuizAttempt::create([
            'my_course_id' => $courseId,
            'user_id' => $userId,
        ]);

        $score = 0;
        $total = \count($validated['answers']);

        foreach ($validated['answers'] as $answer) {
            $quizId = $answer['quiz_id'];
            $optionId = $answer['selected_option_id'];

            $option = CourseQuizOption::findOrFail($optionId);
            $isCorrect = (bool) $option->is_correct;

            if ($isCorrect) {
                $score++;
            }

            StudentQuizAnswer::create([
                'attempt_id' => $attempt->id,
                'quiz_id' => $quizId,
                'selected_option_id' => $optionId,
                'is_correct' => $isCorrect
            ]);
        }

        $finalScore = ($score / $total) * 100;

        $attempt->update([
            'score' => $finalScore
        ]);
    }
}
