import { FilterSchema } from '../filter-schema';

export const studentMyCoursesFilter = (filters: any): FilterSchema => [
    {
        key: 'search',
        label: 'Search by Title',
        type: 'text',
        placeholder: 'Course title',
        defaultValue: filters.search,
    }
];
