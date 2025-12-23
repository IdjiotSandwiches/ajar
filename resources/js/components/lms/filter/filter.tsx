import { useEffect, useMemo, useRef, useState } from 'react';
import { FilterFieldConfig, FilterSchema } from './filter-schema';

type Props = {
    schema: FilterSchema;
    onChange: (filters: Record<string, any>) => void;
};

export default function Filter({ schema, onChange }: Props) {
    const isMounted = useRef(false);
    const initialState = useMemo(
        () =>
            schema.reduce(
                (acc, field) => {
                    acc[field.key] = '';
                    return acc;
                },
                {} as Record<string, any>,
            ),
        [schema],
    );

    const [filters, setFilters] = useState(initialState);
    const handleChange = (key: string, value: any) => {
        const updated = { ...filters, [key]: value };
        setFilters(updated);
    };

    const renderField = (field: FilterFieldConfig) => {
        const baseClass =
            'w-full rounded-lg border dark:border-white/20 px-3 py-2 text-sm text-gray-700 dark:text-white ' +
            'transition focus:border-[#3ABEFF] focus:outline-none focus:ring-2 focus:ring-[#3ABEFF]/30';

        switch (field.type) {
            case 'text':
                return (
                    <input
                        type="text"
                        placeholder={field.placeholder}
                        value={filters[field.key]}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className={baseClass}
                    />
                );

            case 'number':
                return (
                    <input type="number" value={filters[field.key]} onChange={(e) => handleChange(field.key, e.target.value)} className={baseClass} />
                );

            case 'dropdown':
                return (
                    <select value={filters[field.key]} onChange={(e) => handleChange(field.key, e.target.value)} className={baseClass}>
                        <option value="">All</option>
                        {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                );

            case 'date':
                return (
                    <input type="date" value={filters[field.key]} onChange={(e) => handleChange(field.key, e.target.value)} className={baseClass} />
                );

            case 'time':
                return (
                    <input type="time" value={filters[field.key]} onChange={(e) => handleChange(field.key, e.target.value)} className={baseClass} />
                );

            default:
                return null;
        }
    };

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        const timeout = setTimeout(() => {
            onChange(filters);
        }, 400);

        return () => clearTimeout(timeout);
    }, [filters]);

    return (
        <div className="rounded-2xl bg-white/90 dark:bg-[#222831]/90 p-4 border dark:border-white/20 shadow-sm dark:shadow-[#ffffff]/20 backdrop-blur-sm sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {schema.map((field) => (
                    <div key={field.key} className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700 dark:text-white/80">{field.label}</label>
                        {renderField(field)}
                    </div>
                ))}
            </div>
        </div>
    );
}
