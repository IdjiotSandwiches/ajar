<?php

namespace App\Services\Teacher;

use App\Models\Teacher;
use App\Models\TeacherApplication;
use App\Utilities\UploadUtility;
use App\Utilities\Utility;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
}
