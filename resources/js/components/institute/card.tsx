import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function InstituteCard({ institute }: any) {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [index, setIndex] = useState(0);

    const hasTeachers = institute.teacher_applications && institute.teacher_applications.length > 0;

    const next = () => {
        setIndex((prev) => (prev === institute.teacher_applications.length - 1 ? 0 : prev + 1));
    };

    const prev = () => {
        setIndex((prev) => (prev === 0 ? institute.teacher_applications.length - 1 : prev - 1));
    };

    useEffect(() => {
        if (!hasTeachers) return;
        const interval = setInterval(() => {
            next();
        }, 7000);
        return () => clearInterval(interval);
    }, [hasTeachers, institute.teacher_applications.length]);

    return (
        <div className="mb-4 rounded-2xl bg-[#42C2FF] p-1 shadow-lg">
            <div className="rounded-2xl bg-white p-0.5">
                <div
                    className="cursor-pointer rounded-2xl bg-[#42C2FF] p-6 text-center"
                    onClick={() => router.get(route('detail-institute', institute.user_id))}
                >
                    <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full border-2 border-white shadow-md">
                        <img
                            src={institute?.user?.profile_picture || 'https://placehold.co/400'}
                            alt={institute.user.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <h2 className="text-xl font-bold text-white">{institute.user.name}</h2>
                </div>

                <div className="group relative mt-2 rounded-2xl bg-white p-4">
                    {!hasTeachers && <p className="py-3 text-center text-sm text-gray-500">No teacher in this institute</p>}

                    {hasTeachers && (
                        <>
                            <h3 className="mb-3 text-sm font-semibold text-gray-700">Teachers in this Institute</h3>

                            <div className="relative">
                                <div className="overflow-hidden rounded-xl">
                                    <div
                                        ref={sliderRef}
                                        className="flex transition-transform duration-500"
                                        style={{
                                            transform: `translateX(-${index * 100}%)`,
                                            width: `${institute.teacher_applications.length * 100}%`,
                                        }}
                                    >
                                        {institute.teacher_applications.map((t: any) => (
                                            <div
                                                key={t.user_id}
                                                className="flex w-full flex-shrink-0 cursor-pointer items-center gap-3 rounded-xl bg-[#F1FBFF] px-4 py-3 shadow-sm transition active:scale-[0.98]"
                                                onClick={() => router.get(route('detail-teacher', t.user_id))}
                                            >
                                                <img
                                                    src={t?.user?.profile_picture || 'https://placehold.co/400'}
                                                    alt={t.user.name}
                                                    className="h-12 w-12 rounded-full border object-cover"
                                                />
                                                <p className="text-base font-semibold whitespace-nowrap text-gray-700">{t.user.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {institute.teacher_applications.length > 1 && (
                                    <>
                                        <button
                                            onClick={prev}
                                            className="absolute top-1/2 -left-4 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#42C2FF] text-white opacity-0 shadow transition group-hover:opacity-100"
                                        >
                                            <ChevronLeft />
                                        </button>
                                        <button
                                            onClick={next}
                                            className="absolute top-1/2 -right-4 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#42C2FF] text-white opacity-0 shadow transition group-hover:opacity-100"
                                        >
                                            <ChevronRight />
                                        </button>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
