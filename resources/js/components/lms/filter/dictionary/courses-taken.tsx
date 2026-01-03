import { FilterSchema } from '../filter-schema';

export const coursesTakenFilter = (status: any, filters: any): FilterSchema => [
    {
        key: 'search',
        label: 'Search by Title',
        type: 'text',
        placeholder: 'Course title',
        defaultValue: filters.search,
    },
    {
        key: 'status',
        label: 'Status',
        type: 'dropdown',
        defaultValue: filters.status,
        options: [
            ...status.map((s: any) => ({
                label: String(s).charAt(0).toUpperCase() + String(s).slice(1),
                value: s,
            })),
            {
                label: 'Rejected',
                value: 'rejected',
            }
        ],
    },
    {
        key: 'time',
        label: 'Time',
        type: 'time',
        defaultValue: filters.time,
    },
    {
        key: 'date',
        label: 'Date',
        type: 'date',
        defaultValue: filters.date,
    },
];
