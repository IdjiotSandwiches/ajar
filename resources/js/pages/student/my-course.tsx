import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { storageUrl } from '@/utils/storage';
import { router } from '@inertiajs/react';
import React from 'react';

export default function MyCourse({ myCourses }: any) {
    return (
        <>
            {myCourses.data?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
                    Start learning by enrolling in a course!
                </div>
            ) : (
                <div className="flex flex-col gap-4 overflow-y-auto">
                    {myCourses.data?.map((course: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-col gap-4 rounded-xl border p-3 shadow-sm hover:border-[#3ABEFF]/70 sm:flex-row dark:border-white/20 dark:shadow-[#ffffff]/20 dark:hover:border-[#3ABEFF]/70"
                            >
                                <img
                                    src={storageUrl(course.image)}
                                    className="h-36 w-full rounded-md object-cover sm:h-32 sm:w-32"
                                    alt={course.name}
                                />
                                <div className="flex grow flex-col justify-between">
                                    <div>
                                        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-800 dark:text-white">{course.name}</h3>
                                        <p className="mb-1 line-clamp-1 text-xs text-gray-600 dark:text-white/80">{course.description}</p>
                                        <p className="mb-1 line-clamp-1 text-xs text-gray-600 dark:text-white/80">By: {course.institute}</p>
                                    </div>
                                    <div className="mt-2 flex justify-end gap-2">
                                        <button
                                            className={`rounded-lg bg-[#3ABEFF] px-4 py-2 text-sm text-white transition hover:bg-[#3ABEFF]/90`}
                                            onClick={() => router.get(route('my-course', { id: course.course_id }))}
                                        >
                                            Learn Detail
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <Pagination links={myCourses.links} />
                </div>
            )}
        </>
    );
}

MyCourse.layout = (page: React.ReactNode) => <LMSLayout title="My Courses">{page}</LMSLayout>;
