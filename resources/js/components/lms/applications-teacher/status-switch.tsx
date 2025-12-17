export function StatusTabs({ active, onChange, counts, states, accepted }: any) {
    return (
        <div className="flex w-fit gap-2 rounded-lg bg-gray-100 p-1">
            {Object.entries(states).map(([label, value]: any) => (
                <button
                    key={label}
                    onClick={() => onChange({}, value)}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                        active === value ? 'bg-white text-gray-800 shadow' : 'text-gray-500 hover:text-gray-700'
                    } `}
                >
                    {value === states.Available && 'Available'}
                    {value === states.Pending && 'Pending'}
                    {value === states.Accepted && accepted}
                    <span className="ml-1 text-xs text-gray-400">({counts[value]})</span>
                </button>
            ))}
        </div>
    );
}
