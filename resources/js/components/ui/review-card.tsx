export default function ReviewCard({ review }: { review: any }) {
  return (
    <div
      data-card
      className="
        bg-white border border-gray-100 rounded-lg shadow-sm p-6
        flex flex-col justify-between h-full
        hover:shadow-md transition-all
      "
    >
      <div>
        <div className="flex items-center gap-3 mb-3">
          <img
            src={review?.reviewer?.profile_picture || "https://placehold.co/400"}
            alt={review.name}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <p className="font-medium text-gray-800">
              {review.name} -
              <span className="text-gray-500"> {review.reviewer.role.name}</span>
            </p>

            <p className="text-yellow-400 text-sm">
              {"★".repeat(review.rating)}
              <span className="text-gray-300">
                {"★".repeat(5 - review.rating)}
              </span>
            </p>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6">{review.description}</p>
      </div>

      <div className="border-t pt-3 mt-auto">
        <p className="text-xs text-gray-500 mb-2">Review to:</p>

        <div className="flex items-center gap-3">
          {/* <img
            src={institution?.logo || "/images/default-logo.png"}
            className="w-10 h-10 rounded-lg object-cover"
          /> */}

          <div>
            <p className="text-[#42C2FF] font-medium text-sm">
              {review.teacher.user.name}
            </p>
            {/* <p className="text-xs text-gray-500">{institution?.name}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
