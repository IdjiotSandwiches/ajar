export function StatusTabs({ active, onChange, counts, states }: any) {
    return (
        <div className="w-full lg:w-fit">
            <div className="flex flex-wrap gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-[#31363F]">
                {Object.entries(states).map(([label, value]: any) => (
                    <button
                        key={label}
                        onClick={() => onChange(value, {})}
                        className={`flex-1 lg:flex-none min-w-0 whitespace-normal break-words rounded-md px-2 md:px-3 py-2 text-sm font-medium text-center transition
                            ${
                                active === value
                                    ? 'bg-white text-gray-800 shadow dark:bg-[#222831] dark:text-white'
                                    : 'text-gray-500 hover:text-gray-700 dark:text-white/40 dark:hover:text-white/70'
                            }
                        `}
                    >
                        <span className="block">
                            {label}
                            <span className="ml-0.5 text-xs text-gray-400">
                                ({counts[value]})
                            </span>
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
