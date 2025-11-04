import React from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/home/hero";
import PopularCourses from "@/components/home/popular-courses";
import InstitutionSection from "@/components/home/institution";
import LearningToTeachSection from "@/components/home/about";
import TechDesignCourseSection from "@/components/home/course-category";
import ReviewSection from "@/components/home/review";
import BecomeTeacherSection from "@/components/home/register-teacher";
import { Head } from "@inertiajs/react";

export default function HomePage() {
  return (
    <>
        <Head title="Home" />
        <div className="flex flex-col min-h-screen bg-[#F7FDFD]">
        <Navbar />
        <main className="flex-1">
            <HeroSection />
            <PopularCourses />
            <InstitutionSection />
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
