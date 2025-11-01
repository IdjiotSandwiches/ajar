import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { router } from "@inertiajs/react";
import DeleteConfirmationModal from "@/components/modal/delete-confirmation";
// import BackButton from "@/components/ui/back-button";
import AppLayout from "@/layouts/app-layout";

export default function CourseList() {
  const [courses, setCourses] = useState<any[]>([]); // ✅ state untuk semua kursus
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null); // ✅ kursus yang ingin dihapus
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // ===== Fetch dummy data =====
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const dummyData = [
          {
            id: "1",
            title: "Pengembangan AI & Ilmu Data menggunakan Python",
            duration: 120,
            price: 10000000,
            image:
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
          },
          {
            id: "2",
            title: "Dasar Pemrograman Web dengan React.js",
            duration: 90,
            price: 8000000,
            image:
              "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
          },
          {
            id: "3",
            title: "Pemrosesan Bahasa Alami (NLP) untuk Pemula",
            duration: 100,
            price: 9000000,
            image:
              "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
          },
        ];

        await new Promise((resolve) => setTimeout(resolve, 500));
        setCourses(dummyData); // ✅ perbaikan: disimpan ke courses, bukan selectedCourse
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // ===== Hapus course =====
  const handleDeleteClick = (course: any) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedCourse) return;
    console.log("Deleted course:", selectedCourse.title);

    // Hapus dari state
    setCourses((prev) => prev.filter((c) => c.id !== selectedCourse.id));
    setShowModal(false);
    setSelectedCourse(null);
  };

  return (
    <div className="container min-h-screen bg-[#f9fdfd] flex flex-col">
      {/* <BackButton className="m-4" label="Back" /> */}
      <div className="max-w-6xl mx-auto w-full px-6 py-10 bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl mt-10">
        <h1 className="text-3xl font-semibold text-center text-[#3ABEFF] mb-10">
          List Courses
        </h1>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => router.visit(route("create-course"))}
            className="flex items-center gap-2 bg-[#3ABEFF] hover:bg-[#3ABEFF]/90 text-white text-sm px-4 py-2 rounded-md shadow transition font-medium"
          >
            <Plus size={16} strokeWidth={3}/> Buat Kursus
          </button>
        </div>

        {/* ===== Loading & Tabel ===== */}
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
                <tr>
                  <th className="py-3 px-4 text-left font-medium">Courses</th>
                  <th className="py-3 px-4 text-left font-medium">Duration</th>
                  <th className="py-3 px-4 text-left font-medium">Price</th>
                  <th className="py-3 px-4 text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="cursor-pointer">
                {courses.map((course, index) => (
                  <tr
                    key={course.id}
                    className={`border-b hover:bg-[#42C2FF]/10 transition ${index % 2 === 0 ? "bg-[#f9fcff]" : "bg-white"
                      }`}
                  >
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <p className="font-bold">{course.title}</p>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <p className="font-bold">{course.duration}</p>
                        <p className="text-gray-600 text-sm">mins</p>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-bold">
                      {course.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      })}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => router.visit(route("edit-course"))} className="p-2 bg-[#42C2FF] hover:bg-[#42C2FF]/90 rounded-md text-white">
                          <Pencil size={16} strokeWidth={2} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(course)}
                          className="p-2 bg-[#FF1818] hover:bg-[#FF1818]/90 rounded-md text-white"
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

      {/* ===== Modal Konfirmasi Delete ===== */}
      <DeleteConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        description="Once you confirm delete course, the course will be gone"
      />
    </div>

    
  );

  
}

CourseList.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
