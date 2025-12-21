<?php

namespace App\Enums;

enum DayEnum: string
{
    case Monday = "Monday";
    case Tuesday = "Tuesday";
    case Wednesday = "Wednesday";
    case Thrusday = "Thursday";
    case Friday = "Friday";
    case Saturday = "Saturday";
    case Sunday = "Sunday";

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function asArray(): array
    {
        return array_column(self::cases(), 'value', 'name');
    }
}
