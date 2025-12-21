import { FilterSchema } from "../filter-schema";

export const coursesTaughtFilter = (categories: any, days: any): FilterSchema => [
    { key: 'search', label: 'Search by Title', type: 'text', placeholder: 'Course title' },
    {
        key: 'category',
        label: 'Category',
        type: 'dropdown',
        options: categories.map((cat: any) => ({
            label: cat.name,
            value: cat.id,
        })),
    },
    { key: 'time', label: 'Time', type: 'time' },
    {
        key: 'day',
        label: 'Day',
        type: 'dropdown',
        options: days.map((d: any) => ({
            label: d,
            value: d,
        })),
    },
];
