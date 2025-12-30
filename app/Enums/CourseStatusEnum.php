<?php

namespace App\Enums;

enum CourseStatusEnum: string
{
    case Scheduled = "scheduled";
    case Cancelled = "cancelled";
    case Completed = "completed";

    public static function asArray(): array
    {
        return array_column(self::cases(), 'value', 'name');
    }
}
