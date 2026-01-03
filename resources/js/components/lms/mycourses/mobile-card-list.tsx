import { storageUrl } from '@/utils/storage';
import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';

interface MobileCourseCardProps {
    image: string;
    title: string;
    duration: number;
    price: number;
    onEdit: () => void;
    onDelete: () => void;
}

const MobileCourseCard: React.FC<MobileCourseCardProps> = ({ image, title, duration, price, onEdit, onDelete }) => {
    return (
        <div className="mb-5 flex flex-col gap-4 overflow-hidden rounded-xl border p-4 shadow-sm transition hover:border-[#3ABEFF]/50 hover:shadow-md md:flex-row dark:border-white/20 dark:shadow-white/20">
            <img src={storageUrl(image)} alt={title} className="h-40 w-full rounded-lg border object-cover md:h-32 md:w-32 dark:border-white/20" />

            <div className="flex flex-col gap-3">
                <h3 className="text-base font-semibold text-gray-800 dark:text-white">{title}</h3>

                <div className="space-y-1 text-sm text-gray-700 dark:text-white/90">
                    <p>
                        <span className="font-medium text-gray-600 dark:text-white/80">Duration:</span>{' '}
                        <span className="font-medium">{duration} mins</span>
                    </p>

                    <p>
                        <span className="font-medium text-gray-600 dark:text-white/80">Price:</span>{' '}
                        <span className="font-medium">
                            Rp
                            {Number(price).toLocaleString('id-ID', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </span>
                    </p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <button onClick={onEdit} className="rounded-md bg-[#3ABEFF] p-2 text-white transition hover:bg-[#3ABEFF]/90">
                        <Pencil size={16} />
                    </button>

                    <button onClick={onDelete} className="rounded-md bg-[#FF1818] p-2 text-white transition hover:bg-[#FF1818]/90">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileCourseCard;
