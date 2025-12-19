import { FilterSchema } from "../filter-schema";

export const instituteApplicationFilter: FilterSchema = [
    { key: 'search', label: 'Search by Name', type: 'text', placeholder: 'Institute name' },
    {
        key: 'category',
        label: 'Category',
        type: 'dropdown',
        options: [
            { label: 'Technology', value: 'tech' },
            { label: 'Design', value: 'design' },
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
