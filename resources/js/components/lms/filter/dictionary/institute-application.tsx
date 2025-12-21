import { FilterSchema } from '../filter-schema';

export const instituteApplicationFilter = (categories: any): FilterSchema => [
    { key: 'search', label: 'Search by Name', type: 'text', placeholder: 'Institute name' },
    {
        key: 'category',
        label: 'Category',
        type: 'dropdown',
        options: categories.map((cat: any) => ({
            label: cat.name,
            value: cat.id,
        })),
    }
];
