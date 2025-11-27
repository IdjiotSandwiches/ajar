import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { CourseData } from "@/interfaces/shared";
import { dummyCourses } from "@/dummy-data/dummy-course";
import DynamicModal from "@/components/modal/modal";

export default function CourseList() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // ===== Load Dummy Data =====
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 400)); // simulasi loading
        setCourses(dummyCourses);
      } catch (error) {
        console.error("Gagal memuat data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDeleteClick = (course: CourseData) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedCourse) return;
    setCourses((prev) => prev.filter((c) => c.id !== selectedCourse.id));
    setShowModal(false);
    setSelectedCourse(null);
  };

  const handleEditClick = (courseId: number) => {
    router.get(`/institute/edit-course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-[#f9fdfd] flex flex-col">
      <div className="max-w-6xl mx-auto w-full px-6 py-10 bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl mt-10">
        <h1 className="text-3xl font-semibold text-center text-[#42C2FF] mb-10 cursor-default">
          My Courses
        </h1>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => router.get("create-course")}
            className="flex items-center gap-2 bg-[#42C2FF] hover:bg-[#42C2FF]/90 text-white text-sm px-4 py-2 rounded-md shadow transition font-medium cursor-pointer"
          >
            <Plus size={16} strokeWidth={3} /> Tambah Kursus
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading...</div>
        ) : courses.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            Belum ada kursus.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
              <thead className="bg-[#42C2FF]/10 border-b border-gray-200">
                <tr className="cursor-default">
                  <th className="py-3 px-4 text-left font-medium">Course</th>
                  <th className="py-3 px-4 text-left font-medium">Duration</th>
                  <th className="py-3 px-4 text-left font-medium">Price</th>
                  <th className="py-3 px-4 text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr
                    key={course.id}
                    className={`border-b hover:bg-[#42C2FF]/10 transition ${index % 2 === 0 ? "bg-[#f9fcff]" : "bg-white"
                      }`}
                  >
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={
                          course.course_images?.[0] ??
                          "https://via.placeholder.com/100"
                        }
                        alt={course.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <p className="font-bold cursor-default">{course.name}</p>
                    </td>

                    <td className="py-3 px-4 cursor-default">
                      <div className="flex items-center gap-1">
                        <p className="font-bold">{course.duration}</p>
                        <p className="text-gray-600 text-sm">mins</p>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-bold cursor-default">
                      {course.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      })}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditClick(course.id!)}
                          className="p-2 bg-[#42C2FF] hover:bg-[#42C2FF]/90 rounded-md text-white cursor-pointer"
                        >
                          <Pencil size={16} strokeWidth={2} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(course)}
                          className="p-2 bg-[#FF1818] hover:bg-[#FF1818]/90 rounded-md text-white cursor-pointer"
                        >
                          <Trash2 size={16} strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <DynamicModal
        type="confirmation"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        description="Once you confirm delete course, the course will be gone."
      />
    </div>
  );
}

CourseList.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
