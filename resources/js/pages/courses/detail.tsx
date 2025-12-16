import CourseHero from '@/components/course/hero-section';
import ReviewSection from '@/components/course/review';
import CourseSidebar from '@/components/course/sidebar';
import PopularCourses from '@/components/home/popular-courses';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function CourseDetailPage({ course, popularCourses }: any) {
    const [activeTab, setActiveTab] = useState('syllabus');

    const syllabusRef = useRef<HTMLHeadingElement | null>(null);
    const infoRef = useRef<HTMLHeadingElement | null>(null);
    const testimonialRef = useRef<HTMLHeadingElement | null>(null);

    const handleScrollTo = (ref: React.RefObject<HTMLHeadingElement | null>, tab: string) => {
        setActiveTab(tab);
        if (ref.current) {
            const yOffset = -100;
            const y = ref.current.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const sections = [
            { id: 'syllabus', ref: syllabusRef },
            { id: 'info', ref: infoRef },
            { id: 'testimonial', ref: testimonialRef },
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
            { threshold: 0.4 },
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
        return <div className="flex min-h-screen items-center justify-center text-lg text-gray-500">Course Not Found</div>;
    }

    return (
        <>
            <Head title={course?.name || "Not Found"} />
            <div className="min-h-screen bg-[#F8FCFF]">
                <CourseHero course={course} />
                <div className="mt-4 block px-4 lg:hidden">
                    <CourseSidebar institute={course.institute.user} teacher={course.teacher_schedules} />
                </div>
                <div className="relative z-20 mt-6 mb-8 flex justify-center px-3 md:-mt-6">
                    <div className="scrollbar-hide flex max-w-full gap-4 overflow-x-auto rounded-full border bg-white px-6 py-1 shadow-md">
                        {[
                            { id: 'syllabus', label: 'Syllabus', ref: syllabusRef },
                            { id: 'info', label: 'Course Information', ref: infoRef },
                            { id: 'testimonial', label: 'Testimonial', ref: testimonialRef },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleScrollTo(tab.ref, tab.id)}
                                className={`rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all md:px-5 md:py-2 md:text-sm ${
                                    activeTab === tab.id ? 'bg-[#42C2FF] text-white' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mx-auto grid grid-cols-1 gap-10 px-4 md:px-10 lg:grid-cols-6 lg:px-20 2xl:grid-cols-8">
                    <div className="space-y-10 lg:col-span-4 2xl:col-span-6">
                        <section>
                            <h4 ref={syllabusRef} className="mb-2 text-xs font-medium text-[#42C2FF]">
                                Syllabus
                            </h4>
                            <h2 className="mb-4 text-lg font-semibold text-gray-800">Learning Objectives</h2>

                            <ul className="ml-5 list-disc space-y-2 text-gray-600">
                                {course.course_learning_objectives?.map((item: any) => <li key={item.id}>{item.description}</li>)}
                            </ul>

                            <h2 className="mt-8 mb-4 text-lg font-semibold text-gray-800">Course Overview</h2>
                            <ul className="ml-5 list-disc space-y-2 text-gray-600">
                                {course.course_overviews?.map((item: any) => <li key={item.id}>{item.description}</li>)}
                            </ul>
                        </section>
                        <section>
                            <h4 ref={infoRef} className="mb-2 text-xs font-medium text-[#42C2FF]">
                                Course Information
                            </h4>
                            <h2 className="mb-4 text-lg font-semibold text-gray-800">Skills to be Learned</h2>
                            <ul className="ml-5 list-disc space-y-2 text-gray-600">
                                {course.course_skills?.map((item: any) => <li key={item.id}>{item.skill.name}</li>)}
                            </ul>
                        </section>
                        <section>
                            <h4 ref={testimonialRef} className="mb-2 text-xs font-medium text-[#3ABEFF]">
                                Testimonial
                            </h4>
                            <ReviewSection reviews={course.course_reviews} />
                        </section>
                    </div>
                    <div className="hidden md:flex lg:col-span-2 2xl:col-span-2">
                        <CourseSidebar institute={course.institute.user} teacher={course.teacher_schedules} />
                    </div>
                </div>
                <div className="mx-auto md:px-10">
                    <PopularCourses courses={popularCourses} />
                </div>
            </div>
        </>
    );
}

CourseDetailPage.layout = (page: React.ReactNode) => <AppLayout useContainer={false}>{page}</AppLayout>;
