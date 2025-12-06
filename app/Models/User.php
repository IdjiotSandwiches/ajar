<?php

namespace App\Models;

use App\Enums\RoleEnum;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @mixin IdeHelperUser
 */
class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone_number',
        'profile_picture',
        'role_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime:Y-m-d H:i:s',
            'password' => 'hashed',
            'role_id' => RoleEnum::class
        ];
    }

    /**
     * BelongsTo: Role
     * @return BelongsTo<Role, User>
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * HasOne: Teacher
     * @return HasOne<Teacher, User>
     */
    public function teacher(): HasOne
    {
        return $this->hasOne(Teacher::class, 'user_id');
    }

    /**
     * HasMany: TeacherReviews
     * @return HasMany<TeacherReview, User>
     */
    public function writtenTeacherReviews(): HasMany
    {
        return $this->hasMany(TeacherReview::class, 'reviewer_id');
    }

    /**
     * HasOne: Institute
     * @return HasOne<Institute, User>
     */
    public function institute(): HasOne
    {
        return $this->hasOne(Institute::class, 'user_id');
    }

    /**
     * HasMany: InstituteReviews
     * @return HasMany<InstituteReview, User>
     */
    public function writtenInstituteReviews(): HasMany
    {
        return $this->hasMany(InstituteReview::class, 'reviewer_id');
    }

    /**
     * HasMany: EnrolledCourses
     * @return HasMany<EnrolledCourse, User>
     */
    public function enrolledCourses(): HasMany
    {
        return $this->hasMany(EnrolledCourse::class, 'student_id');
    }

    /**
     * HasMany: CourseReviews
     * @return HasMany<CourseReview, User>
     */
    public function writtenCourseReviews(): HasMany
    {
        return $this->hasMany(CourseReview::class, 'reviewer_id');
    }

    /**
     * HasMany: Payments
     * @return HasMany<Payment, User>
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'student_id');
    }

    /**
     * HasMany: Chats(Send)
     * @return HasMany<Chat, User>
     */
    public function sentMessages(): HasMany
    {
        return $this->hasMany(Chat::class, 'sender_id');
    }

    /**
     * HasMany: Chats(Receive)
     * @return HasMany<Chat, User>
     */
    public function receivedMessages(): HasMany
    {
        return $this->hasMany(Chat::class, 'receiver_id');
    }

    /**
     * HasMany: Notifications(Send)
     * @return HasMany<Notification, User>
     */
    public function sentNotifications(): HasMany
    {
        return $this->hasMany(Notification::class, 'sender_id');
    }

    /**
     * HasMany: Notifications(Receive)
     * @return HasMany<Notification, User>
     */
    public function receivedNotifications(): HasMany
    {
        return $this->hasMany(Notification::class, 'receiver_id');
    }
}
