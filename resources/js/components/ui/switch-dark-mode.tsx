import React from "react";
import { Moon, Sun } from "lucide-react";
import { useAppearance } from "@/hooks/use-appearance";

export default function SwitchDarkMode() {
  const { appearance, updateAppearance } = useAppearance();

  const isDark =
    appearance === "dark" ||
    (appearance === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <button
      onClick={() => updateAppearance(isDark ? "light" : "dark")}
      className="relative flex h-10 w-10 items-center justify-center rounded-full hover:border border-gray-200 bg-white transition dark:border-gray-700 dark:bg-gray-800"
      aria-label="Toggle dark mode"
    >
      <Sun
        size={24}
        className={`
          absolute text-yellow-400
          transition-all duration-300
          animate-spin
          ${isDark ? "opacity-0 scale-75" : "opacity-100 scale-100"}
        `}
      />

      <Moon
        size={24}
        className={`
          absolute text-gray-300
          transition-all duration-300
          animate-moon
          ${isDark ? "opacity-100 scale-100" : "opacity-0 scale-75"}
        `}
      />
    </button>
  );
}
