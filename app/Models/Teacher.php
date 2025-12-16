<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin IdeHelperTeacher
 */
class Teacher extends Model
{
    use HasFactory;

    protected $primaryKey = 'user_id';
    public $incrementing = false;
    protected $keyType = 'int';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'description',
        'is_verified',
        'category_id'
    ];

    /**
     * BelongsTo: User
     * @return BelongsTo<User, Teacher>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * BelongsTo: Category
     * @return BelongsTo<Category, Teacher>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * HasMany: TeacherReviews
     * @return HasMany<TeacherReview, Teacher>
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(TeacherReview::class, 'teacher_id', 'user_id');
    }

    /**
     * HasMany: Graduates
     * @return HasMany<Graduate, Teacher>
     */
    public function graduates(): HasMany
    {
        return $this->hasMany(Graduate::class, 'teacher_id', 'user_id');
    }

    /**
     * HasMany: WorkExperiences
     * @return HasMany<WorkExperience, Teacher>
     */
    public function workExperiences(): HasMany
    {
        return $this->hasMany(WorkExperience::class, 'teacher_id', 'user_id');
    }

    /**
     * HasMany: Certificates
     * @return HasMany<Certificate, Teacher>
     */
    public function certificates(): HasMany
    {
        return $this->hasMany(Certificate::class, 'teacher_id', 'user_id');
    }

    /**
     * Average review rating
     * @return float
     */
    public function averageRating(): float
    {
        return $this->reviews()->avg('rating') ?? 0;
    }

    /**
     * Review count
     * @return int
     */
    public function reviewCount(): int
    {
        return $this->reviews()->count();
    }

    /**
     * HasMany: Courses
     * @return HasMany<CourseSchedule, Teacher>
     */
    public function teacherSchedules(): HasMany
    {
        return $this->hasMany(TeacherSchedule::class, 'teacher_id', 'user_id');
    }

    public function teacherApplications(): HasMany
    {
        return $this->hasMany(TeacherApplication::class, 'teacher_id', 'user_id');
    }
}
