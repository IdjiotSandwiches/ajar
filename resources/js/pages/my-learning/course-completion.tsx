import { courseCompletionFilter } from '@/components/lms/filter/dictionary/course-completion';
import Filter from '@/components/lms/filter/filter';
import CourseCompletionCard from '@/components/lms/my-learning/course-completion-card';
import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { router } from '@inertiajs/react';
import { BookCheck } from 'lucide-react';
import React, { useState } from 'react';

export default function CourseCompletionPage({ schedules, categories, filters }: any) {
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<{
        id: number;
        name: string;
    } | null>(null);

    const handleConfirmComplete = (name: any, id: any) => {
        setSelectedCourse({ id, name });
        setShowModal(true);
    };

    const confirm = () => {
        router.post(route('admin.complete-course', { id: selectedCourse?.id }));
        setShowModal(false);
    };

    const onFilterChange = (filters: any) => {
        router.reload({
            only: ['schedules'],
            data: {
                search: filters.search,
                category_id: filters.category,
                time: filters.time,
                date: filters.date,
            },
        });
    };
    
    const hasCourses = schedules?.data && schedules.data.length > 0;

    return (
        <div className="flex min-h-screen flex-col gap-6">
            <Filter schema={courseCompletionFilter(categories, filters)} onChange={onFilterChange} />
            <div className="mx-auto w-full rounded-2xl border p-4 shadow-sm lg:p-8 dark:border-white/20 dark:shadow-white/20">
                <h3 className="mb-6 text-xl font-semibold">Course List</h3>
                <div>
                    {!hasCourses && (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <BookCheck className="mb-4 h-10 w-10 text-gray-400 dark:text-white/40" />
                                <p className="text-base font-semibold text-gray-700 dark:text-white">
                                    No completed courses
                                </p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-white/70">
                                    There are no completed courses yet.
                                </p>
                            </div>
                        )}
                        {hasCourses && schedules.data?.map((course: any, index: number) => (
                        <CourseCompletionCard key={index} {...course} onCompleteClick={() => handleConfirmComplete(course.name, course.id)} />
                    ))}
                </div>
                <Pagination links={schedules.links} />
            </div>

            {showModal && (
                <DynamicModal
                    type="confirmation"
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={confirm}
                    description={`Course status for "${selectedCourse}" will be updated once you submit.`}
                />
            )}
        </div>
    );
}

CourseCompletionPage.layout = (page: React.ReactNode) => <LMSLayout title="Courses Completion">{page}</LMSLayout>;
