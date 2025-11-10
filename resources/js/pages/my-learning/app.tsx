import React, { useState, useEffect } from "react";
import AppLayout from "@/layouts/app-layout";
import DynamicModal from "@/components/modal/modal";
import AddLinkModal from "@/components/modal/my-learning/add-link-modal";
import { AddReviewModal } from "@/components/modal/my-learning/add-review-modal";
import Sidebar from "@/components/my-learning/sidebar";
import CourseList from "@/components/my-learning/course-list";
import CalendarSection from "@/components/my-learning/calender-section";

export default function MyLearningPage() {
  const [role] = useState<"student" | "teacher">("student");
  const [tab, setTab] = useState<"progress" | "completed">("progress");
  const [modalType, setModalType] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewCourse, setReviewCourse] = useState<any>(null);

  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [selectedDate, setSelectedDate] = useState("");
  const todayString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

  useEffect(() => {
    setSelectedDate(todayString);
  }, []);

  const [courses, setCourses] = useState([
  {
    id: 1,
    title: "Pengembangan AI & Ilmu Data menggunakan Python",
    mentor: "Dodi Surdadi",
    institute: "Ajar Academy",
    duration: "2 Hours",
    date: "2025-11-15",
    time: "09:00–11:00",
    image: "/images/image-1.jpg",
    meetingLink: "https://zoom.us/j/uiux123",
    recordingLink: "",
    isApproved: false,
    status: "progress",
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    mentor: "Ayu Wulandari",
    institute: "Ajar Design Lab",
    duration: "3 Hours",
    date: "2025-11-1",
    time: "13:00–16:00",
    image: "/images/image-1.jpg",
    meetingLink: "https://zoom.us/j/uiux123",
    recordingLink: "https://drive.google.com/rec123",
    isApproved: true, 
    status: "completed",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    mentor: "Ayu Wulandari",
    institute: "Ajar Design Lab",
    duration: "3 Hours",
    date: "2025-11-1",
    time: "13:00–16:00",
    image: "/images/image-1.jpg",
    meetingLink: "",
    recordingLink: "",
    isApproved: false, 
    status: "progress",
  },

]);


  const isCourseFinished = (course: any) => new Date(course.date) < now;

  const handleActionClick = (course: any) => {
    setSelectedCourse(course);

    if (role === "student") {
      if (!course.meetingLink) setModalType("warning");
      else window.open(course.meetingLink, "_blank");
    } else if (role === "teacher") {
      if (isCourseFinished(course)) {
        setModalType("addRecording");
      } else {
        setModalType("addMeeting");
      }
    }
  };

  const handleSubmitLink = (type: "meeting" | "recording", value: string) => {
    if (!selectedCourse) return;
    setCourses((prev) =>
      prev.map((c) =>
        c.id === selectedCourse.id ? { ...c, [`${type}Link`]: value } : c
      )
    );
    setModalType("success");
  };

  const handleAddReview = (course: any) => {
    setReviewCourse(course);
    setShowReviewModal(true);
  };

  const handleSubmitReview = (reviewData: any) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === reviewCourse.id ? { ...c, review: reviewData } : c
      )
    );
    setShowReviewModal(false);
    setModalType("success");
  };

  return (
    <div className="w-full min-h-screen bg-[#F7FCFF] px-20 pt-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Learning</h1>

      <div className="grid grid-cols-12 gap-10">
        <Sidebar tab={tab} setTab={setTab} />

        <CourseList
          courses={courses}
          tab={tab}
          role={role}
          isCourseFinished={isCourseFinished}
          onActionClick={handleActionClick}
          onAddReview={handleAddReview}
        />

        <CalendarSection
          month={month}
          year={year}
          setMonth={setMonth}
          setYear={setYear}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          todayString={todayString}
          courses={courses}
        />
      </div>

      {/* === MODALS === */}
      {modalType === "warning" && (
        <DynamicModal
          type="warning"
          isOpen={true}
          onClose={() => setModalType(null)}
          description="Your course has not started yet. You can join 10 minutes before schedule."
        />
      )}

      {modalType === "addMeeting" && (
        <AddLinkModal
          title="Meeting Link"
          placeholder="Link Meeting"
          onSubmit={(val) => handleSubmitLink("meeting", val)}
          onClose={() => setModalType(null)}
        />
      )}

      {modalType === "addRecording" && (
        <AddLinkModal
          title="Recording Link"
          placeholder="Link Recording"
          onSubmit={(val) => handleSubmitLink("recording", val)}
          onClose={() => setModalType(null)}
        />
      )}

      {modalType === "success" && (
        <DynamicModal
          type="success"
          isOpen={true}
          onClose={() => setModalType(null)}
          description="Your link has been added successfully!"
        />
      )}

      {showReviewModal && reviewCourse && (
        <AddReviewModal
          onSubmit={handleSubmitReview}
          onClose={() => setShowReviewModal(false)}
          teacher={{
            image: reviewCourse.image,
            name: reviewCourse.mentor,
            role: "Teacher",
          }}
          institute={{
            image: reviewCourse.image,
            name: reviewCourse.institute,
            role: "Institute",
          }}
          course={{
            image: reviewCourse.image,
            name: reviewCourse.title,
          }}
        />
      )}
    </div>
  );
}

MyLearningPage.layout = (page: React.ReactNode) => (
  <AppLayout useContainer>{page}</AppLayout>
);
