import InputError from "@/components/input-error";
import { Category, CourseData } from "@/interfaces/shared";
import { InertiaFormProps } from "@inertiajs/react";
import { useState } from "react";

interface CategoryProps {
  categories: Category[];
  form: InertiaFormProps<Partial<CourseData>>;
}

export default function CategoryForm({ categories, form }: CategoryProps) {
  const flattenCategories = (arr: Category[]): Category[] =>
    arr.flatMap((obj) => [
      obj,
      ...(obj.children ? flattenCategories(obj.children) : []),
    ]);

  const findByName = (arr: Category[], id: number): Category | undefined =>
    flattenCategories(arr).find((obj) => obj.id === id);

  const parentCategory = form.data.category
    ? findByName(categories, form.data.category)?.parent_id
    : "";

  const [category, setCategory] = useState<number | null>(
    form.data.category ?? null
  );
  const [selectedParent, setSelectedParent] = useState<string>(
    categories.find((c) => c.id === parentCategory)?.name ?? categories[0].name
  );

  const onSelectParent = (val: string) => {
    setSelectedParent(val);
    form.setData("category", null);
  };

  const onSelectSub = (id: number) => {
    setCategory(id);
    form.setData("category", id);
  };

  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-2 block">
        Category
      </label>

      {/* Parent Category */}
      <div className="flex gap-6 mb-4 flex-wrap">
        {categories.map((parent) => (
          <label
            key={parent.id}
            className="flex items-center space-x-2 font-sm text-gray-800 cursor-pointer font-medium"
          >
            <input
              type="radio"
              name="parent_category"
              checked={selectedParent === parent.name}
              onChange={() => onSelectParent(parent.name)}
              className="hidden peer"
            />
            <span
              className={`w-4 h-4 rounded-full border-2 ${
                selectedParent === parent.name
                  ? "border-[#3ABEFF]/70 bg-[#3ABEFF]/70"
                  : "border-gray-400"
              } flex items-center justify-center transition-all`}
            >
              {selectedParent === parent.name && (
                <span className="w-2 h-2 bg-[#3ABEFF] rounded-full"></span>
              )}
            </span>
            <span className="select-none">{parent.name}</span>
          </label>
        ))}
      </div>

      {/* Subcategory */}
      {selectedParent && (
        <div className="ml-2 flex flex-col gap-1">
          {categories
            .find((c) => c.name === selectedParent)
            ?.children?.map((sub) => (
              <label
                key={sub.id}
                className="flex items-center space-x-2 text-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={category === sub.id}
                  onChange={() => onSelectSub(sub.id)}
                  className="hidden peer"
                />
                <span
                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                    category === sub.id
                      ? "bg-[#3ABEFF] border-[#3ABEFF]"
                      : "border-gray-400 bg-white"
                  } transition-all`}
                >
                  {category === sub.id && (
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

      <InputError message={form.errors.category} />
    </div>
  );
}
