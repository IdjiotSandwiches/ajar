/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import DetailInput from "../../detail-input";
import InputError from "../../input-error";
import GraduateForm from "../../register/graduate";
import CategoryForm from "../../register/category";
import WorkForm from "../../register/work";
import DetailImage from "../../detail-image";
import { Category, TeacherRegisterProps } from "@/interfaces/shared";
import { InertiaFormProps } from "@inertiajs/react";

interface ProfileTeacherFormProps {
  form: InertiaFormProps<Partial<TeacherRegisterProps>>;
  categories: Category[];
}

const ProfileTeacherForm: React.FC<ProfileTeacherFormProps> = ({
  form,
  categories,
}) => {
  const getError = (field: string) =>
    (form.errors as Record<string, string>)[field];

  const handleCertificatesChange = (files: File[]) => {
    form.setData("certificates", files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", form.data);
  };

  return (
    <div className="bg-white shadow-sm rounded-2xl p-8">
      <h3 className="text-2xl font-semibold text-center text-[#42C2FF] mb-8">
        Teacher Information
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <DetailInput
            type="textarea"
            name="description"
            id="description"
            title="Description"
            value={form.data.description ?? ""}
            onChange={(e) => form.setData("description", e.target.value)}
          />
          <div className={getError("description") ? "h-5" : ""}>
            <InputError message={getError("description")} />
          </div>
        </div>
        <div>
          {/* <CategoryForm form={form} categories={categories} /> */}
        </div>

        <div>
          <GraduateForm form={form} />
        </div>

        <div>
          <WorkForm form={form} />
        </div>

        <div>
          <h4 className="font-medium text-gray-800 mb-3">Certificates</h4>
          <DetailImage
            Index={0}
            multiple
            productImages={form.data.certificates ?? []}
            onFilesChange={handleCertificatesChange}
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-[#42C2FF] hover:bg-[#42C2FF]/90 text-white w-full py-2.5 rounded-lg transition font-medium"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileTeacherForm;
