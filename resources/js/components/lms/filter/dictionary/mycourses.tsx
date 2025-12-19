import { FilterSchema } from "../filter-schema";

export const myCoursesFilter = (categories: any): FilterSchema => [
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
    { key: 'duration', label: 'Duration', type: 'text', placeholder: 'Minutes' },
    {
        key: 'price_range',
        label: 'Price Range',
        type: 'dropdown',
        options: [
            { label: 'Free', value: 'free' },
            { label: '< Rp 100.000', value: 'low' },
            { label: '> Rp 100.000', value: 'high' },
        ],
    },
];
