import React from "react";
import { Trash2, Star } from "lucide-react";

interface MobileTeacherCardProps {
    avatar?: string;
    fullName: string;
    category: string;
    coursesCount: number;
    rating: number;
    totalReviews: number;
    registerDate: Date;
    onDelete: () => void;
}

const MobileTeacherCard: React.FC<MobileTeacherCardProps> = ({
    avatar,
    fullName,
    category,
    coursesCount,
    rating,
    totalReviews,
    registerDate,
    onDelete,
}) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4">
                <img
                    src={avatar || "https://placehold.co/80"}
                    alt={fullName}
                    className="h-16 w-16 rounded-full object-cover"
                />

                <div className="flex-1">
                    <p className="font-semibold text-gray-800">{fullName}</p>
                    <p className="text-sm text-gray-500">{category}</p>
                </div>
            </div>

            <div className="mt-4 space-y-1 text-sm text-gray-700">
                <p>
                    Courses Taught:{" "}
                    <span className="font-semibold">{coursesCount}</span>
                </p>

                <p className="flex items-center gap-1">
                    Rating:
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">
                        {rating.toFixed(1)}
                    </span>
                    <span className="text-gray-500">
                        / 5 ({totalReviews} reviews)
                    </span>
                </p>

                <p className="text-xs text-gray-500">
                    Registered on{" "}
                    {new Date(registerDate).toLocaleDateString("id-ID")}
                </p>

            </div>

            <div className="mt-4 flex justify-end">
                <button
                    onClick={onDelete}
                    className="rounded-md bg-[#FF1818] p-2 text-white hover:bg-[#FF1818]/90"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default MobileTeacherCard;
