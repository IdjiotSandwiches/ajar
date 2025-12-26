export function StatusTabs({ active, onChange, counts, states }: any) {
    return (
        <div className="flex w-fit gap-2 rounded-lg bg-gray-100 dark:bg-[#31363F] p-1">
            {Object.entries(states).map(([label, value]: any) => {
                return (
                    <button
                        key={label}
                        onClick={() => onChange(value, {})}
                        className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                            active === value ? 'bg-white dark:bg-[#222831] text-gray-800 dark:text-white shadow' : 'text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white/70'
                        } `}
                    >
                        {label}
                        <span className="ml-1 text-xs text-gray-400">({counts[value]})</span>
                    </button>
                );
            })}
        </div>
    );
}
