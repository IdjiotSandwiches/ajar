import { useEffect, useRef, useState } from 'react';
import HoverableIcon from '../ui/button-filter';

export default function FilterStudent({
    studentFilter,
    price,
    handleFilterChange,
}: {
    studentFilter: any;
    price: any,
    handleFilterChange: (options: { enter?: boolean; rating?: number[]; priceMin?: number; priceMax?: number }) => void;
}) {
    const [price_min, price_max] = [Number(studentFilter.price_min ?? price.min), Number(studentFilter.price_max ?? price.max)];
    const [showFilter, setShowFilter] = useState(false);
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([price_min, price_max]);
    const [selectedCount, setSelectedCount] = useState(0);
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelectedRatings((studentFilter.rating ?? []).map(Number));
        setPriceRange([price_min, price_max]);
    }, [studentFilter]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
                setShowFilter(false);
            }
        };

        if (showFilter) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showFilter]);

    useEffect(() => {
        let count = 0;
        if (selectedRatings.length > 0) count++;
        if (priceRange[0] > 0 || priceRange[1] < 500000) count++;
        setSelectedCount(count);
    }, [selectedRatings, priceRange]);

    const toggleRating = (r: number) => {
        setSelectedRatings((prev) => (prev.includes(r) ? prev.filter((v) => v !== r) : [...prev, r]));
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
                <div className="absolute right-0 z-50 mt-2 w-72 rounded-xl border bg-white dark:bg-[#222831] p-4 shadow-lg">
                    <p className="mb-3 font-semibold text-gray-700 dark:text-white/90">Filter</p>
                    <hr className="mb-3 border-gray-200 dark:border-white/50" />
                    <div className="mb-5">
                        <p className="mb-2 text-sm text-gray-600 dark:text-white/80">Rating</p>

                        {[5, 4, 3, 2, 1].map((r) => (
                            <label key={r} className="mb-1 flex cursor-pointer items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={selectedRatings.includes(r)}
                                    onChange={() => toggleRating(r)}
                                    className="peer hidden"
                                />
                                <span
                                    className={`flex h-4 w-4 items-center justify-center rounded border transition-all ${
                                        selectedRatings.includes(r) ? 'border-[#3ABEFF] bg-[#3ABEFF]' : 'border-gray-400 bg-white dark:bg-gray-600'
                                    }`}
                                >
                                    {selectedRatings.includes(r) && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3 text-white"
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
                                <span className="text-sm text-yellow-400 select-none">{'★'.repeat(r)}</span>
                            </label>
                        ))}
                    </div>

                    <div className="mb-4">
                        <p className="mb-2 text-sm text-gray-600 dark:text-white/80">Price</p>
                        <div className="mb-2 flex gap-2">
                            <input
                                type="number"
                                placeholder="From"
                                className="w-1/2 rounded border dark:border-white/50 px-2 py-1 text-sm focus:ring-1 focus:ring-[#3ABEFF] focus:outline-none"
                                value={priceRange[0]}
                                onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                            />
                            <input
                                type="number"
                                placeholder="To"
                                className="w-1/2 rounded border dark:border-white/50 px-2 py-1 text-sm focus:ring-1 focus:ring-[#3ABEFF] focus:outline-none"
                                value={priceRange[1]}
                                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                            />
                        </div>

                        <div className="flex flex-col">
                            <input
                                type="range"
                                min={price.min}
                                max={price.max}
                                step="1000"
                                value={priceRange[0]}
                                onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                                className="mb-1 accent-[#3ABEFF]"
                            />
                            <input
                                type="range"
                                min={price.min}
                                max={price.max}
                                step="1000"
                                value={priceRange[1]}
                                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                                className="accent-[#3ABEFF]"
                            />
                            <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-white/50">
                                <span>{price.min}</span>
                                <span>{price.max}</span>
                            </div>
                        </div>
                    </div>

                    <hr className="my-3 border-gray-200 dark:border-white/50" />

                    <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-600 dark:text-white/80">{selectedCount} selected</p>
                        <button
                            onClick={() => handleFilterChange({ rating: [...selectedRatings], priceMin: priceRange[0], priceMax: priceRange[1], enter: true })}
                            className="cursor-pointer rounded-full bg-[#3ABEFF] px-4 py-1.5 text-sm text-white transition hover:bg-[#3ABEFF]/90"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
