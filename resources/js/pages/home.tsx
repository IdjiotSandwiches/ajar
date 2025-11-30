import Footer from '@/components/footer';
import LearningToTeachSection from '@/components/home/about';
import TechDesignCourseSection from '@/components/home/course-category';
import HeroSection from '@/components/home/hero';
import InstitutionSection from '@/components/home/institution';
import PopularCourses from '@/components/home/popular-courses';
import BecomeTeacherSection from '@/components/home/register-teacher';
import ReviewSection from '@/components/home/review';
import Navbar from '@/components/navbar';
import NavigationList from '@/components/navigation-list';
import { Head, usePage } from '@inertiajs/react';

export default function HomePage() {
    const { courses, institutes } = usePage().props;
    const role = "institute"

    return (
        <>
            <Head title="Home" />
            <div className="flex min-h-screen flex-col bg-[#F7FDFD]">
                <Navbar />
                {(role === "institute" || role === "admin") && (
                    <NavigationList role={role} />
                )}
                <main className="flex-1">
                    <HeroSection />
                    <PopularCourses courses={courses as any[]} />
                    <InstitutionSection institutes={institutes as any[]} />
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
