<?php

namespace App\Enums;

enum StateEnum: int
{
    case Available = 1;
    case Pending = 2;
    case Accepted = 3;

    public static function asArray(): array
    {
        return array_column(self::cases(), 'value', 'name');
    }
}
