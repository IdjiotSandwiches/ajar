import Footer from '@/components/footer';
import LearningToTeachSection from '@/components/home/about';
import TechDesignCourseSection from '@/components/home/course-category';
import HeroSection from '@/components/home/hero';
import InstitutionSection from '@/components/home/institution';
import PopularCourses from '@/components/home/popular-courses';
import BecomeTeacherSection from '@/components/home/register-teacher';
import ReviewSection from '@/components/home/review';
import Navbar from '@/components/navbar';
import { Head } from '@inertiajs/react';

export default function HomePage({ courses, institutes }: { courses: any[]; institutes: any[] }) {
    return (
        <>
            <Head title="Home" />
            <div className="flex min-h-screen flex-col bg-[#F7FDFD]">
                <Navbar />
                <main className="flex-1">
                    <HeroSection />
                    <PopularCourses courses={courses} />
                    <InstitutionSection institutes={institutes} />
                    <LearningToTeachSection />
                    <TechDesignCourseSection />
                    <BecomeTeacherSection />
                    <ReviewSection />
                </main>
                <Footer />
            </div>
        </>
    );
}
