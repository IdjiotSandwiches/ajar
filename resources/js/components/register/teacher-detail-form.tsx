import React from "react";
import { InertiaFormProps } from "@inertiajs/react";
import {
  Category,
  TeacherRegisterProps,
} from "@/interfaces/shared";
import DetailInput from "../detail-input";
import DetailImage from "../detail-image";
import CategoryForm from "./category";
import GraduateForm from "./graduate";
import InputError from "../input-error";
import WorkForm from "./work";

interface TeacherDetailFormProps {
  form: InertiaFormProps<Partial<TeacherRegisterProps>>;
  categories: Category[];
  onNext?: () => void;
}

const TeacherDetailForm: React.FC<TeacherDetailFormProps> = ({
  form, categories
}) => {

  const getError = (field: string) => (form.errors as Record<string, string>)[field];

  const handleCertificatesChange = (files: File[]) => {
    form.setData("certificates", files);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <DetailInput
          type="textarea"
          name="description"
          id="description"
          title="Description"
          value={form.data.description ?? ""}
          onChange={(e) => form.setData("description", e.target.value)}
        />
        <div className={getError(`description`) ? 'h-5' : ''}>
          <InputError message={getError(`description`)} />
        </div>
      </div>
      <CategoryForm form={form} categories={categories}  />

      <GraduateForm form={form} />

      <WorkForm form={form} />

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
