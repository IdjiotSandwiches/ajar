import DynamicModal from "@/components/modal/modal";
import CourseCompletionCard from "@/components/my-learning/course-completion-card";
import AppLayout from "@/layouts/app-layout";
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
    <div className="min-h-screen bg-[#F9FCFF] flex flex-col">
      <div className="max-w-4xl mx-auto py-16 px-6 w-full">
        <h1 className="text-2xl font-semibold text-center text-[#3ABEFF] mb-8">
          Course Completion
        </h1>

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

CourseCompletionPage.layout = (page: React.ReactNode) => (
  <AppLayout useContainer>{page}</AppLayout>
);
