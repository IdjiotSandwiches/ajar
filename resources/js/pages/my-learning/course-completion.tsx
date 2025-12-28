import { courseCompletionFilter } from '@/components/lms/filter/dictionary/course-completion';
import Filter from '@/components/lms/filter/filter';
import CourseCompletionCard from '@/components/lms/my-learning/course-completion-card';
import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import React, { useState } from 'react';

export default function CourseCompletionPage({ schedules }: any) {
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<{
        id: number;
        name: string;
    } | null>(null);

    const handleConfirmComplete = (name: any, id: any) => {
        setSelectedCourse({ id, name });
        setShowModal(true);
    };

    const confirmDelete = () => {
        // console.log('DELETE COURSE:', selectedCourse?.id);
        setShowModal(false);
    };

    return (
        <div className="flex min-h-screen flex-col gap-6">
            <Filter
                schema={courseCompletionFilter}
                onChange={(filters: any) => {
                    console.log(filters);
                }}
            />

            <div className="mx-auto w-full rounded-2xl border p-4 shadow-sm lg:p-8 dark:border-white/20 dark:shadow-white/20">
                <h3 className="mb-6 text-xl font-semibold">Course List</h3>
                <div>
                    {schedules.data?.map((course: any, index: number) => (
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
                    onConfirm={confirmDelete}
                    description={`Course status for "${selectedCourse}" will be updated once you submit.`}
                />
            )}
        </div>
    );
}

CourseCompletionPage.layout = (page: React.ReactNode) => <LMSLayout title="Courses Completion">{page}</LMSLayout>;
