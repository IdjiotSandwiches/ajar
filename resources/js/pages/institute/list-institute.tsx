import React, { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Search } from "lucide-react";
import InstituteCard from "@/components/institute/card";

const dummyInstitutes = [
  {
    id: 1,
    name: "Digital Tech Institute",
    image: "/images/institute1.jpg",
    category: "Technology",
    teachers: [
      { id: 1, name: "John Doe", image: "/images/teacher1.jpg" },
      { id: 2, name: "Anna White", image: "/images/teacher2.jpg" },
      { id: 3, name: "John Doe", image: "/images/teacher1.jpg" },
      { id: 4, name: "Anna White", image: "/images/teacher2.jpg" },
      { id: 5, name: "John Doe", image: "/images/teacher1.jpg" },
      { id: 6, name: "Anna White", image: "/images/teacher2.jpg" },
      { id: 7, name: "John Doe", image: "/images/teacher1.jpg" },
      { id: 8, name: "Anna White", image: "/images/teacher2.jpg" },
    ],
  },
  {
    id: 2,
    name: "Creative Art Academy",
    image: "/images/institute2.jpg",
    category: "Design",
    teachers: [
      { id: 3, name: "Emily Clark", image: "/images/teacher3.jpg" },
      { id: 4, name: "Megan Fox", image: "/images/teacher4.jpg" },
      { id: 5, name: "Jason Lee", image: "/images/teacher5.jpg" },
    ],
  },
];

export default function InstituteListPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<"Technology" | "Design">("Technology");

  const filtered = dummyInstitutes
    .filter((inst) => inst.category === activeCategory)
    .filter((inst) => inst.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="bg-[#F7FDFD] min-h-screen pb-24 px-6 md:px-12">
      {/* TITLE + CATEGORY */}
      <div className="pt-12 flex flex-col items-center w-full">
        <div className="flex flex-col items-center mb-8 w-[240px] relative">
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D8F4FF]" />
          <div className="flex justify-between w-full relative">
            {["Technology", "Design"].map((cat) => (
              <div key={cat} className="w-1/2 flex justify-center relative">
                <button
                  onClick={() => setActiveCategory(cat as any)}
                  className={`relative text-lg md:text-xl font-semibold pb-2 transition-all ${
                    activeCategory === cat
                      ? "text-[#42C2FF]"
                      : "text-gray-400 hover:text-[#42C2FF]"
                  }`}
                >
                  {cat}
                </button>
              </div>
            ))}

            <span
              className={`absolute bottom-0 h-[2px] bg-[#42C2FF] transition-all duration-500 ease-in-out ${
                activeCategory === "Technology" ? "left-0 w-1/2" : "left-1/2 w-1/2"
              }`}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full max-w-3xl justify-center">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder={`Search for ${activeCategory.toLowerCase()} institutes...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-full border border-[#D8F4FF] bg-white 
              focus:ring-2 focus:ring-[#42C2FF] focus:outline-none shadow-sm text-sm text-gray-700"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#42C2FF] hover:bg-[#42C2FF]/90 p-2 rounded-full text-white transition">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full">
        {filtered.length > 0 ? (
          filtered.map((institute) => <InstituteCard key={institute.id} institute={institute} />)
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No {activeCategory} institutes available yet.
          </p>
        )}
      </div>
    </section>
  );
}

InstituteListPage.layout = (page: any) => (
  <AppLayout useContainer={false}>{page}</AppLayout>
);
