<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin IdeHelperCourse
 */
class Course extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'duration',
        'image',
        'discount',
        'teacher_salary',
        'category_id',
        'institute_id'
    ];

    /**
     * BelongsTo: Category
     * @return BelongsTo<Category, Course>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * BelongsTo: Institute
     * @return BelongsTo<Institute, Course>
     */
    public function institute(): BelongsTo
    {
        return $this->belongsTo(Institute::class, 'institute_id', 'user_id');
    }

    /**
     * HasMany: CourseReviews
     * @return HasMany<CourseReview, Course>
     */
    public function courseReviews()
    {
        return $this->hasMany(CourseReview::class);
    }

    /**
     * HasMany: CourseSkills
     * @return HasMany<CourseSkill, Course>
     */
    public function courseSkills(): HasMany
    {
        return $this->hasMany(CourseSkill::class);
    }

    /**
     * HasMany: CourseLearningObjectives
     * @return HasMany<CourseLearningObjective, Course>
     */
    public function courseLearningObjectives(): HasMany
    {
        return $this->hasMany(CourseLearningObjective::class);
    }

    /**
     * HasMany: CourseStudentBenefits
     * @return HasMany<CourseStudentBenefit, Course>
     */
    public function courseStudentBenefits(): HasMany
    {
        return $this->hasMany(CourseStudentBenefit::class);
    }

    /**
     * HasMany: CourseTeacherBenefits
     * @return HasMany<CourseTeacherBenefit, Course>
     */
    public function courseTeacherBenefits(): HasMany
    {
        return $this->hasMany(CourseTeacherBenefit::class);
    }

    /**
     * HasMany: CourseOverview
     * @return HasMany<CourseOverview, Course>
     */
    public function courseOverviews(): HasMany
    {
        return $this->hasMany(CourseOverview::class);
    }

    public function teacherSchedules()
    {
        return $this->hasMany(TeacherSchedule::class);
    }
}
