<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property int|null $parent_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Category> $children
 * @property-read int|null $children_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Course> $courses
 * @property-read int|null $courses_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Institute> $institutes
 * @property-read int|null $institutes_count
 * @property-read Category|null $parent
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Teacher> $teachers
 * @property-read int|null $teachers_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperCategory {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $image
 * @property int $teacher_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Teacher $teacher
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate whereTeacherId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certificate whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperCertificate {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $message
 * @property int $receiver_id
 * @property int $sender_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $receiver
 * @property-read \App\Models\User $sender
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Chat newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Chat newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Chat query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Chat whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Chat whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Chat whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Chat whereReceiverId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Chat whereSenderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Chat whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperChat {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $image
 * @property string $price
 * @property int $duration
 * @property int $category_id
 * @property int $institute_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category $category
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CourseLearningObjective> $courseLearningObjectives
 * @property-read int|null $course_learning_objectives_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CourseOverview> $courseOverviews
 * @property-read int|null $course_overviews_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CourseReview> $courseReviews
 * @property-read int|null $course_reviews_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CourseSchedule> $courseSchedules
 * @property-read int|null $course_schedules_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CourseSkill> $courseSkills
 * @property-read int|null $course_skills_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CourseStudentBenefit> $courseStudentBenefits
 * @property-read int|null $course_student_benefits_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CourseTeacherBenefit> $courseTeacherBenefits
 * @property-read int|null $course_teacher_benefits_count
 * @property-read \App\Models\Institute $institute
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Teacher> $teachers
 * @property-read int|null $teachers_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereInstituteId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperCourse {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $description
 * @property int $course_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Course $course
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseLearningObjective newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseLearningObjective newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseLearningObjective query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseLearningObjective whereCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseLearningObjective whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseLearningObjective whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseLearningObjective whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseLearningObjective whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperCourseLearningObjective {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $description
 * @property int $course_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Course $course
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseOverview newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseOverview newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseOverview query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseOverview whereCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseOverview whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseOverview whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseOverview whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseOverview whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperCourseOverview {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $rating
 * @property string|null $description
 * @property int $reviewer_id
 * @property int $course_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Course $course
 * @property-read \App\Models\User $reviewer
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseReview newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseReview newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseReview query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseReview whereCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseReview whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseReview whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseReview whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseReview whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseReview whereReviewerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseReview whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperCourseReview {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $start_time
 * @property string $end_time
 * @property string $meeting_link
 * @property int $is_verified
 * @property int $teacher_id
 * @property int $course_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Course $course
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\EnrolledCourse> $enrolledCourses
 * @property-read int|null $enrolled_courses_count
 * @property-read \App\Models\Teacher $teacher
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSchedule newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSchedule newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSchedule query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSchedule whereCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSchedule whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSchedule whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSchedule whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSchedule whereIsVerified($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSchedule whereMeetingLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSchedule whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSchedule whereTeacherId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSchedule whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperCourseSchedule {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $course_id
 * @property int $skill_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Course $course
 * @property-read \App\Models\Skill $skill
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSkill newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSkill newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSkill query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSkill whereCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSkill whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSkill whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSkill whereSkillId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseSkill whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperCourseSkill {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $description
 * @property int $course_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Course $course
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseStudentBenefit newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseStudentBenefit newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseStudentBenefit query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseStudentBenefit whereCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseStudentBenefit whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseStudentBenefit whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseStudentBenefit whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseStudentBenefit whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperCourseStudentBenefit {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $description
 * @property int $course_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Course $course
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseTeacherBenefit newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseTeacherBenefit newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseTeacherBenefit query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseTeacherBenefit whereCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseTeacherBenefit whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseTeacherBenefit whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseTeacherBenefit whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseTeacherBenefit whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperCourseTeacherBenefit {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Graduate> $graduates
 * @property-read int|null $graduates_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DegreeType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DegreeType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DegreeType query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DegreeType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DegreeType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DegreeType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DegreeType whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperDegreeType {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $is_complete
 * @property int $is_verified
 * @property int $course_schedule_id
 * @property int $student_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CourseSchedule $courseSchedule
 * @property-read \App\Models\User $student
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EnrolledCourse newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EnrolledCourse newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EnrolledCourse query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EnrolledCourse whereCourseScheduleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EnrolledCourse whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EnrolledCourse whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EnrolledCourse whereIsComplete($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EnrolledCourse whereIsVerified($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EnrolledCourse whereStudentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EnrolledCourse whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperEnrolledCourse {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $degree_title
 * @property string $university_name
 * @property int $teacher_id
 * @property \App\Enums\DegreeTypeEnum $degree_type_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\DegreeType $degreeType
 * @property-read \App\Models\Teacher $teacher
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Graduate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Graduate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Graduate query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Graduate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Graduate whereDegreeTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Graduate whereDegreeTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Graduate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Graduate whereTeacherId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Graduate whereUniversityName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Graduate whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperGraduate {}
}

namespace App\Models{
/**
 * @property int $user_id
 * @property string|null $website
 * @property string|null $description
 * @property int $category_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category $category
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Course> $courses
 * @property-read int|null $courses_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\InstituteReview> $reviews
 * @property-read int|null $reviews_count
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Institute newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Institute newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Institute query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Institute whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Institute whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Institute whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Institute whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Institute whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Institute whereWebsite($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperInstitute {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $rating
 * @property string|null $description
 * @property int $reviewer_id
 * @property int $institute_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Institute $institute
 * @property-read \App\Models\User $reviewer
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InstituteReview newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InstituteReview newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InstituteReview query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InstituteReview whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InstituteReview whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InstituteReview whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InstituteReview whereInstituteId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InstituteReview whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InstituteReview whereReviewerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InstituteReview whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperInstituteReview {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $message
 * @property int $notification_type_id
 * @property int $receiver_id
 * @property int $sender_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\NotificationType $notificationType
 * @property-read \App\Models\User $receiver
 * @property-read \App\Models\User $sender
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereNotificationTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereReceiverId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereSenderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperNotification {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Notification> $notifications
 * @property-read int|null $notifications_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|NotificationType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|NotificationType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|NotificationType query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|NotificationType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|NotificationType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|NotificationType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|NotificationType whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperNotificationType {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $method
 * @property string $nominal
 * @property string $status
 * @property int $student_id
 * @property int $course_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $student
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereNominal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereStudentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperPayment {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperRole {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CourseSkill> $courseSKills
 * @property-read int|null $course_s_kills_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Skill newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Skill newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Skill query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Skill whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Skill whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Skill whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Skill whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperSkill {}
}

namespace App\Models{
/**
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialMedia newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialMedia newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialMedia query()
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperSocialMedia {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialMediaType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialMediaType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialMediaType query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialMediaType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialMediaType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialMediaType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SocialMediaType whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperSocialMediaType {}
}

namespace App\Models{
/**
 * @property int $user_id
 * @property string|null $description
 * @property int $is_verified
 * @property int $category_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category $category
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Certificate> $certificates
 * @property-read int|null $certificates_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Graduate> $graduates
 * @property-read int|null $graduates_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\TeacherReview> $reviews
 * @property-read int|null $reviews_count
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\WorkExperience> $workExperiences
 * @property-read int|null $work_experiences_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Teacher newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Teacher newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Teacher query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Teacher whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Teacher whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Teacher whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Teacher whereIsVerified($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Teacher whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Teacher whereUserId($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperTeacher {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $rating
 * @property string|null $description
 * @property int $reviewer_id
 * @property int $teacher_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $reviewer
 * @property-read \App\Models\Teacher $teacher
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeacherReview newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeacherReview newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeacherReview query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeacherReview whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeacherReview whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeacherReview whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeacherReview whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeacherReview whereReviewerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeacherReview whereTeacherId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TeacherReview whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperTeacherReview {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string|null $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string|null $password
 * @property string $phone_number
 * @property string|null $profile_picture
 * @property \App\Enums\RoleEnum|null $role_id
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\EnrolledCourse> $enrolledCourses
 * @property-read int|null $enrolled_courses_count
 * @property-read \App\Models\Institute|null $institute
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Payment> $payments
 * @property-read int|null $payments_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Chat> $receivedMessages
 * @property-read int|null $received_messages_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Notification> $receivedNotifications
 * @property-read int|null $received_notifications_count
 * @property-read \App\Models\Role|null $role
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Chat> $sentMessages
 * @property-read int|null $sent_messages_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Notification> $sentNotifications
 * @property-read int|null $sent_notifications_count
 * @property-read \App\Models\Teacher|null $teacher
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CourseReview> $writtenCourseReviews
 * @property-read int|null $written_course_reviews_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\InstituteReview> $writtenInstituteReviews
 * @property-read int|null $written_institute_reviews_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\TeacherReview> $writtenTeacherReviews
 * @property-read int|null $written_teacher_reviews_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereProfilePicture($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperUser {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $position
 * @property string $institution
 * @property int $duration
 * @property int $teacher_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Teacher $teacher
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WorkExperience newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WorkExperience newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WorkExperience query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WorkExperience whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WorkExperience whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WorkExperience whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WorkExperience whereInstitution($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WorkExperience wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WorkExperience whereTeacherId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WorkExperience whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	#[\AllowDynamicProperties]
	class IdeHelperWorkExperience {}
}

