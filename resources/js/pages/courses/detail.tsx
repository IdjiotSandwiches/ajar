import AppLayout from "@/layouts/app-layout";
import CourseHero from "@/components/course/hero-section";
import { useEffect, useRef, useState } from "react";
import CourseSidebar from "@/components/course/sidebar";
import ReviewSection from "@/components/course/review";
import PopularCourses from "@/components/home/popular-courses";

export default function CourseDetailPage({ course, popularCourses }: { course: any, popularCourses: any[] }) {
    console.log(course);
    const [activeTab, setActiveTab] = useState("syllabus");

    const syllabusRef = useRef<HTMLHeadingElement | null>(null);
    const infoRef = useRef<HTMLHeadingElement | null>(null);
    const testimonialRef = useRef<HTMLHeadingElement | null>(null);

    const handleScrollTo = (
        ref: React.RefObject<HTMLHeadingElement | null>,
        tab: string
    ) => {
        setActiveTab(tab);
        if (ref.current) {
            const yOffset = -100;
            const y =
                ref.current.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    useEffect(() => {
        const sections = [
            { id: "syllabus", ref: syllabusRef },
            { id: "info", ref: infoRef },
            { id: "testimonial", ref: testimonialRef },
        ];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const visible = sections.find((s) => s.ref.current === entry.target);
                        if (visible) setActiveTab(visible.id);
                    }
                });
            },
            { threshold: 0.4 }
        );

        sections.forEach((s) => {
            if (s.ref.current) observer.observe(s.ref.current);
        });

        return () => {
            sections.forEach((s) => {
                if (s.ref.current) observer.unobserve(s.ref.current);
            });
        };
    }, []);

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
                Course Not Found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FCFF]">
            {/* === HERO === */}
            <CourseHero course={course} />

            {/* === FLOATING TABS === */}
            <div className="flex justify-center -mt-8 mb-10 relative z-20">
                <div className="bg-white rounded-full shadow-md border flex gap-2 px-2 py-1">
                    <button
                        onClick={() => handleScrollTo(syllabusRef, "syllabus")}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "syllabus"
                                ? "bg-[#3ABEFF] text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        Syllabus
                    </button>
                    <button
                        onClick={() => handleScrollTo(infoRef, "info")}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "info"
                                ? "bg-[#3ABEFF] text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        Course Information
                    </button>
                    <button
                        onClick={() => handleScrollTo(testimonialRef, "testimonial")}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "testimonial"
                                ? "bg-[#3ABEFF] text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        Testimonial
                    </button>
                </div>
            </div>

            {/* === MAIN CONTENT === */}
            <div className="mx-auto px-20 grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* LEFT CONTENT */}
                <div className="lg:col-span-3 space-y-10">
                    {/* --- SYLLABUS --- */}
                    <section>
                        <h4
                            ref={syllabusRef}
                            className="text-xs text-[#3ABEFF] font-medium mb-2"
                        >
                            Syllabus
                        </h4>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Learning Objectives
                        </h2>
                        <ul className="text-gray-600 list-disc ml-5 space-y-2">
                            {course.course_learning_objectives?.map((item: any) => (
                                <li key={item.id}>{item.description}</li>
                            ))}
                        </ul>

                        <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-4">
                            Course Overview
                        </h2>
                        <ul className="text-gray-600 list-disc ml-5 space-y-2">
                            {course.course_overviews?.map((item: any) => (
                                <li key={item.id}>{item.description}</li>
                            ))}
                        </ul>
                    </section>

                    {/* --- COURSE INFO --- */}
                    <section>
                        <h4
                            ref={infoRef}
                            className="text-xs text-[#3ABEFF] font-medium mb-2"
                        >
                            Course Information
                        </h4>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Skills to be Learned
                        </h2>
                        <ul className="text-gray-600 list-disc ml-5 space-y-2">
                            {course.course_skills?.map((item: any) => (
                                <li key={item.id}>{item.skill.name}</li>
                            ))}
                        </ul>
                    </section>

                    {/* --- TESTIMONIAL --- */}
                    <section>
                        <h4
                            ref={testimonialRef}
                            className="text-xs text-[#3ABEFF] font-medium mb-2"
                        >
                            Testimonial
                        </h4>
                        <ReviewSection reviews={course.course_reviews} />
                    </section>
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="lg:col-span-1">
                    <CourseSidebar
                        institute={course.institute.user}
                        teacher={course.teachers}
                    />
                </div>
            </div>

            <div className="mx-auto px-10">
                <PopularCourses courses={popularCourses} />
            </div>
        </div>
    );
}

CourseDetailPage.layout = (page: React.ReactNode) => (
    <AppLayout useContainer={false}>{page}</AppLayout>
);
