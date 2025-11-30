import { FaStar } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import RegisterFlow from "../modal/register-course/register-modal";
import { useState } from "react";
import { usePage } from "@inertiajs/react";

export default function CourseHero({ course }: { course: any }) {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const { props } = usePage();
    const user = props.auth?.user;

    const avgRating =
        course.ratings && course.ratings.length > 0
            ? (course.ratings.reduce((a: number, b: number) => a + b, 0) / course.ratings.length).toFixed(1)
            : "0.0";

    return (
        <section className="w-full bg-white py-10 border-b border-gray-200">
            <div className="mx-auto px-4 md:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start mt-8">

                {/* LEFT */}
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-2 text-sm mb-3">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </div>
                        <span className="font-semibold text-gray-800">{avgRating}</span>
                        <span className="text-[#42C2FF]">(23 reviews)</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 leading-snug mb-3">
                        {course.name}
                    </h1>
                    <p className="text-gray-700 mb-4">
                        <span className="font-semibold">Duration:</span> {course.duration} Jam
                    </p>
                    <p className="text-gray-600 leading-relaxed max-w-2xl mb-6">
                        {course.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-6 mb-8 text-gray-700">
                        {course.learning_objectives?.map((item: any) => (
                            <p key={item.id} className="flex items-center gap-2 text-sm">
                                <FaCheck className="text-[#42C2FF]" /> {item.description}
                            </p>
                        ))}
                    </div>
                    <div className="flex items-center gap-6 mt-4">
                        <button
                            className={`px-5 py-3 rounded-lg font-medium transition
                                ${user
                                    ? "bg-[#42C2FF] text-white hover:bg-[#42C2FF]/90"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                            disabled={!user}
                            onClick={() => {
                                if (!user) return; 
                                setIsRegisterOpen(true);
                            }}
                        >
                            {user ? "Register Now" : "Login to Register"}
                        </button>

                        <div className="flex items-center gap-2">
                            <p className="text-xl font-bold text-[#42C2FF]">Rp{course.price.toLocaleString()}</p>
                            {course.discount && (
                                <p className="text-sm line-through text-gray-400">
                                    Rp{(course.price + (course.price * course.discount) / 100).toLocaleString()}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* IMAGE */}
                <div className="flex justify-center lg:col-span-1">
                    <img
                        src="/images/review.jpg"
                        alt={course.name}
                        className="rounded-xl w-full max-w-sm lg:max-w-[480px] max-h-[320px] object-cover ring-1 ring-gray-200 shadow-sm"
                    />
                </div>
            </div>

            <RegisterFlow isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
        </section>

    );
}
