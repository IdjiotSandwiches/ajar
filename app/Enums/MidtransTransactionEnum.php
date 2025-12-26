<?php

namespace App\Enums;

enum MidtransTransactionEnum: string
{
    case Capture = "capture";
    case Settlement = "settlement";
    case Pending = "pending";
    case Deny = "deny";
    case Cancel = "cancel";
    case Expire = "expire";
    case Failure = "failure";
}
