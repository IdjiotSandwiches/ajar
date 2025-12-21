import { FilterSchema } from "../filter-schema";

export const removeCourseFilter: FilterSchema = [
    { key: 'search', label: 'Search by Title', type: 'text', placeholder: 'Course title' },
    { key: 'category', label: 'Category', type: 'dropdown' },
    { key: 'search_institute', label: 'Search by Institute', type: 'text', placeholder: 'Institute name' },
];