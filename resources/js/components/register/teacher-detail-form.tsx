// resources/js/components/register/teacher-detail-form.tsx
import React from "react";
import { Plus, Trash2 } from "react-feather";
import { InertiaFormProps } from "@inertiajs/react";
import {
  GraduateProps,
  WorkProps,
  Category,
  TeacherRegisterProps,
} from "@/interfaces/shared";
import DetailInput from "./detail-input";
import DetailImage from "./detail-image";

interface TeacherDetailFormProps {
  form: InertiaFormProps<Partial<TeacherRegisterProps>>;
  categories: Category[];
  onNext?: () => void;

}

const exampleCategories = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Artificial Intelligence", parent_id: 1 },
  { id: 3, name: "Network", parent_id: 1 },
  { id: 4, name: "Cyber Security", parent_id: 1 },
  { id: 5, name: "Cloud Computing", parent_id: 1 },
  { id: 6, name: "Data Science", parent_id: 1 },
  { id: 7, name: "Design" },
  { id: 8, name: "Graphic Design", parent_id: 7 },
  { id: 9, name: "UI/UX Design", parent_id: 7 },
  { id: 10, name: "Illustration", parent_id: 7 },
  { id: 11, name: "Video Maker", parent_id: 7 },
  { id: 12, name: "Logo Maker", parent_id: 7 },
];

