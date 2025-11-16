<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin IdeHelperDegreeType
 */
class DegreeType extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = ['name'];

    /**
     * HasMany: Graduates
     * @return HasMany<Graduate, DegreeType>
     */
    public function graduates(): HasMany
    {
        return $this->hasMany(Graduate::class);
    }
}
