<?php

namespace App\Services;

use App\Models\Institute;
use App\Models\Teacher;
use App\Models\TeacherApplication;
use App\Utilities\UploadUtility;
use App\Utilities\Utility;
use Illuminate\Support\Facades\Auth;

class TeacherService
{
    public function getTeacherDetail($id)
    {
        $teacher = Teacher::with('user', 'category', 'reviews.reviewer.role', 'graduates', 'workExperiences', 'certificates', 'courses.course')
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
            'teacher' => $teacher,
            'application' => $application ?? null
        ];
    }

    public function applyAsTeacher($id)
    {
        $user = Auth::user();
        if ($user) {
            $user = $user->load('teacher');
        }

        $institute = Institute::with(['category.children'])
            ->where('user_id', $id)
            ->first();
        $categories = $institute->category->children;
        $isCorrectCategory = $categories->contains('id', $user?->teacher?->category_id);
        if (!$isCorrectCategory)
            throw new \Exception('Your category not the same as the insitution.');

        $application = TeacherApplication::firstOrNew([
            'teacher_id' => $user?->id,
            'institute_id' => $id
        ]);

        $application->is_verified = null;
        $application->save();
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

    public function updateDetail($data)
    {
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

        if (!empty($data['certificates'])) {
            foreach ($data['certificates'] as $file) {
                $url = UploadUtility::upload($file, 'certificates');
                $teacher->certificates()->create([
                    'image' => $url,
                ]);
            }
        }

        if (!empty($data['deleted_certificates'])) {
            $teacher->certificates()
                ->whereIn('image', $data['deleted_certificates'])
                ->delete();

            foreach ($data['deleted_certificates'] as $file) {
                UploadUtility::remove($file);
            }
        }
    }
}
