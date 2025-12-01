import React, { useState } from "react";
import { X } from "react-feather";
import { router } from "@inertiajs/react";
import { TeacherRegisterProps } from "@/interfaces/shared";

interface TeacherSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  teachers: TeacherRegisterProps[];
  onSelect: (teacher: TeacherRegisterProps) => void;
}

const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, "");

const TeacherSelectModal: React.FC<TeacherSelectModalProps> = ({
  isOpen,
  onClose,
  teachers,
  onSelect,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherRegisterProps | null>(null);

  const teachersPerPage = 5;
  const totalPages = Math.ceil(teachers.length / teachersPerPage);

  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = teachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  if (!isOpen) return null;

  const handleSelect = () => {
    if (selectedTeacher) onSelect(selectedTeacher);
  };

  const handleViewDetail = (name: string) => {
    router.get(route("detail-teacher", { teacherName: slugify(name) }));
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#42C2FF]/40 backdrop-blur-sm">
      <div className="bg-white w-[90%] sm:w-full max-w-lg rounded-2xl shadow-2xl p-4 sm:p-6 relative max-h-[85vh] overflow-y-auto  animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-[#42C2FF]"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Select a Teacher
        </h2>
        <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-1">
          {currentTeachers.map((teacher) => (
            <div
              key={teacher.name}
              onClick={() => setSelectedTeacher(teacher)}
              className={`flex justify-between items-center border rounded-xl p-3 cursor-pointer
                ${selectedTeacher?.name === teacher.name
                  ? "bg-[#42C2FF]/10 border-[#42C2FF]"
                  : "border-gray-200 hover:border-[#42C2FF]"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
                  {teacher.image ? (
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300" />
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="font-medium text-gray-800 text-sm truncate">
                    {teacher.name}
                  </h3>
                  <p className="text-xs text-gray-500 truncate max-w-[150px]">
                    {teacher.description}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetail(teacher.name);
                }}
                className="text-[#42C2FF] hover:text-[#42C2FF]/90 text-xs sm:text-sm font-medium"
              >
                Detail
              </button>
            </div>
          ))}

          {teachers.length === 0 && (
            <p className="text-gray-500 text-center py-4">No teachers found</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`px-3 py-1 rounded-lg text-sm border
                ${currentPage === 1
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-[#42C2FF] border-[#42C2FF] hover:bg-[#42C2FF]/10"
                }
              `}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg text-sm border
                  ${currentPage === i + 1
                    ? "bg-[#42C2FF] text-white border-[#42C2FF]"
                    : "border-gray-200 text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={`px-3 py-1 rounded-lg text-sm border
                ${currentPage === totalPages
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-[#42C2FF] border-[#42C2FF] hover:bg-[#42C2FF]/10"
                }
              `}
            >
              Next
            </button>
          </div>
        )}
        <div className="flex justify-center mt-5">
          <button
            onClick={handleSelect}
            disabled={!selectedTeacher}
            className={`
              px-6 py-2 rounded-lg text-sm font-medium w-full sm:w-auto
              ${selectedTeacher
                ? "bg-[#42C2FF] text-white hover:bg-[#42C2FF]/90"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            Select
          </button>
        </div>

      </div>
    </div>
  );
};

export default TeacherSelectModal;
