import CourseStatusCard from "@/components/institute/course-taken-card";
import { coursesTakenFilter } from "@/components/lms/filter/dictionary/courses-taken";
import Filter from "@/components/lms/filter/filter";
import LMSLayout from "@/layouts/lms-layout";
import React from "react";

export default function CoursesTakenPage() {

  const takenCourses = [
    {
      image: "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg",
      title: "Pengembangan AI & Ilmu Data Menggunakan Python",
      teacher: "Chelsea",
      student: "Adit",
      duration: "120 Minutes",
      startDate: "2025-02-20",
      startTime: "15:00",
      endDate: "2025-02-20",
      endTime: "17:05",
      recordingLink: "https://drive.google.com/drive/u/0/home",
      status: "Completed",
    },
    {
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
      title: "Pengenalan Machine Learning Dasar",
      teacher: "Chelsea",
      student: "Adit",
      duration: "90 Minutes",
      startDate: "2025-02-21",
      startTime: "13:00",
      endDate: "2025-02-21",
      endTime: "14:30",
      recordingLink: "https://drive.google.com/drive/u/0/home",
      status: "Completed",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col gap-6">
      {/* <h1 className="hidden md:flex text-2xl font-semibold text-gray-800">Courses Taken</h1> */}

      <Filter
        schema={coursesTakenFilter}
        onChange={(filters: any) => {
          console.log(filters);
        }}
      />

      <div className="mx-auto w-full rounded-2xl border dark:border-white/20 p-4 lg:p-8 shadow-sm dark:shadow-white/20">
        <h3 className="font-semibold text-xl mb-6">Course List</h3>
        <div>
          {takenCourses.map((course, index) => (
            <CourseStatusCard key={index} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
}

CoursesTakenPage.layout = (page: React.ReactNode) => <LMSLayout title="Courses Taken">{page}</LMSLayout>;
