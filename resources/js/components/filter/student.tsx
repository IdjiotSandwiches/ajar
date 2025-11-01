import React, { useEffect, useRef, useState } from "react";
import HoverableIcon from "../ui/button-filter";

export default function FilterStudent() {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedCount, setSelectedCount] = useState(0);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilter(false);
      }
    };

    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilter]);

  useEffect(() => {
    let count = 0;
    if (selectedRatings.length > 0) count++;
    if (priceRange[0] > 0 || priceRange[1] < 500000) count++;
    setSelectedCount(count);
  }, [selectedRatings, priceRange]);

  const toggleRating = (r: number) => {
    setSelectedRatings((prev) =>
      prev.includes(r) ? prev.filter((v) => v !== r) : [...prev, r]
    );
  };

  const handlePriceChange = (index: 0 | 1, value: number) => {
    setPriceRange((prev) => {
      const newRange: [number, number] = [...prev];
      newRange[index] = value;

      if (newRange[0] > newRange[1]) {
        if (index === 0) newRange[1] = newRange[0];
        else newRange[0] = newRange[1];
      }
      return newRange;
    });
  };

  return (
    <div className="relative" ref={filterRef}>
      <div className="pt-2">
        <HoverableIcon onClick={() => setShowFilter(!showFilter)} />
      </div>

      {showFilter && (
        <div className="absolute right-0 mt-2 w-72 bg-white border rounded-xl shadow-lg p-4 z-50">
          <p className="font-semibold mb-3 text-gray-700">Filter</p>
          <hr className="mb-3" />

          {/* === Rating === */}
          <div className="mb-5">
            <p className="text-sm text-gray-600 mb-2">Rating</p>

            {[5, 4, 3, 2, 1].map((r) => (
              <label key={r} className="flex items-center gap-2 cursor-pointer mb-1">
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(r)}
                  onChange={() => toggleRating(r)}
                  className="hidden peer"
                />
                <span
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    selectedRatings.includes(r)
                      ? "bg-[#3ABEFF] border-[#3ABEFF]"
                      : "border-gray-400 bg-white"
                  }`}
                >
                  {selectedRatings.includes(r) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8.004 8.004a1 1 0 01-1.414 0L3.293 10.71a1 1 0 011.414-1.414l3.582 3.582 7.296-7.296a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-sm text-yellow-400 select-none">
                  {"★".repeat(r)}
                </span>
              </label>
            ))}
          </div>

          {/* === Price === */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Price</p>
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                placeholder="From"
                className="w-1/2 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#3ABEFF]"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(0, Number(e.target.value))}
              />
              <input
                type="number"
                placeholder="To"
                className="w-1/2 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#3ABEFF]"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
              />
            </div>

            {/* Range Slider */}
            <div className="flex flex-col ">
              <input
                type="range"
                min="0"
                max="500000"
                step="1000"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                className="accent-[#3ABEFF] mb-1 "
              />
              <input
                type="range"
                min="0"
                max="500000"
                step="1000"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                className="accent-[#3ABEFF]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>500.000</span>
              </div>
            </div>
          </div>

          <hr className="my-3" />

          {/* Selected info & Apply button */}
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-600">{selectedCount} selected</p>
            <button
              onClick={() =>
                console.log("Applied filters:", {
                  selectedRatings,
                  priceRange,
                })
              }
              className="bg-[#3ABEFF] text-white px-4 py-1.5 rounded-full text-sm hover:bg-[#3ABEFF]/90 transition"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
