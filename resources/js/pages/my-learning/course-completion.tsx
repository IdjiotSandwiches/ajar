import DynamicModal from "@/components/modal/modal";
import CourseCompletionCard from "@/components/my-learning/course-completion-card";
import AppLayout from "@/layouts/app-layout";
import LMSLayout from "@/layouts/lms-layout";
import React, { useState } from "react";

export default function CourseCompletionPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const courseList = [
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
    },
  ];

  const handleConfirmComplete = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col gap-6">
      <h1 className="hidden md:flex text-2xl font-semibold text-gray-800">Courses Completion</h1>
      <div className="mx-auto w-full rounded-2xl bg-white p-4 sm:p-6 md:p-8 shadow-sm">
        <h3 className="font-semibold text-xl mb-6">Course List</h3>
        <div>
          {courseList.map((course, index) => (
            <CourseCompletionCard
              key={index}
              {...course}
              onCompleteClick={() => handleConfirmComplete(course.title)}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <DynamicModal
          type="warning"
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          description={`Course status for "${selectedCourse}" will be updated once you submit.`}
        />
      )}
    </div>
  );
}

CourseCompletionPage.layout = (page: React.ReactNode) => <LMSLayout title="Courses Completion">{page}</LMSLayout>;
