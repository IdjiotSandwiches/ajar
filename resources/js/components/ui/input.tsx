import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, name, value, onChange, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    const isActive = isFocused || (value && value.toString().length > 0)

    return (
      <div className="relative w-full">
        <input
          id={name}
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=" "
          autoComplete="off"
          className={cn(
            "peer w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-900 text-sm transition-all duration-200",
            "focus:border-[#3ABEFF] focus:ring-2 focus:ring-[#3ABEFF]/30 focus:outline-none",
            "[&:-webkit-autofill]:shadow-[inset_0_0_0_30px_white] [&:-webkit-autofill]:text-fill-color:#000",
            className
          )}
          {...props}
        />
        <label
          htmlFor={name}
          className={cn(
            "absolute left-3 bg-white px-1 text-sm transition-all duration-200 pointer-events-none",
            isActive
              ? "top-[-0.55rem] text-xs"
              : "top-[0.9rem] text-gray-500",
            isFocused
              ? "text-[#3ABEFF]"
              : "text-gray-500"
          )}
        >
          {label}
        </label>
      </div>
    )
  })

export { Input }

