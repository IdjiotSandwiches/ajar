import { FilterSchema } from '../filter-schema';

export const courseCompletionFilter = (categories: any, filters: any): FilterSchema => [
    {
        key: 'search',
        label: 'Search by Title',
        type: 'text',
        placeholder: 'Course title',
        defaultValue: filters.search
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
        key: 'time',
        label: 'Time',
        type: 'time',
        defaultValue: filters.time
    },
    {
        key: 'date',
        label: 'Date',
        type: 'date',
        defaultValue: filters.date
    },
];
