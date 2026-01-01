<?php

namespace App\Enums;

enum PaymentStatusEnum: string
{
    case Pending = "pending";
    case Paid = "paid";
    case Failed = "failed";
    case Refund = "refund";
    case NotEligible = "not eligible";

    public static function asArray(): array
    {
        return array_column(self::cases(), 'value', 'name');
    }
}
