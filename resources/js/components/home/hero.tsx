import { router } from '@inertiajs/react';
import { useState, useRef } from 'react';

export default function HeroSection() {
    const [search, setSearch] = useState<string>('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleFilterChange = ({ enter }: { enter?: boolean }) => {
        if (enter) {
            router.get(route("list-course", { search }));
        }
    };

    const handleFocus = () => {
        setTimeout(() => {
            inputRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }, 200); 
    };

    return (
        <section className="flex cursor-default flex-col items-center justify-between gap-12 bg-white dark:bg-[#222831] px-4 sm:px-6 md:px-12 py-14 md:flex-row">
            <div className="space-y-6 md:w-1/2">
                <h1 className="text-3xl font-bold text-[#3ABEFF] md:text-4xl">
                    Learning, Teaching <br /> Technology and Design
                </h1>

                <p className="text-gray-600 dark:text-white">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita ullam aperiam illo quis architecto debitis, velit suscipit! Laboriosam, minus eligendi.
                </p>

                <div className="flex max-w-md overflow-hidden rounded-lg bg-[#3ABEFF]/50 shadow-sm">
                    <input
                        ref={inputRef}
                        type="text"
                        value={search}
                        onFocus={handleFocus}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleFilterChange({ enter: true })}
                        placeholder="Search Course"
                        className="flex-1 px-4 py-3 font-medium text-white outline-none"
                    />
                    <button
                        onClick={() => handleFilterChange({ enter: true })}
                        className="cursor-pointer bg-[#3ABEFF] px-6 py-2 font-medium text-white hover:bg-[#3ABEFF]/90"
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="flex justify-center md:w-1/2">
                <img
                    src="/images/hero-img.png"
                    alt="Hero"
                    className="h-64 w-64 lg:h-80 lg:w-80 rounded-full object-cover"
                />
            </div>
        </section>
    );
}
