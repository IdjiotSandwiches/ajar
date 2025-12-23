import { Star, Trash2 } from 'lucide-react';
import React from 'react';

interface MobileTeacherCardProps {
    avatar?: string;
    fullName: string;
    coursesCount: number;
    rating: number;
    totalReviews: number;
    registerDate: Date;
    onDelete: () => void;
}

const MobileTeacherCard: React.FC<MobileTeacherCardProps> = ({
    avatar,
    fullName,
    coursesCount,
    rating,
    totalReviews,
    registerDate,
    onDelete,
}) => {
    return (
        <div className="rounded-xl border dark:border-white/20 p-4 shadow-sm dark:shadow-white/20">
            <div className="flex items-center gap-4">
                <img src={avatar || 'https://placehold.co/80'} alt={fullName} className="h-16 w-16 rounded-full object-cover" />

                <div className="flex-1">
                    <p className="font-semibold text-gray-800 dark:text-white">{fullName}</p>
                </div>
            </div>

            <div className="mt-4 space-y-1 text-sm text-gray-700 dark:text-white/90">
                <p>
                    Courses Taught: <span className="font-semibold">{coursesCount}</span>
                </p>

                <p className="flex items-center gap-1">
                    Rating:
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{rating.toFixed(1)}</span>
                    <span className="text-gray-500 dark:text-white/70">/ 5 ({totalReviews} reviews)</span>
                </p>

                <p className="text-xs text-gray-500 dark:text-white/70">Registered on {new Date(registerDate).toLocaleDateString('id-ID')}</p>
            </div>

            <div className="mt-4 flex justify-end">
                <button onClick={onDelete} className="cursor-pointer rounded-md bg-[#FF1818] p-2 text-white hover:bg-[#FF1818]/90">
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default MobileTeacherCard;
