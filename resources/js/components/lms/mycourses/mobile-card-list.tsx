import React from "react";
import { Pencil, Trash2 } from "lucide-react";

interface MobileCourseCardProps {
    image: string;
    title: string;
    duration: number;
    price: number;
    onEdit: () => void;
    onDelete: () => void;
}

const MobileCourseCard: React.FC<MobileCourseCardProps> = ({
    image,
    title,
    duration,
    price,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="border border-[#3ABEFF]/50 bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden p-4 mb-5 flex flex-col md:flex-row gap-4">
            <img
                src={image || "https://placehold.co/600x400"}
                alt={title}
                className="w-full h-40 md:w-32 md:h-32 object-cover border border-gray-200 rounded-lg"
            />

            <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-gray-800 text-base">
                    {title}
                </h3>

                <div className="text-sm text-gray-700 space-y-1">
                    <p>
                        <span className="font-medium text-gray-600">
                            Duration:
                        </span>{" "}
                        <span className="font-medium">
                            {duration} mins
                        </span>
                    </p>

                    <p>
                        <span className="font-medium text-gray-600">
                            Price:
                        </span>{" "}
                        <span className="font-medium">
                            Rp
                            {Number(price).toLocaleString("id-ID", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </span>
                    </p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <button
                        onClick={onEdit}
                        className="p-2 rounded-md bg-[#3ABEFF] text-white hover:bg-[#3ABEFF]/90 transition"
                    >
                        <Pencil size={16} />
                    </button>

                    <button
                        onClick={onDelete}
                        className="p-2 rounded-md bg-[#FF1818] text-white hover:bg-[#FF1818]/90 transition"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileCourseCard;
