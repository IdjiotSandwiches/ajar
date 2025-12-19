import { coursesTaughtFilter } from '@/components/lms/filter/dictionary/course-taught';
import Filter from '@/components/lms/filter/filter';
import TeacherCourseCardWrapper from '@/components/lms/teacher/TeacherCourseCardWrapper';
import LMSLayout from '@/layouts/lms-layout';
import React from 'react';

const dummyCourses = [
    {
        id: 1,
        name: 'React Fundamentals',
        image: 'https://placehold.co/600x400',
        description: 'Learn the fundamentals of React including hooks and component architecture.',
        duration: 720,
        price: 250000,
        discount: 0,
        institute: {
            user: {
                name: 'Code Institute',
            },
        },
        course_reviews_avg_rating: 4.6,
        reviews_count: 128,
        schedules: [
            {
                id: 1,
                day: 'Monday',
                start_time: '19:00',
                end_time: '21:00',
            },
            {
                id: 2,
                day: 'Wednesday',
                start_time: '19:00',
                end_time: '21:00',
            },
            {
                id: 3,
                day: 'Monday',
                start_time: '19:00',
                end_time: '21:00',
            },
            {
                id: 4,
                day: 'Wednesday',
                start_time: '19:00',
                end_time: '21:00',
            },
        ],
    },
    {
        id: 2,
        name: 'Advanced Laravel',
        image: 'https://placehold.co/600x400',
        description: 'Deep dive into Laravel advanced concepts and real-world patterns.',
        duration: 840,
        price: 300000,
        discount: 10,
        institute: {
            user: {
                name: 'Backend Academy',
            },
        },
        course_reviews_avg_rating: 4.8,
        reviews_count: 89,
        schedules: [],
    },
];

export default function TeacherCourses() {
    const courses = dummyCourses;

    return (
        <div className="grid grid-cols-1 gap-6">
            <Filter
                schema={coursesTaughtFilter}
                onChange={(filters: any) => {
                    console.log(filters);
                }}
            />

            {courses?.length === 0 ? (
                <p className="py-10 text-center text-gray-500">Belum ada kursus yang diajar.</p>
            ) : (
                courses?.map((course) => <TeacherCourseCardWrapper key={course.id} course={course} />)
            )}
        </div>
    );
}

TeacherCourses.layout = (page: React.ReactNode) => <LMSLayout title="Courses Taught">{page}</LMSLayout>;
