import DynamicModal from "@/components/modal/modal";
import CourseCompletionCard from "@/components/lms/my-learning/course-completion-card";
import LMSLayout from "@/layouts/lms-layout";
import React, { useState } from "react";
import Filter from "@/components/lms/filter/filter";
import { courseCompletionFilter } from "@/components/lms/filter/dictionary/course-completion";

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

  const confirmDelete = () => {
    // console.log('DELETE COURSE:', selectedCourse?.id);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col gap-6">
      <Filter
        schema={courseCompletionFilter}
        onChange={(filters: any) => {
          console.log(filters);
        }}
      />

      <div className="mx-auto w-full rounded-2xl border dark:border-white/20 p-4 sm:p-6 md:p-8 shadow-sm dark:shadow-white/20">
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
          type="confirmation"
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={confirmDelete}
          description={`Course status for "${selectedCourse}" will be updated once you submit.`}
        />
      )}
    </div>
  );
}

CourseCompletionPage.layout = (page: React.ReactNode) => <LMSLayout title="Courses Completion">{page}</LMSLayout>;
