import { useEffect, useState } from 'react';

export default function Filter({ categories, onFilterChange }: any) {
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        minPrice: '',
        maxPrice: '',
    });

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            onFilterChange(filters);
        }, 400);

        return () => clearTimeout(timeout);
    }, [filters]);

    return (
        <div className="grid grid-cols-1 gap-4 rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-6 md:grid-cols-4 md:p-8">
            <div className="w-full">
                <p className="mb-1 text-sm font-medium">Search by title</p>
                <input
                    type="text"
                    placeholder="Search course"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#42C2FF] focus:ring-[#42C2FF]"
                />
            </div>

            <div className="w-full">
                <p className="mb-1 text-sm font-medium">Category</p>
                <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#42C2FF]"
                >
                    <option value="">All Category</option>
                    {categories?.map((category: any, index: number) => (
                        <option value={category.id} key={index}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="w-full">
                <p className="mb-1 text-sm font-medium">Minimum Price</p>
                <input
                    type="number"
                    min={0}
                    placeholder="Rp0,00"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
            </div>
            <div className="w-full">
                <p className="mb-1 text-sm font-medium">Maximum Price</p>
                <input
                    type="number"
                    min={0}
                    placeholder="Rp100.000,00"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
            </div>
        </div>
    );
}
