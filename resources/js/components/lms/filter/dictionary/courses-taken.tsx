import { FilterSchema } from "../filter-schema";

export const coursesTakenFilter: FilterSchema = [
    { key: 'search', label: 'Search by Title', type: 'text', placeholder: 'Course title' },
    {
        key: 'status',
        label: 'Status',
        type: 'dropdown',
        options: [
            { label: 'On Going', value: 'ongoing' },
            { label: 'Completed', value: 'completed' },
        ],
    },
    { key: 'time', label: 'Time', type: 'time' },
    { key: 'date', label: 'Date', type: 'date' },
];