const TeacherDetailForm: React.FC<TeacherDetailFormProps> = ({
  form,
}) => {
  const parentCategories = exampleCategories.filter((c) => !c.parent_id);
  const subCategories = exampleCategories.filter((c) => c.parent_id);

  const selectedParent = form.data.parent_category ?? null;
  const selectedSubcategories = form.data.category ?? [];

  // ---- Category ----
  const handleParentSelect = (parentId: number) => {
    form.setData({
      ...form.data,
      parent_category: parentId,
      category: [],
    });
  };

  const handleSubcategoryToggle = (subId: number, checked: boolean) => {
    const updated = checked
      ? [...selectedSubcategories, subId]
      : selectedSubcategories.filter((id: number) => id !== subId);
    form.setData("category", updated);
  };

  // ---- Graduate ----
  const handleAddGraduate = () => {
    form.setData("graduates", [
      ...(form.data.graduates ?? []),
      {
        id: Date.now(),
        degree_title: "",
        university_name: "",
        degree_type: null,
      },
    ]);
  };

  const handleRemoveGraduate = (id: number) => {
    form.setData(
      "graduates",
      (form.data.graduates ?? []).filter((g: GraduateProps) => g.id !== id)
    );
  };

  // ---- Work ----
  const handleAddWork = () => {
    form.setData("works", [
      ...(form.data.works ?? []),
      {
        id: Date.now(),
        duration: 0,
        institution: "",
        position: "",
      },
    ]);
  };

  const handleRemoveWork = (id: number) => {
    form.setData(
      "works",
      (form.data.works ?? []).filter((w: WorkProps) => w.id !== id)
    );
  };

  // ---- Certificates ----
  const handleCertificatesChange = (files: File[]) => {
    form.setData("certificates", files);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Description */}
      <DetailInput
        type="textarea"
        name="description"
        id="description"
        title="Description"
        value={form.data.description ?? ""}
        onChange={(e) => form.setData("description", e.target.value)}
      />

      {/* Category */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Category
        </label>

        {/* Parent Category */}
        <div className="flex gap-6 mb-4 flex-wrap">
          {parentCategories.map((parent) => (
            <label
              key={parent.id}
              className="flex items-center space-x-2 font-medium text-gray-800 cursor-pointer"
            >
              <input
                type="radio"
                name="parent_category"
                checked={selectedParent === parent.id}
                onChange={() => handleParentSelect(parent.id)}
                className="hidden peer"
              />
              <span
                className={`w-4 h-4 rounded-full border-2 ${selectedParent === parent.id
                  ? "border-[#3ABEFF]/70 bg-[#3ABEFF]/70"
                  : "border-gray-400"
                  } flex items-center justify-center transition-all`}
              >
                {selectedParent === parent.id && (
                  <span className="w-2 h-2 bg-[#3ABEFF] rounded-full"></span>
                )}
              </span>
              <span className="select-none">{parent.name}</span>
            </label>
          ))}
        </div>

        {/* Subcategories */}
        {selectedParent && (
          <div className="ml-2 flex flex-col gap-1">
            {subCategories
              .filter((sub) => sub.parent_id === selectedParent)
              .map((sub) => (
                <label
                  key={sub.id}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSubcategories.includes(sub.id)}
                    onChange={(e) =>
                      handleSubcategoryToggle(sub.id, e.target.checked)
                    }
                    className="hidden peer"
                  />
                  <span
                    className={`w-4 h-4 rounded border flex items-center justify-center ${selectedSubcategories.includes(sub.id)
                      ? "bg-[#3ABEFF] border-[#3ABEFF]"
                      : "border-gray-400 bg-white"
                      } transition-all`}
                  >
                    {selectedSubcategories.includes(sub.id) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8.004 8.004a1 1 0 01-1.414 0L3.293 10.71a1 1 0 011.414-1.414l3.582 3.582 7.296-7.296a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm select-none">{sub.name}</span>
                </label>
              ))}
          </div>
        )}
      </div>

      {/* Graduate */}
      <div>
        <h3 className="font-medium text-gray-800 mb-3">Graduate</h3>
        {(form.data.graduates ?? []).map((g: GraduateProps, index: number) => {
          const isLast = index === (form.data.graduates?.length ?? 1) - 1;
          const isSingle = (form.data.graduates?.length ?? 0) === 1;

          return (
            <div key={g.id} className="relative flex items-center gap-4">
              <div className="flex-1 grid md:grid-cols-2 gap-4">
                <DetailInput
                  type="text"
                  name="EduInstitute"
                  id={`EduInstitute${index + 1}`}
                  title={`Educational Institution ${index + 1}`}
                  value={g.university_name}
                  onChange={(e) =>
                    form.setData(
                      "graduates",
                      (form.data.graduates ?? []).map((grad) =>
                        grad.id === g.id
                          ? { ...grad, university_name: e.target.value }
                          : grad
                      )
                    )
                  }
                />
                <DetailInput
                  type="text"
                  title={`Title / Major ${index + 1}`}
                  name="TitleMajor"
                  id={`TitleMajor${index + 1}`}
                  value={g.degree_title}
                  onChange={(e) =>
                    form.setData(
                      "graduates",
                      (form.data.graduates ?? []).map((grad) =>
                        grad.id === g.id
                          ? { ...grad, degree_title: e.target.value }
                          : grad
                      )
                    )
                  }
                />
              </div>
              <div className="flex items-center">
                {isLast || isSingle ? (
                  <button
                    type="button"
                    onClick={handleAddGraduate}
                    className="text-[#3ABEFF] hover:text-[#35aee0] p-2 rounded-full"
                  >
                    <Plus size={18} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleRemoveGraduate(g.id)}
                    className="text-gray-500 hover:text-red-500 p-2 rounded-full"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Work Experience */}
      <div>
        <h3 className="font-medium text-gray-800 mb-3">Work Experience</h3>
        {(form.data.works ?? []).map((w: WorkProps, index: number) => {
          const isLast = index === (form.data.works?.length ?? 1) - 1;
          const isSingle = (form.data.works?.length ?? 0) === 1;

          return (
            <div key={w.id} className="relative flex items-center gap-4">
              <div className="flex-1 grid md:grid-cols-2 gap-4">
                <DetailInput
                  type="text"
                  title={`Company / Institution ${index + 1}`}
                  name="CompanyInstitute"
                  id={`CompanyInstitute${index + 1}`}
                  value={w.institution}
                  onChange={(e) =>
                    form.setData(
                      "works",
                      (form.data.works ?? []).map((work) =>
                        work.id === w.id
                          ? { ...work, institution: e.target.value }
                          : work
                      )
                    )
                  }
                />
                <DetailInput
                  type="number"
                  min="0"
                  title={`Work Duration ${index + 1}`}
                  name="WorkDuration"
                  id={`WorkDuration${index + 1}`}
                  value={w.position}
                  onChange={(e) =>
                    form.setData(
                      "works",
                      (form.data.works ?? []).map((work) =>
                        work.id === w.id
                          ? { ...work, position: e.target.value }
                          : work
                      )
                    )
                  }
                />
              </div>

              <div className="flex items-center">
                {isLast || isSingle ? (
                  <button
                    type="button"
                    onClick={handleAddWork}
                    className="text-[#3ABEFF] hover:text-[#35aee0] p-2 rounded-full"
                  >
                    <Plus size={18} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleRemoveWork(w.id)}
                    className="text-gray-500 hover:text-red-500 p-2 rounded-full"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Certificates */}
      <div>
        <h3 className="font-medium text-gray-800 mb-3">Certificates</h3>
        <DetailImage
          Index={0}
          multiple
          productImages={form.data.certificates ?? []}
          onFilesChange={handleCertificatesChange}
        />
      </div>
    </div>
  );
};

export default TeacherDetailForm;
