import React, { useState, useEffect, useRef } from "react";
import HoverableIcon from "../ui/button-filter";
import { dummyCategories } from "@/dummy-data/dummy-category";

export default function FilterTeacher() {
  const [showFilter, setShowFilter] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  const categories = dummyCategories.filter((cat) => cat.parent_id === null);
  const subCategoriesMap: Record<string, string[]> = {};

  categories.forEach((cat) => {
    const subs = dummyCategories
      .filter((sub) => sub.parent_id === cat.id)
      .map((sub) => sub.name);
    subCategoriesMap[cat.name] = subs;
  });

  const toggleSelect = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilter(false);
      }
    };

    if (showFilter) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilter]);

  return (
    <div className="relative" ref={filterRef}>
      <div className="pt-2">
        <HoverableIcon onClick={() => setShowFilter(!showFilter)} />
      </div>

      {showFilter && (
        <div
          className="
            absolute right-0 mt-2 w-72 bg-white border rounded-xl shadow-lg p-4 z-49
            max-sm:w-60 max-sm:p-3
          "
        >
          <p className="font-semibold text-gray-800 text-base mb-3 max-sm:text-sm">
            Filter
          </p>
          <hr className="border-gray-200 mb-4" />

          <div className="mb-5">
            <p className="font-semibold text-gray-700 text-sm mb-3">
              Sub Category
            </p>

            {Object.entries(subCategoriesMap).map(([category, items]) => (
              <div key={category} className="mb-4">
                <p className="text-gray-600 font-medium mb-2 text-sm">
                  {category}
                </p>

                {items.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 cursor-pointer mb-1 ml-2"
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(item)}
                      onChange={() => toggleSelect(item)}
                      className="hidden peer"
                    />
                    <span
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        selected.includes(item)
                          ? "bg-[#42C2FF] border-[#42C2FF]"
                          : "border-gray-400 bg-white"
                      }`}
                    >
                      {selected.includes(item) && (
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
                    <span className="text-sm text-gray-700 select-none">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            ))}
          </div>

          <hr className="my-3 border-gray-200" />

          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-600">{selected.length} selected</p>
            <button
              onClick={() => console.log("Selected:", selected)}
              className="bg-[#42C2FF] text-white px-4 py-1.5 rounded-full text-sm hover:bg-[#42C2FF]/90 transition"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
