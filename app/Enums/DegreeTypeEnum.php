<?php

namespace App\Enums;

enum DegreeTypeEnum: int
{
    case S1 = 1;
    case S2 = 2;
    case S3 = 3;
    case D3 = 4;

    public static function asArray(): array
    {
        return array_column(self::cases(), 'value', 'name');
    }
}
