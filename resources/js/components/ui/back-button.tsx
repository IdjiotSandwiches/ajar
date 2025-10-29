import React from "react";
import { ArrowLeft } from "react-feather";
import { router } from "@inertiajs/react";

interface BackButtonProps {
  label?: string;    
  className?: string;  
}

const BackButton: React.FC<BackButtonProps> = ({ label = "Back", className }) => {
  const handleBack = () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    router.visit("/");
  }
};

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`flex items-center gap-2 text-gray-700 dark:text-white 
                  hover:text-[#3ABEFF] transition-colors duration-200 
                  ${className ?? ""}`}
    >
      <ArrowLeft size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default BackButton;
