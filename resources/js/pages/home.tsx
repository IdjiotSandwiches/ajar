import Footer from '@/components/footer';
import LearningToTeachSection from '@/components/home/about';
import TechDesignCourseSection from '@/components/home/course-category';
import HeroSection from '@/components/home/hero';
import InstitutionSection from '@/components/home/institution';
import PopularCourses from '@/components/home/popular-courses';
import BecomeTeacherSection from '@/components/home/register-teacher';
import ReviewSection from '@/components/home/review';
import Navbar from '@/components/navbar';
import { Head, usePage } from '@inertiajs/react';

export default function HomePage({ courses, institutes, reviews }: { courses: any[], institutes: any[], reviews: any[] }) {
    const { props } = usePage();
    const user = props.auth?.user;

    return (
        <>
            <Head title="Home" />
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1 pt-[72px]">
                    <HeroSection />
                    <PopularCourses courses={courses} />
                    <InstitutionSection institutes={institutes} />
                    <LearningToTeachSection />
                    <TechDesignCourseSection />
                    { !user && <BecomeTeacherSection /> }
                    <ReviewSection reviews={reviews} />
                </main>
                <Footer />
            </div>
        </>
    );
}
