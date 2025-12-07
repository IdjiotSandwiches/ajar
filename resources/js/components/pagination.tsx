import { Link } from "@inertiajs/react";

export default function Pagination({ links }: any) {
    return (
        <div className="mt-4 flex items-center justify-center gap-1 select-none">
            {links.map((link: any, index: number) => {
                const isActive = link.active;
                const isDisabled = !link.url;

                return (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        preserveScroll
                        preserveState
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`rounded-md border px-3 py-1 text-sm transition ${isActive ? 'border-[#42C2FF] bg-[#42C2FF] text-white' : 'bg-white'} ${isDisabled ? 'cursor-default opacity-40' : 'hover:bg-gray-100'} `}
                    />
                );
            })}
        </div>
    );
}
