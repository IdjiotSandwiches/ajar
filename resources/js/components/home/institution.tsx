import { router } from "@inertiajs/react";

export default function InstitutionSection({ institutes }: { institutes: any[] }) {
  return (
    <section className="pt-8 pb-16 px-6 md:px-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          Institutions with the Best Teachers
        </h2>
        <button className="text-[#3ABEFF] font-medium hover:underline text-sm">
          View All →
        </button>
      </div>

      {/* Scrollable horizontal area */}
      <div
        className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory
        scrollbar-thin scrollbar-thumb-[#3ABEFF]/30 scrollbar-track-transparent scroll-smooth"
      >
        {institutes.map((institute, index) => (
          <div
            key={index}
            className="snap-start flex-shrink-0 w-[120px] flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#3ABEFF]/20 shadow-sm bg-gray-100 flex items-center justify-center">
              <img
                src={institute.profile_picture}
                alt={institute.name}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => router.get(route("detail-institute", institute.id))}
              />
            </div>
            <p className="mt-3 text-gray-600 text-sm text-center">{institute.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
