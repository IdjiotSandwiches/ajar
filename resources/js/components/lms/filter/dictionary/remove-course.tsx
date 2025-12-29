import { FilterSchema } from '../filter-schema';

export const removeCourseFilter = (categories: any, filters: any): FilterSchema => [
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
        key: 'search_secondary',
        label: 'Search by Institute',
        type: 'text',
        placeholder: 'Institute name',
        defaultValue: filters.search_secondary,
    },
];
