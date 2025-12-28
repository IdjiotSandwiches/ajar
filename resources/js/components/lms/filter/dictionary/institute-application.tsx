import { FilterSchema } from '../filter-schema';

export const instituteApplicationFilter = (categories: any, filters: any): FilterSchema => [
    {
        key: 'search',
        label: 'Search by Name',
        type: 'text',
        placeholder: 'Institute name',
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
