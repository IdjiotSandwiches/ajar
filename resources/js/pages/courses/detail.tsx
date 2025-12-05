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
            <CourseHero course={course} />
            <div className="block lg:hidden px-4 mt-4">
                <CourseSidebar
                    institute={course.institute}
                    teacher={course.teacher}
                />
            </div>
            <div className="flex justify-center mt-6 md:-mt-6 mb-8 relative z-20 px-3">
                <div className="bg-white rounded-full shadow-md border flex gap-4 px-6 py-1 overflow-x-auto scrollbar-hide max-w-full">
                    {[
                        { id: "syllabus", label: "Syllabus", ref: syllabusRef },
                        { id: "info", label: "Course Information", ref: infoRef },
                        { id: "testimonial", label: "Testimonial", ref: testimonialRef }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleScrollTo(tab.ref, tab.id)}
                            className={`px-3 md:px-5 py-1.5 md:py-2 whitespace-nowrap rounded-full text-xs md:text-sm font-medium transition-all
                            ${
                                activeTab === tab.id
                                    ? "bg-[#42C2FF] text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mx-auto px-4 md:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-6 2xl:grid-cols-8 gap-10">
                <div className="lg:col-span-4 2xl:col-span-6 space-y-10">
                    <section>
                        <h4 ref={syllabusRef} className="text-xs text-[#42C2FF] font-medium mb-2">
                            Syllabus
                        </h4>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Learning Objectives
                        </h2>

                        <ul className="text-gray-600 list-disc ml-5 space-y-2">
                            {course.learning_objectives?.map((item: any) => (
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
                    <section>
                        <h4 ref={infoRef} className="text-xs text-[#42C2FF] font-medium mb-2">
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
                <div className="lg:col-span-2 2xl:col-span-2">
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
