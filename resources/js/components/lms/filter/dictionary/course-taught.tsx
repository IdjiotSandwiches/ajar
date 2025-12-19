import { FilterSchema } from "../filter-schema";

export const coursesTaughtFilter: FilterSchema = [
    { key: 'search', label: 'Search by Title', type: 'text', placeholder: 'Course title' },
    { key: 'category', label: 'Category', type: 'dropdown' },
    { key: 'time', label: 'Time', type: 'time' },
    { key: 'date', label: 'Date', type: 'date' },
];