<?php

namespace App\Enums;

enum LearningStatusEnum: int
{
    case Ongoing = 1;
    case Completed = 2;
    case Cancelled = 3;

    public static function asArray(): array
    {
        return array_column(self::cases(), 'value', 'name');
    }
}
