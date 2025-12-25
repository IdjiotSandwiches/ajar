<?php

namespace App\Models;

use App\Enums\PaymentStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperPayment
 */
class Payment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'enrolled_course_id',
        'user_id',
        'unique_id',
        'snap_token',
        'amount',
        'status'
    ];

    protected $casts = [
        'status' => PaymentStatusEnum::class
    ];

    public function enrolledCourse()
    {
        return $this->belongsTo(EnrolledCourse::class);
    }
}
