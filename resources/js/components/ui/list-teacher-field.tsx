import React, { useState } from "react";
import { Plus, X } from "react-feather";
import TeacherSelectModal from "../modal/select-teacher";
import { dummyTeachers } from "@/dummy-data/dummy-teacher";

interface Teacher {
  id: number;
  name: string;
  expertise: string;
  image?: string;
}

interface TeacherListFieldProps {
  selectedTeachers: Teacher[];
  onChange: (teachers: Teacher[]) => void;
}

const TeacherListField: React.FC<TeacherListFieldProps> = ({
  selectedTeachers,
  onChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectTeacher = (teacher: Teacher) => {
    const alreadyAdded = selectedTeachers.some((t) => t.id === teacher.id);
    if (!alreadyAdded) {
      onChange([...selectedTeachers, teacher]);
    }
    setIsModalOpen(false);
  };

  const handleRemoveTeacher = (id: number) => {
    onChange(selectedTeachers.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-800 mb-3">Teachers</h3>

      <div className="flex gap-4 flex-wrap items-center mb-3">
        {selectedTeachers.map((teacher) => (
          <div
            key={teacher.id}
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
              onClick={() => handleRemoveTeacher(teacher.id)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="border border-sky-400 text-sky-500 rounded-full p-2 hover:bg-sky-50 transition"
        >
          <Plus size={18} />
        </button>
      </div>

      <TeacherSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        teachers={dummyTeachers.map((t, i) => ({
          id: i + 1,
          name: t.name,
          expertise: t.description.split(" ")[0] + " Expert",
          image: `https://i.pravatar.cc/150?img=${i + 10}`,
        }))}
        onSelect={handleSelectTeacher}
      />
    </div>
  );
};

export default TeacherListField;
