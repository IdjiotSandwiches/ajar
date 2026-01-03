<?php

namespace App\Enums;

enum RoleEnum: int
{
    case Admin = 1;
    case Teacher = 2;
    case Institute = 3;
    case Student = 4;

    public static function asArray(): array
    {
        return array_column(self::cases(), 'value', 'name');
    }
}
