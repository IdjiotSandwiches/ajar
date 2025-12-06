import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import RegisterFlow from '../modal/register-course/register-modal';

export default function CourseHero({ course }: { course: any }) {
    const { props } = usePage();
    const user = props.auth?.user;
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    return (
        <section className="w-full border-b border-gray-200 bg-white py-10">
            <div className="mx-auto mt-8 grid grid-cols-1 items-start gap-10 px-4 md:px-20 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <div className="mb-3 flex items-center gap-2 text-sm">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </div>
                        <span className="font-semibold text-gray-800">{course.course_reviews_avg_rating ?? 0}</span>
                        <span className="text-[#3ABEFF]">({course.course_reviews_count} reviews)</span>
                    </div>

                    <h1 className="mb-3 text-3xl leading-snug font-bold text-gray-800">{course.name}</h1>

                    <p className="mb-4 text-gray-700">
                        <span className="font-semibold">Duration:</span> {course.duration} Minutes
                    </p>

                    <p className="mb-6 max-w-2xl leading-relaxed text-gray-600">{course.description}</p>

                    <div className="mb-8 grid gap-x-6 gap-y-3 text-gray-700 md:grid-cols-3">
                        {course.course_learning_objectives?.map((item: any) => (
                            <p key={item.id} className="flex items-center gap-2 text-sm">
                                <FaCheck className="text-[#3ABEFF]" /> {item.description}
                            </p>
                        ))}
                    </div>

                    <div className="mt-4 flex items-center gap-6">
                        <button
                            className="rounded-lg bg-[#3ABEFF] px-7 py-3 font-medium text-white transition hover:bg-[#2fa5d8]"
                            onClick={() => {
                                if (user) setIsRegisterOpen(true);
                                else router.get('/login');
                            }}
                        >
                            Register Now
                        </button>

                        <div className="flex items-center gap-2">
                            <p className="text-xl font-bold text-[#3ABEFF]">
                                Rp{' '}
                                {Number(Number(course.price) - (Number(course.price) * Number(course.discount)) / 100).toLocaleString('id-ID', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </p>
                            {Number(course.discount) > 0 && (
                                <p className="text-sm text-gray-400 line-through">
                                    Rp{' '}
                                    {Number(course.price).toLocaleString('id-ID', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center lg:col-span-1">
                    <img
                        src={course?.image || 'https://placehold.co/400'}
                        alt={course.name}
                        className="max-h-[320px] w-full max-w-[480px] rounded-xl object-cover shadow-sm ring-1 ring-gray-200"
                    />
                </div>
            </div>
            <RegisterFlow isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
        </section>
    );
}
