import { storageUrl } from '@/utils/storage';

export default function ReviewCardNew({ review }: any) {
    return (
        <div
            data-card
            className="flex h-full w-full flex-col justify-between rounded-lg border dark:border-white/20 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-[#222831] dark:shadow-[#ffffff]/20 sm:p-8"
        >
            <div>
                <div className="mb-4 flex items-center gap-3">
                    <img src={storageUrl(review.profile_picture)} alt={review.name} className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12" />
                    <div>
                        <p className="text-sm font-semibold text-gray-800 sm:text-base dark:text-white">{review.name}</p>

                        <p className="mt-1 text-sm leading-none text-yellow-400 sm:text-base">
                            {'★'.repeat(review.rating)}
                            <span className="text-gray-300">{'★'.repeat(5 - review.rating)}</span>
                        </p>
                    </div>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-gray-600 sm:text-base dark:text-white/80">{review.description}</p>
            </div>
        </div>
    );
}
