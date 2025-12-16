import React, { useState } from "react";


export default function Filter() {
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        minDuration: '',
        maxDuration: '',
    });


    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    // const applyFilter = () => {
    //     router.get(
    //         route('institute.courses'),
    //         {
    //             ...filters,
    //         },
    //         {
    //             preserveState: true,
    //             replace: true,
    //         }
    //     );
    // };

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-6 md:p-8">
            <div className="w-full">
                <p className="text-sm mb-1 font-medium">Search by title</p>
                <input
                    type="text"
                    placeholder="Search course"
                    value={filters.search}
                    onChange={e => handleFilterChange('search', e.target.value)}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#42C2FF] focus:ring-[#42C2FF] w-full"
                />
            </div>

            <div className="w-full">
                <p className="text-sm mb-1 font-medium">Category</p>
                <select
                    value={filters.category}
                    onChange={e => handleFilterChange('category', e.target.value)}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#42C2FF] w-full"
                >
                    <option value="">All Category</option>
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                </select>
            </div>

            <div className="w-full">
                <p className="text-sm mb-1 font-medium">Minimum Price</p>
                <input
                    type="number"
                    min={0}
                    placeholder="Rp0,00"
                    value={filters.minPrice}
                    onChange={e => handleFilterChange('minPrice', e.target.value)}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm w-full"
                />

            </div>
            <div className="w-full">
                <p className="text-sm mb-1 font-medium">Maximum Price</p>
                <input
                    type="number"
                    min={0}
                    placeholder="Rp100.000,00"
                    value={filters.maxPrice}
                    onChange={e => handleFilterChange('maxPrice', e.target.value)}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm w-full"
                />
            </div>

            {/* <button
                        onClick={applyFilter}
                        className="rounded-md bg-[#42C2FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#42C2FF]/90"
                    >
                        Apply
                    </button> */}
        </div>
    );
}
