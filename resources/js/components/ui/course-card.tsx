import { router, usePage } from '@inertiajs/react';
import { Star } from 'lucide-react';
import TeacherList from './teacher-list';
import { storageUrl } from '@/utils/storage';

export default function CourseCard({ course, isTag, showTeacher = true, showReview = true }: any) {
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;

    return (
        <div className="flex w-full max-w-100 flex-shrink-0 flex-col overflow-hidden rounded-xl border-2 shadow-sm dark:shadow-[#ffffff]/20 bg-white dark:bg-[#222831] transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="relative">
                <img src={storageUrl(course?.image)} alt={course.name} className="h-40 w-full object-cover" />
                {isTag && (
                    <div className="absolute top-3 left-3 cursor-default rounded bg-[#E8FBF2] px-2 py-1 text-xs font-semibold text-[#00B087]">
                        Terlaris
                    </div>
                )}
            </div>

            {user !== null && user?.role_id !== roles.Student && user?.role_id !== roles.Admin && showTeacher && (
                <TeacherList teachers={course.teacher_schedules} />
            )}

            <div className="flex flex-grow cursor-default flex-col justify-between p-4">
                <div>
                    <h3 className="mb-1 text-base leading-tight font-semibold text-gray-800 dark:text-white">{course.name}</h3>

                    <p className="mb-2 text-xs text-gray-500 dark:text-white/50">
                        by <span className="font-medium">{course.institute}</span>
                    </p>

                    <p className="mb-3 line-clamp-2 min-h-10 text-sm text-gray-600 dark:text-white/80">{course.description}</p>
                    {showReview && (
                        <div className="mb-2 flex items-center text-xs">
                            <Star className="mr-1 h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                            <span className="font-medium text-gray-700 dark:text-white/80">{course.course_reviews_avg_rating ?? 0}</span>
                            <span className="mx-1 text-gray-400 dark:text-white/60">•</span>
                            <span className="text-gray-400 dark:text-white/60">{course.reviews_count ?? 0} reviews</span>
                        </div>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div>
                        {(user && user.role_id === roles.Teacher) ? (
                            <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                Rp
                                {Number(course.teacher_salary).toLocaleString('id-ID', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </p>
                        ) : (
                            <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                Rp
                                {Number(Number(course.price) - (Number(course.price) * Number(course.discount)) / 100).toLocaleString('id-ID', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </p>
                        )}
                        <p className="text-xs text-gray-500 dark:text-white/60">{course.duration} Minutes</p>
                    </div>
                    <button
                        onClick={() => router.get(route('detail-course', course.id))}
                        className="cursor-pointer rounded-full bg-[#3ABEFF] px-4 py-1.5 text-sm font-medium text-white transition hover:bg-[#3ABEFF]/90"
                    >
                        See info →
                    </button>
                </div>
            </div>
        </div>
    );
}
