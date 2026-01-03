export type FilterFieldType =
    | 'text'
    | 'number'
    | 'dropdown'
    | 'date'
    | 'time';

export type FilterOption = {
    label: string;
    value: string | number;
};

export type FilterFieldConfig = {
    key: string;
    label: string;
    type: FilterFieldType;
    placeholder?: string;
    options?: FilterOption[];
    defaultValue?: any;
};

export type FilterSchema = FilterFieldConfig[];
