import React from "react";
import { X, HelpCircle, CheckCircle, AlertTriangle } from "lucide-react";

interface DynamicModalProps {
  type?: "success" | "warning" | "confirmation";
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

const DynamicModal: React.FC<DynamicModalProps> = ({
  type = "confirmation",
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
}) => {
  if (!isOpen) return null;

  const modalStyles = {
    success: {
      icon: <CheckCircle size={28} />,
      iconColor: "#22C55E",
      bgColor: "#DCFCE7",
      title: title || "Success!",
      confirmText: confirmText || "OK",
      cancelText: cancelText || "Back",
    },
    warning: {
      icon: <AlertTriangle size={28} />,
      iconColor: "#FF6060",
      bgColor: "#FFD1D1",
      title: title || "Warning!",
      confirmText: confirmText || "Continue",
      cancelText: cancelText || "Back",
    },
    confirmation: {
      icon: <HelpCircle size={28} />,
      iconColor: "#42C2FF",
      bgColor: "#E0F7FF",
      title: title || "Are you sure?",
      confirmText: confirmText || "Confirm",
      cancelText: cancelText || "Cancel",
    },
  };

  const { icon, iconColor, bgColor } = modalStyles[type];
  const finalTitle = title || modalStyles[type].title;
  const finalConfirmText = confirmText || modalStyles[type].confirmText;
  const finalCancelText = cancelText || modalStyles[type].cancelText;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#42C2FF]/40 backdrop-blur-sm z-99">
      <div className="bg-white w-[380px] rounded-2xl shadow-2xl p-6 relative text-center animate-fadeIn mx-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-[#42C2FF]"
        >
          <X size={18} />
        </button>

        <div className="flex justify-center mb-3">
          <div className="p-2 rounded-full" style={{ backgroundColor: `${bgColor}60` }}>
            <div className="p-2 rounded-full" style={{ backgroundColor: `${bgColor}` }}>
              <div style={{ color: iconColor }}>{icon}</div>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-1">{finalTitle}</h2>
        {description && <p className="text-sm text-gray-500 mb-5">{description}</p>}

        <div className="flex justify-center gap-3">
          {finalCancelText && (
            <button
              onClick={onClose}
              className="px-8 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm font-medium"
            >
              {finalCancelText}
            </button>
          )}
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-8 py-2 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: iconColor }}
            >
              {finalConfirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicModal;
