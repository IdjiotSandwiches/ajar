<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Earning extends Model
{
    protected $table = 'earnings_view';
    public $incrementing = false;
    public $timestamps = false;
    protected $casts = [
        'amount' => 'decimal:2',
    ];
}
