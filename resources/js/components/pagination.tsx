import { Link } from "@inertiajs/react";

export default function Pagination({ links }: any) {
    return (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1 select-none">
            {links.map((link: any, index: number) => {
                const isActive = link.active;
                const isDisabled = !link.url;
                const isPrev = link.label.includes('Previous');
                const isNext = link.label.includes('Next');
                const isNav = isPrev || isNext;

                return (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        preserveScroll
                        preserveState
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`
                            rounded-md border px-3 py-1 text-sm transition text-center

                            ${isNav ? 'w-24 px-0' : 'px-3'}
                            py-1
                            
                            ${isActive
                                ? 'border-[#3ABEFF] bg-[#3ABEFF] text-white'
                                : 'bg-white dark:bg-[#222831] dark:text-white'
                            }

                            ${isPrev
                                ? 'text-gray-600 border dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10'
                                : ''
                            }

                            ${isNext
                                ? 'text-gray-600 border dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10'
                                : ''
                            }

                            ${isDisabled
                                ? 'pointer-events-none opacity-40'
                                : 'hover:bg-[#3ABEFF]/90'
                            }
                        `}
                    />
                );
            })}
        </div>
    );
}
