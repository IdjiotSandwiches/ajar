import { dummyInstitution } from "@/dummy-data/dummy-institute";
import { router } from "@inertiajs/react";
import React from "react";

export default function InstitutionSection() {
  return (
    <section className="pt-8 pb-16 px-6 md:px-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
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
        {dummyInstitution.map((inst, index) => (
          <div
            key={index}
            className="snap-start flex-shrink-0 w-[120px] flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#3ABEFF]/20 shadow-sm bg-gray-100 flex items-center justify-center">
              <img
                src={inst.logo}
                alt={inst.name}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => router.get(route('detail-institute'))}
              />
            </div>
            <p className="mt-3 text-gray-600 text-sm text-center">{inst.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
