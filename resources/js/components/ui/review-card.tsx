import { storageUrl } from '@/utils/storage';

export default function ReviewCard({ review }: any) {
    return (
        <div
            data-card
            className="flex h-full flex-col justify-between rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-[#222831] dark:shadow-[#ffffff]/20"
        >
            <div>
                <div className="mb-3 flex items-center gap-3">
                    <img src={storageUrl(review.profile_picture)} alt={review.name} className="h-10 w-10 rounded-full object-cover" />

                    <div>
                        <p className="font-medium text-gray-800 dark:text-white">{review.name}</p>

                        <p className="text-sm text-yellow-400">
                            {'★'.repeat(review.rating)}
                            <span className="text-gray-300">{'★'.repeat(5 - review.rating)}</span>
                        </p>
                    </div>
                </div>

                <p className="mb-6 text-sm text-gray-600 dark:text-white/80">{review.description}</p>
            </div>

            <div className="mt-auto border-t pt-3 dark:border-white/60">
                <p className="mb-2 text-xs text-gray-500 dark:text-white/60">Review to:</p>

                <div className="flex items-center gap-3">
                    <img src={storageUrl(review.review_to.profile_picture)} className="h-10 w-10 rounded-lg object-cover" />
                    <p className="text-sm font-medium text-[#3ABEFF]">{review.review_to.name}</p>
                </div>
            </div>
        </div>
    );
}
