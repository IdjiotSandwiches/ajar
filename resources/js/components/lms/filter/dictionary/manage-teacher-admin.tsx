import { FilterSchema } from "../filter-schema";

export const manageTeacherAdminFilter: FilterSchema = [
    { key: 'search', label: 'Search by Name', type: 'text', placeholder: 'Institute name' },
    { key: 'search_institute', label: 'Search by Institute', type: 'text', placeholder: 'Institute name' },
    { key: 'total_course', label: 'Total Course', type: 'text', placeholder: '0' },
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
