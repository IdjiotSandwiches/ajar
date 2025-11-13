import { CategoryProps } from '@/interfaces/shared';
import { useEffect, useRef, useState } from 'react';
import HoverableIcon from '../ui/button-filter';

export default function FilterTeacher(
    { categories, activeSub, handleFilterChange }
    :
    { categories: CategoryProps[], activeSub: number[], handleFilterChange: (options: { category_id?: number; search?: string; enter?: boolean; sub?: number[] }) => void }
) {
    const [showFilter, setShowFilter] = useState(false);
    const [selected, setSelected] = useState<number[]>([]);
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelected((activeSub ?? []).map(Number));
    }, [activeSub]);

    const toggleSelect = (item: number) => {
        setSelected((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
                setShowFilter(false);
            }
        };

        if (showFilter) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showFilter]);

    return (
        <div className="relative" ref={filterRef}>
            <div className="pt-2">
                <HoverableIcon onClick={() => setShowFilter(!showFilter)} />
            </div>

            {showFilter && (
                <div className="absolute right-0 z-50 mt-2 w-72 rounded-xl border bg-white p-4 shadow-lg">
                    <p className="mb-3 text-base font-semibold text-gray-800">Filter</p>
                    <hr className="mb-4 border-gray-200" />
                    <div className="mb-5">
                        <p className="mb-3 text-sm font-semibold text-gray-700">Sub Category</p>
                        {categories.map((category, index) => (
                            <label key={index} className="mb-1 ml-2 flex cursor-pointer items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={selected.includes(category.id)}
                                    onChange={() => toggleSelect(category.id)}
                                    className="peer hidden"
                                />
                                <span
                                    className={`flex h-4 w-4 items-center justify-center rounded border transition-all ${
                                        selected.includes(category.id) ? 'border-[#3ABEFF] bg-[#3ABEFF]' : 'border-gray-400 bg-white'
                                    }`}
                                >
                                    {selected.includes(category.id) && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8.004 8.004a1 1 0 01-1.414 0L3.293 10.71a1 1 0 011.414-1.414l3.582 3.582 7.296-7.296a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </span>
                                <span className="text-sm text-gray-700 select-none">{category.name}</span>
                            </label>
                        ))}
                    </div>

                    <hr className="my-3 border-gray-200" />
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-600">{selected.length} selected</p>
                        <button
                            onClick={() => handleFilterChange({ sub: [...selected], enter: true })}
                            className="rounded-full bg-[#3ABEFF] px-4 py-1.5 text-sm text-white transition hover:bg-[#3ABEFF]/90 cursor-pointer"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
