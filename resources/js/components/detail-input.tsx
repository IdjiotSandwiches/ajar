import React, { useEffect, useRef } from "react";

interface DetailInputProps {
  id: string;
  type: "text" | "number" | "textarea" | "email" | "password";
  name: string;
  title: string;
  min?: number;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  tabIndex?: number
  disabled?: boolean;
  required?: boolean;
}

const DetailInput: React.FC<DetailInputProps> = ({
  id,
  type,
  name,
  title,
  min,
  value,
  onChange,
  onBlur,
  onFocus,
  tabIndex,
  disabled,
  required
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (type === "textarea" && textareaRef.current) {
      handleTextareaInput();
    }
  }, [value, type]);

  const displayValue =
    type === "number" && (value === 0 || value === "0") ? "" : value;

  return (
    <div className="relative z-0 w-full group">
      {type === "textarea" ? (
        <textarea
          name={name}
          id={id}
          ref={textareaRef}
          defaultValue={value as string}
          onChange={(e) => {
            onChange?.(e);
            handleTextareaInput();
          }}
          rows={1}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0
                     border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600
                     dark:focus:border-[#3ABEFF] focus:outline-none focus:ring-0 focus:border-[#3ABEFF] peer"
          placeholder=" "
          autoComplete="off"
          tabIndex={tabIndex}
          disabled={disabled}
          required={required}
          style={{ resize: "none", overflow: "hidden" }}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={id}
          min={min}
          defaultValue={type === "number" ? displayValue : value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className="block pt-2.5 pb-1 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                     border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600
                     dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#3ABEFF] peer"
          placeholder=" "
          autoComplete="off"
          tabIndex={tabIndex}
          disabled={disabled}
          required={required}
        />
      )}
      <label
        htmlFor={id}
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white
                   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                   peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
                   peer-focus:text-[#3ABEFF] peer-focus:dark:text[#3ABEFF]
                   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                   peer-focus:scale-75 peer-focus:-translate-y-6 dark:bg-[#222831]"
      >
        {title}
      </label>
    </div>
  );
};

export default DetailInput;
