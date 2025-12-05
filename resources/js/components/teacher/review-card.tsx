export default function ReviewCardNew({ review }: any) {
  return (
    <div
      data-card
      className="bg-white border rounded-lg shadow-sm p-6 sm:p-8 flex flex-col justify-between w-full h-full hover:shadow-md transition-all border-[#42C2FF]"
    >
      <div>
        <div className="flex items-center gap-3 mb-4">
          <img
            src={review.reviewer.profile_picture || null}
            alt={review.reviewer.name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800 text-sm sm:text-base">
              {review.reviewer.name} - {" "}
              <span className="text-gray-500">{review.reviewer.role.name}</span>
            </p>

            <p className="text-yellow-400 text-sm sm:text-base leading-none mt-1">
              {"★".repeat(review.rating)}
              <span className="text-gray-300">
                {"★".repeat(5 - review.rating)}
              </span>
            </p>
          </div>
        </div>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
          {review.description}
        </p>
      </div>
    </div>
  );
}
