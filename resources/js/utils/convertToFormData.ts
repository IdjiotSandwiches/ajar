import { TeacherRegisterProps } from "@/interfaces/shared";

export const convertToFormData = (data: Partial<TeacherRegisterProps>): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // ✅ Jika array of File
    if (Array.isArray(value) && value.length > 0 && value[0] instanceof File) {
      value.forEach((file, index) => {
        formData.append(`${key}[${index}]`, file);
      });
    }

    // ✅ Jika array of object (graduates, works)
    else if (Array.isArray(value) && typeof value[0] === "object") {
      formData.append(key, JSON.stringify(value));
    }

    // ✅ Jika object biasa
    else if (typeof value === "object" && !(value instanceof File)) {
      formData.append(key, JSON.stringify(value));
    }

    // ✅ Selain itu (string, number, boolean)
    else {
      formData.append(key, String(value));
    }
  });

  return formData;
};
