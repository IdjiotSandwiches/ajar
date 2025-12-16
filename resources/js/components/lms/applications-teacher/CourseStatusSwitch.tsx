type CourseStatus = "available" | "pending" | "joined";

export function CourseStatusSwitch({
    active,
    onChange,
    counts,
}: {
    active: CourseStatus;
    onChange: (status: CourseStatus) => void;
    counts: Record<CourseStatus, number>;
}) {
    return (
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
            {(["available", "pending", "joined"] as CourseStatus[]).map(
                (status) => (
                    <button
                        key={status}
                        onClick={() => onChange(status)}
                        className={`
                            px-3 md:px-4 py-2 text-sm font-medium rounded-md transition
                            ${
                                active === status
                                    ? "bg-white shadow text-gray-800"
                                    : "text-gray-500 hover:text-gray-700"
                            }
                        `}
                    >
                        {status === "available" && "Available"}
                        {status === "pending" && "Pending"}
                        {status === "joined" && "My Courses"}
                        <span className="ml-1 text-xs text-gray-400">
                            ({counts[status]})
                        </span>
                    </button>
                )
            )}
        </div>
    );
}
