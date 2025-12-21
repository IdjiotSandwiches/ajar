<?php

namespace App\Enums;

use Carbon\CarbonInterface;

enum DayEnum: string
{
    case Monday = "Monday";
    case Tuesday = "Tuesday";
    case Wednesday = "Wednesday";
    case Thursday = "Thursday";
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

    public function carbonDay(): int
    {
        return match ($this) {
            self::Monday => CarbonInterface::MONDAY,
            self::Tuesday => CarbonInterface::TUESDAY,
            self::Wednesday => CarbonInterface::WEDNESDAY,
            self::Thursday => CarbonInterface::THURSDAY,
            self::Friday => CarbonInterface::FRIDAY,
            self::Saturday => CarbonInterface::SATURDAY,
            self::Sunday => CarbonInterface::SUNDAY,
        };
    }

    public function offsetFromMonday(): int
    {
        return match ($this) {
            self::Monday => 0,
            self::Tuesday => 1,
            self::Wednesday => 2,
            self::Thursday => 3,
            self::Friday => 4,
            self::Saturday => 5,
            self::Sunday => 6,
        };
    }
}
