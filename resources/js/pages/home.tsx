import LearningToTeachSection from '@/components/home/about';
import TechDesignCourseSection from '@/components/home/course-category';
import HeroSection from '@/components/home/hero';
import InstitutionSection from '@/components/home/institution';
import PopularCourses from '@/components/home/popular-courses';
import BecomeTeacherSection from '@/components/home/register-teacher';
import ReviewSection from '@/components/home/review';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';

export default function HomePage({ courses, institutes, reviews }: any) {
    const { props } = usePage();
    const user = props.auth?.user;

    return (
        <>
            <Head title="Home" />
            <div className="flex min-h-screen flex-col">
                <main className="flex-1 pt-[72px]">
                    <HeroSection />
                    <PopularCourses courses={courses} />
                    <InstitutionSection institutes={institutes} />
                    <LearningToTeachSection />
                    <TechDesignCourseSection />
                    {!user && <BecomeTeacherSection />}
                    <ReviewSection reviews={reviews} />
                </main>
            </div>
        </>
    );
}

HomePage.layout = (page: React.ReactNode) => (
    <AppLayout useContainer={false} showBackButton={false}>
        {page}
    </AppLayout>
);
