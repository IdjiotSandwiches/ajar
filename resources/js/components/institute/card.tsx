import { router } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function InstituteCard({ institute }: any) {
    const teachers = institute?.teacher_applications ?? [];
    const hasTeachers = teachers.length > 0;

    const [index, setIndex] = useState(0);

    const next = () => {
        setIndex((prev) => (prev + 1) % teachers.length);
    };

    const prev = () => {
        setIndex((prev) => (prev - 1 + teachers.length) % teachers.length);
    };

    useEffect(() => {
        setIndex(0);
    }, [teachers.length]);

    useEffect(() => {
        if (!hasTeachers || teachers.length <= 1) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % teachers.length);
        }, 7000);

        return () => clearInterval(interval);
    }, [hasTeachers, teachers.length]);

    return (
        <div className="mb-4 rounded-2xl bg-[#3ABEFF] p-1 shadow-lg">
            <div className="rounded-2xl bg-white p-0.5">
                <div
                    className="cursor-pointer rounded-2xl bg-[#3ABEFF] p-6 text-center"
                    onClick={() =>
                        router.get(route("detail-institute", institute.user_id))
                    }
                >
                    <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full border-2 border-white shadow-md">
                        <img
                            src={
                                institute?.user?.profile_picture ??
                                "https://placehold.co/400"
                            }
                            alt={institute?.user?.name ?? "Institute"}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <h2 className="text-xl font-bold text-white">
                        {institute?.user?.name}
                    </h2>
                </div>

                <div className="group relative mt-2 rounded-2xl bg-white p-4">
                    {!hasTeachers && (
                        <p className="py-3 text-center text-sm text-gray-500">
                            No teacher in this institute
                        </p>
                    )}

                    {hasTeachers && (
                        <>
                            <h3 className="mb-3 text-sm font-semibold text-gray-700">
                                Teachers in this Institute
                            </h3>

                            <div className="relative overflow-hidden rounded-xl">
                                <div
                                    className="flex transition-transform duration-500"
                                    style={{
                                        transform: `translateX(-${index * 100}%)`,
                                    }}
                                >
                                    {teachers.map((t: any) => (
                                        <div
                                            key={t.user_id}
                                            className="w-full flex-shrink-0"
                                        >
                                            <div
                                                className="flex cursor-pointer items-center gap-3 rounded-xl bg-[#F1FBFF] px-4 py-3 shadow-sm transition active:scale-[0.98]"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    router.get(
                                                        route(
                                                            "detail-teacher",
                                                            t.user_id
                                                        )
                                                    );
                                                }}
                                            >
                                                <img
                                                    src={
                                                        t?.user
                                                            ?.profile_picture ??
                                                        "https://placehold.co/400"
                                                    }
                                                    alt={
                                                        t?.user?.name ??
                                                        "Teacher"
                                                    }
                                                    className="h-12 w-12 rounded-full border object-cover"
                                                />
                                                <p className="text-base font-semibold whitespace-nowrap text-gray-700">
                                                    {t?.user?.name}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {teachers.length > 1 && (
                                    <>
                                        <button
                                            aria-label="Previous teacher"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                prev();
                                            }}
                                            className="absolute top-1/2 -left-3 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#3ABEFF] text-white shadow transition opacity-80 hover:opacity-100"
                                        >
                                            <ChevronLeft size={18} />
                                        </button>

                                        <button
                                            aria-label="Next teacher"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                next();
                                            }}
                                            className="absolute top-1/2 -right-3 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#3ABEFF] text-white shadow transition opacity-80 hover:opacity-100"
                                        >
                                            <ChevronRight size={18} />
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
