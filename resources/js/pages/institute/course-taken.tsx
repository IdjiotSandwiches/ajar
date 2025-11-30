import CourseStatusCard from "@/components/institute/course-taken-card";
import AppLayout from "@/layouts/app-layout";
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
    <div className="min-h-screen bg-[#F9FCFF] flex flex-col">
      <div className="max-w-4xl mx-auto py-16 px-6 w-full">
        <h1 className="text-2xl font-semibold text-center text-[#42C2FF] mb-8">
          Courses Taken
        </h1>

        <div>
          {takenCourses.map((course, index) => (
            <CourseStatusCard key={index} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
}

CoursesTakenPage.layout = (page: React.ReactNode) => (
  <AppLayout useContainer>{page}</AppLayout>
);
