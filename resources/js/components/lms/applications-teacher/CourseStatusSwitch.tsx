type GenericStatus = string;

export function CourseStatusSwitch<T extends GenericStatus>({
    active,
    onChange,
    counts,
    labels,
}: {
    active: T;
    onChange: (status: T) => void;
    counts: Record<T, number>;
    labels: Record<T, string>;
}) {
    return (
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
            {(Object.keys(labels) as T[]).map((status) => (
                <button
                    key={status}
                    onClick={() => onChange(status)}
                    className={`px-2 md:px-4 py-2 text-sm font-medium rounded-md transition
                        ${active === status
                                ? 'bg-white shadow text-gray-800'
                                : 'text-gray-500 hover:text-gray-700'
                        }
                    `}
                >
                    {labels[status]}
                    <span className="ml-1 text-xs text-gray-400">
                        ({counts[status]})
                    </span>
                </button>
            ))}
        </div>
    );
}
