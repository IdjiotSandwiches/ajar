<?php

namespace App\Enums;

enum ReminderEnum: int
{
    case Message = 1;
    case AddReview = 2;
    case JoinMeeting = 3;
    case CompleteCourse = 4;
    case AddMeetingLink = 5;
    case HasTeacherApplication = 6;
    case HasCourseApplication = 7;

    public static function asArray(): array
    {
        return array_column(self::cases(), 'value', 'name');
    }
}
