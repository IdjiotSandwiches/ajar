import CalendarSection from '@/components/lms/my-learning/calender-section';
import CourseSection from '@/components/lms/my-learning/course-section';
import LMSLayout from '@/layouts/lms-layout';
import React from 'react';

export default function MyLearningPage({ courses, counts, dateCourses, review, filters }: any) {
    return (
        <div className="w-full space-y-4">
            <div className="2xl:hidden">
                <CalendarSection courses={dateCourses} date={filters.date} />
            </div>

            <div className="grid grid-cols-1 gap-6 2xl:grid-cols-3">
                <div className="space-y-4 2xl:col-span-2">
                    <CourseSection courses={courses} counts={counts} review={review} state={filters.state} />
                </div>

                <div className="hidden 2xl:col-span-1 2xl:inline">
                    <CalendarSection courses={dateCourses} date={filters.date} />
                </div>
            </div>
        </div>
    );
}

MyLearningPage.layout = (page: React.ReactNode) => <LMSLayout title="My Learning">{page}</LMSLayout>;
