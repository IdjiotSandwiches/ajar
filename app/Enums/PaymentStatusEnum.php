<?php

namespace App\Enums;

enum PaymentStatusEnum: string
{
    case Pending = "pending";
    case Paid = "paid";
    case Failed = "failed";
    case Refund = "refund";

    public static function asArray(): array
    {
        return array_column(self::cases(), 'value', 'name');
    }
}
