<?php

namespace App\Enums;

enum StatusEnum: string
{
    case Scheduled = "scheduled";
    case Canceled = "canceled";
    case Completed = "completed";
}
