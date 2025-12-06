import { Star } from "lucide-react";
import { router, usePage } from '@inertiajs/react';
import TeacherList from "./teacher-list";

export default function CourseCard({ course, isTag }: { course: any, isTag: boolean }) {
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;

    return (
        <div className="bg-white border-2 border-[#3ABEFF]/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200 w-100 max-w-full flex-shrink-0 flex flex-col">
            <div className="relative">
                <img src={course?.image || "https://placehold.co/400"} alt={course.title} className="w-full h-40 object-cover" />
                {isTag && (
                    <div className="absolute top-3 left-3 bg-[#E8FBF2] text-[#00B087] text-xs font-semibold px-2 py-1 rounded cursor-default">
                        Terlaris
                    </div>
                )}
            </div>

            {(user !== null && user?.role_id !== roles.Student) && (
                <TeacherList teachers={course.teachers} />
            )}

            <div className="p-4 flex flex-col justify-between flex-grow cursor-default">
                <div>
                    <h3 className="text-gray-800 font-semibold text-base leading-tight mb-1">
                        {course.name}
                    </h3>

                    <p className="text-gray-500 text-xs mb-2">
                        by <span className="font-medium">{course.institute?.user?.name}</span>
                    </p>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-3 min-h-10">
                        {course.description}
                    </p>

                    <div className="flex items-center text-xs mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400 mr-1" />

                        <span className="text-gray-700 font-medium">
                            {course.course_reviews_avg_rating ?? 0}
                        </span>

                        <span className="text-gray-400 mx-1">•</span>

                        <span className="text-gray-400">
                            {course.reviews_count ?? 0} reviews
                        </span>
                    </div>

                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <p className="text-gray-800 font-semibold text-sm">
                            Rp {Number(course.price).toLocaleString("id-ID", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}

                        </p>
                        <p className="text-gray-500 text-xs">{course.duration} Minutes</p>
                    </div>
                    <button
                        onClick={() => router.get(route('detail-course', course.id))}
                        className="bg-[#3ABEFF] text-white text-sm px-4 py-1.5 rounded-full font-medium hover:bg-[#3ABEFF]/90 transition cursor-pointer">
                        See info →
                    </button>
                </div>
            </div>
        </div>
    );
}
