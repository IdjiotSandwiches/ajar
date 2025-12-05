import { router } from "@inertiajs/react";

export default function InstitutionSection({ institutes }: { institutes: any[] }) {
  return (
    <section className="pt-6 pb-10 md:pt-10 md:pb-16 px-4 sm:px-6 md:px-12">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold -gray-800">
          Institutions with the Best Teachers
        </h2>

        <button
          className="text-[#3ABEFF] font-medium hover:underline text-xs :text-sm"
          onClick={() => router.get(route('list-institute'))}
        >
          View All →
        </button>
      </div>
      <div className="flex gap-5 sm:gap-6 md:gap-8 overflow-x-auto pb-3 sm:pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#3ABEFF]/30 -track-transparent scroll-smooth">
        {institutes.map((institute, index) => (
          <div
            key={index}
            className="snap-start flex-shrink-0 w-[90px] sm:w-[110px] md:w-[120px] flex flex-col items-center"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#3ABEFF]/20 shadow-sm bg-gray-100 flex items-center justify-center ">
              <img
                src={institute.profile_picture}
                alt={institute.name}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => router.get(route("detail-institute", institute.id))}
              />
            </div>

            <p className="mt-2 sm:mt-3 text-gray-600 text-xs sm:text-sm text-center line-clamp-2">
              {institute.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
