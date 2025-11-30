import { dummyInstitutions } from "@/dummy-data/dummy-institute";
import { router } from "@inertiajs/react";
import React from "react";

export default function InstitutionSection() {
  return (
    <section className="pt-8 pb-16 px-4 sm:px-6 md:px-12">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
          Institutions with the Best Teachers
        </h2>

        <button
          className="text-[#42C2FF] font-medium hover:underline text-xs sm:text-sm"
          onClick={() => router.get(route("list-institute"))}
        >
          View All →
        </button>
      </div>

      <div className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#42C2FF]/30 scrollbar-track-transparent">
        {dummyInstitutions.map((inst, index) => (
          <div
            key={index}
            className="snap-start flex-shrink-0 w-[90px] sm:w-[100px] md:w-[120px] flex flex-col items-center"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-[#42C2FF]/20 shadow-sm bg-gray-100 flex items-center justify-center">
              <img
                src={inst.logo}
                alt={inst.name}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() =>router.get(route("detail-institute", { id: index + 1 }))}
              />
            </div>

            <p className="mt-3 text-gray-600 text-xs sm:text-sm text-center px-1">
              {inst.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
