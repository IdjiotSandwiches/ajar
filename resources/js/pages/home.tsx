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

export default function HomePage({ courses, institutes, reviews }: { courses: any[], institutes: any[], reviews: any[] }) {
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;

    return (
        <>
            <Head title="Home" />
            <div className="flex min-h-screen flex-col">
                <Navbar />
                {/* {(user?.role_id == roles.Institute || user?.role_id == roles.Admin) && (
                    <NavigationList role={user?.role_id} />
                )} */}
                <main className="flex-1">
                    <HeroSection />
                    <PopularCourses courses={courses} />
                    <InstitutionSection institutes={institutes} />
                    <LearningToTeachSection />
                    <TechDesignCourseSection />
                    <BecomeTeacherSection />
                    <ReviewSection reviews={reviews} />
                </main>
                <Footer />
            </div>
        </>
    );
}
