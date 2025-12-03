import React, { useRef, useState } from "react";
import { Pencil } from "lucide-react";

export default function ProfileCard({ user }: any) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState(
    user.image || "/images/regis-teacher.jpg"
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full py-2">
      <div className="bg-[#42C2FF] rounded-2xl shadow-lg p-1 w-full">
        <div className="bg-white p-0.5 rounded-2xl w-full">
          <div className="bg-[#42C2FF] rounded-2xl px-4 md:px-6 py-8 md:py-12 flex flex-col items-center text-center relative overflow-hidden">
            <div
              className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white shadow-md mb-4 md:mb-6 z-10 group cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src={previewImage}
                alt={user.name}
                className="w-full h-full object-cover transition duration-200 group-hover:opacity-80"
              />

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Pencil className="text-white" size={22} />
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-white z-10 mb-1">
              {user.name || "Unnamed User"}
            </h2>

            <p className="text-xs md:text-sm text-white/90 z-10 capitalize">
              {user.role || "User"}
            </p>

            <div className="absolute right-0 bottom-0 pointer-events-none z-0">
              <img
                src="/images/gear.png"
                alt="gear-bg"
                className="w-48 object-contain"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
