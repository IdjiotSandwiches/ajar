<?php

namespace App\Services\Teacher;

use App\Enums\CourseStatusEnum;
use App\Models\CourseSchedule;
use App\Models\MyCourse;
use App\Models\Teacher;
use App\Models\EnrolledCourse;
use App\Models\TeacherApplication;
use App\Utilities\Utility;
use App\Utilities\UploadUtility;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TeacherService
{
    public function getTeacherDetail($id)
    {
        $teacher = Teacher::with([
            'user.socialMedias.socialMediaType',
            'reviews.reviewer',
            'graduates',
            'workExperiences',
            'certificates',
            'teachingCourses' => fn($q) => $q->where('is_verified', true),
            'teachingCourses.course.institute.user',
        ])
            ->where('user_id', $id)
            ->first();

        $user = Auth::user();
        if ($user) {
            $user = $user->load('institute');
            $application = TeacherApplication::where('institute_id', $user->id)
                ->where('teacher_id', $teacher->user_id)
                ->first();
        }

        return [
            'teacher' => [
                'id' => $teacher->user_id,
                'uuid' => $teacher->user->uuid,
                'name' => $teacher->user->name,
                'description' => $teacher->description,
                'graduates' => $teacher->graduates,
                'work_experiences' => $teacher->workExperiences,
                'certificates' => $teacher->certificates,
                'profile_picture' => $teacher->user->profile_picture,
                'courses' => $teacher->teachingCourses->map(fn($item) => [
                    'id' => $item->course->id,
                    'name' => $item->course->name,
                    'description' => $item->course->description,
                    'duration' => $item->course->duration,
                    'image' => $item->course->image,
                    'teacher_salary' => $item->course->teacher_salary,
                    'price' => $item->course->price,
                    'discount' => $item->course->discount,
                    'institute' => $item->course->institute->user->name,
                ]),
                'reviews' => $teacher->reviews->map(fn($item) => [
                    'rating' => $item->rating,
                    'description' => $item->description,
                    'name' => $item->reviewer->name,
                    'profile_picture' => $item->reviewer->profile_picture,
                ]),
                'social_medias' => $teacher->user->socialMedias->map(fn($item) => [
                    'name' => $item->socialMediaType->name,
                    'url' => $item->url
                ])
            ],
            'application' => $application ?? null
        ];
    }

    public function getProfile()
    {
        $user = Auth::user();
        $teacher = Teacher::with(['user.socialMedias.socialMediaType', 'user.role'])
            ->where('user_id', $user?->id)
            ->first();

        return $teacher;
    }

    public function updateProfile($data)
    {
        $user = Auth::user();
        $user->update([
            'name' => $data['name'],
            'phone_number' => $data['phone_number'],
            'email' => $data['email'],
        ]);

        Utility::updateSocialMedias($user, $data);
    }

    public function updateDetail(array $data)
    {
        return DB::transaction(function () use ($data) {
            $user = Auth::user();
            $teacher = $user->teacher;

            $teacher->update([
                'description' => $data['description'],
            ]);

            $teacher->graduates()->delete();
            foreach ($data['graduates'] as $g) {
                $teacher->graduates()->create([
                    'degree_title' => $g['degree_title'],
                    'university_name' => $g['university_name'],
                    'degree_type_id' => $g['degree_type'],
                ]);
            }

            $teacher->workExperiences()->delete();
            foreach ($data['works'] as $w) {
                $teacher->workExperiences()->create([
                    'position' => $w['position'],
                    'institution' => $w['institution'],
                    'duration' => $w['duration'],
                ]);
            }

            if (!empty($data['deleted_certificates'])) {
                $teacher->certificates()
                    ->whereIn('image', $data['deleted_certificates'])
                    ->delete();
            }

            if (!empty($data['certificates'])) {
                foreach ($data['certificates'] as $file) {
                    $url = UploadUtility::upload($file, 'certificates');

                    $teacher->certificates()->create([
                        'image' => $url,
                    ]);
                }
            }

            if ($teacher->certificates()->count() === 0) {
                throw new \Exception('At least one certificate is required.');
            }
        });

        foreach ($data['deleted_certificates'] ?? [] as $file) {
            UploadUtility::remove($file);
        }
    }

    public function sessionDetail($id)
    {
        $session = CourseSchedule::with('course')
            ->where('id', $id)
            ->first();

        $session = [
            'id' => $session->id,
            'name' => $session->course->name,
            'schedule' => Carbon::parse($session->start_time)->format('d M Y') . ' '
                . Carbon::parse($session->start_time)->toTimeString('minute') . ' - '
                . Carbon::parse($session->end_time)->toTimeString('minute'),
            'meeting_link' => $session->meeting_link,
            'recording_link' => $session->recording_link,
            'can_modify' => $session->status === CourseStatusEnum::Scheduled && now()->lt($session->start_time->subHours(2)),
        ];

        return $session;
    }

    public function enrollsDetail($id)
    {
        $enrolls = EnrolledCourse::with(
            'student',
            'courseSchedule.course',
            'student.myCourses.quizAttempt'
        )
            ->where('course_schedule_id', $id)
            ->where('status', CourseStatusEnum::Scheduled)
            ->paginate(10);

        $courseId = $enrolls->first()?->courseSchedule->course_id;
        $enrolls->getCollection()->transform(function ($item) use ($courseId) {
            $myCourse = $item->student->myCourses
                ->where('course_id', $courseId)
                ->first();

            $attempt = $myCourse?->quizAttempt;
            return [
                'id' => $myCourse?->id,
                'name' => $item->student->name,
                'score' => $attempt?->score,
                'status' => (bool) $attempt,
            ];
        });

        return $enrolls;
    }

    public function getQuizAnswers($id)
    {
        $q = MyCourse::with(
            'course.courseSessions',
            'course.courseSchedules',
            'course.courseQuizzes.options',
            'quizAttempt.answers'
        )
            ->where('id', $id)
            ->first();

        return [
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
}
