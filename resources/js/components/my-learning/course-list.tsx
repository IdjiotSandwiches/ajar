import React from "react";
import CourseCard from "@/components/my-learning/course-card";

interface CourseListProps {
  courses: any[];
  tab: "progress" | "completed";
  role: "student" | "teacher";
  isCourseFinished: (course: any) => boolean;
  onActionClick: (course: any) => void;
  onAddReview: (course: any) => void;
}

export default function CourseList({
  courses,
  tab,
  role,
  isCourseFinished,
  onActionClick,
  onAddReview,
}: CourseListProps) {
  return (
    <div className="col-span-7 space-y-5">
      {courses
        .filter((c) => c.status === tab)
        .map((course) => (
          <CourseCard
            key={course.id}
            {...course}
            role={role}
            status={course.status}
            isCourseFinished={isCourseFinished(course)}
            onActionClick={() => onActionClick(course)}
            onAddReview={() => onAddReview(course)}
          />
        ))}
    </div>
  );
}
