import { FilterSchema } from "../filter-schema";

export const courseApplicationFilter = (categories: any): FilterSchema => [
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
    {
        key: 'has_teacher',
        label: 'Have a Teacher',
        type: 'dropdown',
        options: [
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' },
        ],
    },
];
