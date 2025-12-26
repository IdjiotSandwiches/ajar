<?php

namespace App\Enums;

enum CourseStatusEnum: string
{
    case Scheduled = "scheduled";
    case Canceled = "canceled";
    case Completed = "completed";
}
