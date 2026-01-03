import { FilterSchema } from '../filter-schema';

export const manageTeachersFilter = (filters: any): FilterSchema => [
    {
        key: 'search',
        label: 'Search by Name',
        type: 'text',
        placeholder: 'Teacher name',
        defaultValue: filters.search,
    },
    {
        key: 'courses_taught',
        label: 'Total Courses Taught',
        type: 'text',
        placeholder: '0',
        defaultValue: filters.count,
    },
    {
        key: 'rating',
        label: 'Rating',
        type: 'dropdown',
        defaultValue: filters.rating,
        options: [
            { label: '5 ⭐⭐⭐⭐⭐', value: '5' },
            { label: '4 ⭐⭐⭐⭐', value: '4' },
            { label: '3 ⭐⭐⭐', value: '3' },
            { label: '2 ⭐⭐', value: '2' },
            { label: '1 ⭐', value: '1' },
        ],
    },
    {
        key: 'register_date',
        label: 'Register Date',
        type: 'date',
        defaultValue: filters.date,
    },
];
