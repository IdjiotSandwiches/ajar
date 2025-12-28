import { FilterSchema } from '../filter-schema';

export const coursesTaughtFilter = (categories: any, days: any, filters: any): FilterSchema => [
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
        key: 'time',
        label: 'Time',
        type: 'time',
        defaultValue: filters.time
    },
    {
        key: 'day',
        label: 'Day',
        type: 'dropdown',
        defaultValue: filters.day,
        options: days.map((d: any) => ({
            label: d,
            value: d,
        })),
    },
];
