import { FilterSchema } from '../filter-schema';

export const courseApplicationFilter = (categories: any, filters: any): FilterSchema => [
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
];
