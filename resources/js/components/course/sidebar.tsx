import { router } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import TeacherProfileCard from '../teacher/card';

export default function CourseSidebar({ teacher, institute }: { teacher: any[]; institute: any }) {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const teachers = Array.isArray(teacher) ? teacher : [teacher].filter(Boolean);

    useEffect(() => {
        if (!sliderRef.current || teachers.length <= 1) return;

        const slider = sliderRef.current;
        let index = 0;

        const interval = setInterval(() => {
            index = (index + 1) % teachers.length;
            slider.scrollTo({
                left: slider.clientWidth * index,
                behavior: 'smooth',
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [teachers.length]);

    return (
        <aside className="space-y-6">
            <div>
                <h3 className="mb-2 text-sm font-semibold text-gray-700">Institution</h3>
                <div
                    className="cursor-pointer rounded-2xl bg-[#3ABEFF] p-1 shadow-lg"
                    onClick={() => router.get(route('detail-institute', institute.id))}
                >
                    <div className="rounded-2xl bg-white p-0.5">
                        <div className="relative flex items-center gap-4 overflow-hidden rounded-2xl bg-[#3ABEFF] p-2 text-center">
                            <img
                                src={institute?.profile_picture || 'https://placehold.co/400'}
                                alt="ins"
                                className="h-12 w-12 rounded-full border-2"
                            />
                            <span className="font-medium text-white">{institute.name}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="mb-2 text-sm font-semibold text-gray-700">Teachers</h3>
                {teachers.length === 0 ? (
                    <p className="text-gray-500 text-sm">No teacher yet</p>
                ) : (
                    <div
                        ref={sliderRef}
                        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {teachers.map((t: any, index: number) => (
                            <div key={index} className="w-full flex-shrink-0 snap-center">
                                <TeacherProfileCard teacher={t} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
}
