import React, { useState } from "react";

interface DetailSelectProps {
  id: string;
  title: string;
  name: string;
  value?: string | number | null;
  onChange?: (value: string) => void;
  options: { label: string; value: string | number }[];
  disabled?: boolean;
  tabIndex?: number;
}

const DetailSelect: React.FC<DetailSelectProps> = ({
  id,
  title,
  name,
  value,
  onChange,
  options,
  disabled,
  tabIndex,
}) => {
  const [focused, setFocused] = useState(false);

  const hasValue = value !== undefined && value !== null && value !== "";
  const showPlaceholder = focused && !hasValue;

  return (
    <div className="relative z-0 w-full group">
      <select
        id={id}
        name={name}
        value={hasValue ? String(value) : ""}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        tabIndex={tabIndex}
        disabled={disabled}
        className={`block w-full dark:bg-[#222831] appearance-none bg-transparent border-0 border-b-2 text-sm
                   py-2 px-0 text-gray-900 dark:text-white focus:outline-none focus:ring-0
                   ${
                     disabled
                       ? "border-gray-200 text-gray-400 cursor-not-allowed"
                       : "border-gray-300 dark:border-gray-600 focus:border-[#42C2FF]"
                   }`}
      >
        <option value="" disabled hidden>
          {showPlaceholder ? "Select Degree" : ""}
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute text-sm duration-300 transform origin-[0] top-3 z-10
                    ${
                      hasValue || focused
                        ? "-translate-y-6 scale-75"
                        : "translate-y-0 scale-100"
                    }
                    ${
                      focused
                        ? "text-[#42C2FF]"
                        : "text-gray-500 dark:text-white/70"
                    }`}
      >
        {title}
      </label>
      <svg
        className="absolute right-0 top-3 w-4 h-4 text-gray-500 pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
};

export default DetailSelect;
