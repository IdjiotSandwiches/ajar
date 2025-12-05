import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function HeroSection() {
    const [search, setSearch] = useState<string>('');
    const handleFilterChange = ({ enter }: { enter?: boolean }) => {
        if (enter) {
            router.get(route("list-course", { search }));
        }
    };

    return (
        <section className="flex cursor-default flex-col items-center justify-between gap-12 bg-white px-6 py-14 md:flex-row md:px-12 lg:px-20">
            <div className="space-y-6 md:w-1/2">
                <h1 className="text-3xl leading-snug font-bold text-[#42C2FF] md:text-4xl">
                    Learning, Teaching <br /> Technology and Design
                </h1>
                <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate id, necessitatibus obcaecati incidunt eos soluta nesciunt
                    molestiae excepturi dolorem quibusdam porro at quas deleniti, explicabo veniam aut dolorum numquam. Dolor, eveniet voluptatum
                    neque saepe nostrum itaque at! Esse optio eaque nisi quaerat dolor sapiente? Error esse ex commodi adipisci distinctio.
                </p>
                <div className="flex w-full max-w-md overflow-hidden rounded-lg bg-[#42C2FF]/50 shadow-sm">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleFilterChange({ enter: true })}
                        placeholder="Search Course"
                        className="flex-1 px-4 py-3 font-medium text-white outline-none"
                    />
                    <button
                        onClick={() => handleFilterChange({ enter: true })}
                        className="cursor-pointer bg-[#42C2FF] px-6 py-2 font-medium text-white hover:bg-[#42C2FF]/90"
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="flex justify-center md:w-1/2">
                <img src="/images/hero-img.png" alt="Hero" className="h-80 w-80 rounded-full object-cover md:h-100 md:w-100" />
            </div>
        </section>
    );
}
