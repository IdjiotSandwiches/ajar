import { FilterSchema } from '../filter-schema';

export const myCoursesFilter = (categories: any, filters: any): FilterSchema => [
    {
        key: 'search',
        label: 'Search by Title',
        type: 'text',
        placeholder: 'Course title',
        defaultValue: filters.search,
    },
    {
        key: 'category',
        label: 'Category',
        type: 'dropdown',
        defaultValue: filters.category_id,
        options: categories.map((cat: any) => ({
            label: cat.name,
            value: cat.id,
        })),
    },
    {
        key: 'duration',
        label: 'Duration',
        type: 'text',
        placeholder: 'Minutes',
        defaultValue: filters.duration,
    },
    {
        key: 'sort_by',
        label: 'Sort By Price',
        type: 'dropdown',
        defaultValue: filters.sort_by,
        options: [
            { label: 'Lowest', value: 0 },
            { label: 'Highest', value: 1 },
        ],
    },
];
