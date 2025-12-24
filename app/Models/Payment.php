<?php

namespace App\Models;

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
        'enrollment_id',
        'midtrans_order_id',
        'amount',
        'status'
    ];

    public function enrollment()
    {
        return $this->belongsTo(EnrolledCourse::class);
    }
}
