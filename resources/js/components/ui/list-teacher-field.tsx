import React, { useState } from "react";
import { Plus, X } from "react-feather";
import TeacherSelectModal from "../modal/select-teacher";
import { dummyTeachers } from "@/dummy-data/dummy-teacher";
import { TeacherRegisterProps } from "@/interfaces/shared";

interface TeacherListFieldProps {
  selectedTeachers: TeacherRegisterProps[];
  onChange: (teachers: TeacherRegisterProps[]) => void;
}

const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, "");

const TeacherListField: React.FC<TeacherListFieldProps> = ({
  selectedTeachers,
  onChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectTeacher = (teacher: TeacherRegisterProps) => {
    const alreadyAdded = selectedTeachers.some((t) => slugify(t.name) === slugify(teacher.name));
    if (!alreadyAdded) {
      onChange([...selectedTeachers, teacher]);
    }
    setIsModalOpen(false);
  };

  const handleRemoveTeacher = (name: string) => {
    onChange(selectedTeachers.filter((t) => slugify(t.name) !== name));
  };

  const normalizeTeacher = (t: any, i: number): TeacherRegisterProps => ({
    name: t.name,
    description: t.description || "No description",
    category: t.category || "General",
    graduates: t.graduates || [],
    works: t.works || [],
    phone_number: t.phone || "-",
    email: t.email || "-",
    image: t.image || `https://i.pravatar.cc/150?img=${i + 10}`,
    password: t.password,
    password_confirmation: t.password_confirmation,
    certificates: t.certificates,
    role_id: t.role_id
  });

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-800 mb-3">Teachers</h3>

      <div className="flex gap-4 flex-wrap items-center mb-3">
        {selectedTeachers.map((teacher) => (
          <div
            key={slugify(teacher.name)}
            className="relative flex items-center gap-2 border rounded-full px-3 py-2 bg-gray-50 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
              {teacher.image ? (
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <span className="text-sm font-medium">{teacher.name}</span>

            <button
              onClick={() => handleRemoveTeacher(slugify(teacher.name))}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="border border-[#42C2FF] text-sky-500 rounded-full p-2 hover:bg-[#42C2FF]/90 transition"
        >
          <Plus size={18} />
        </button>
      </div>

      <TeacherSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        teachers={dummyTeachers.map((t, i) => normalizeTeacher(t, i))}
        onSelect={handleSelectTeacher}
      />
    </div>
  );
};

export default TeacherListField;
