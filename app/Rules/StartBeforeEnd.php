<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class StartBeforeEnd implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (\is_array($value)) {
            $start = $value['start_time'] ?? null;
            $end = $value['end_time'] ?? null;

            if ($start && !$end) {
                $fail('The end time is required when start time is set.');
                return;
            }

            if (!$start && $end) {
                $fail('The start time is required when end time is set.');
                return;
            }

            if ($start && $end && $start >= $end) {
                $fail('The end time must be after the start time.');
                return;
            }
        }
    }
}
