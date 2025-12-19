import { FilterSchema } from "../filter-schema";

export const manageInstituteFilter: FilterSchema = [
    { key: 'search', label: 'Search by Name', type: 'text', placeholder: 'Institute name' },
    {
        key: 'category',
        label: 'Category',
        type: 'dropdown',
        options: [
            { label: 'Technology', value: 'tech' },
            { label: 'Design', value: 'design' },
        ],
    },{ key: 'total_course', label: 'Total Course', type: 'text', placeholder: '0' },
    {
        key: 'rating',
        label: 'Rating',
        type: 'dropdown',
        options: [
            { label: '5 ⭐⭐⭐⭐⭐', value: '5' },
            { label: '4 ⭐⭐⭐⭐', value: '4' },
            { label: '3 ⭐⭐⭐', value: '3' },
            { label: '2 ⭐⭐', value: '2' },
            { label: '1 ⭐', value: '1' },
        ],
    },
];
