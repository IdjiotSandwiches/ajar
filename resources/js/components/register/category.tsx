import InputError from '@/components/input-error';
import { useState } from 'react';

export default function CategoryForm({ categories, form }: any) {
    const flattenCategories = (arr: any[]): any[] => arr.flatMap((obj) => [obj, ...(obj.children ? flattenCategories(obj.children) : [])]);
    const findByName = (arr: any[], id: number): any => flattenCategories(arr).find((obj) => obj.id === id);
    const parentCategory = form.data.category ? findByName(categories, form.data.category)?.parent_id : '';

    const [category, setCategory] = useState<number | null>(form.data.category ?? null);
    const [selectedParent, setSelectedParent] = useState<string>(categories.find((c: any) => c.id === parentCategory)?.name ?? categories[0].name);

    const onSelectParent = (val: string) => {
        setSelectedParent(val);
        form.setData('category', null);
    };

    const onSelectSub = (id: number) => {
        setCategory(id);
        form.setData('category', id);
    };

    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
            <div className="mb-4 flex flex-wrap gap-6">
                {categories.map((parent: any) => (
                    <label key={parent.id} className="font-sm flex cursor-pointer items-center space-x-2 font-medium text-gray-800">
                        <input
                            type="radio"
                            name="parent_category"
                            checked={selectedParent === parent.name}
                            onChange={() => onSelectParent(parent.name)}
                            className="peer hidden"
                        />
                        <span
                            className={`h-4 w-4 rounded-full border-2 ${
                                selectedParent === parent.name ? 'border-[#3ABEFF]/70 bg-[#3ABEFF]/70' : 'border-gray-400'
                            } flex items-center justify-center transition-all`}
                        >
                            {selectedParent === parent.name && <span className="h-2 w-2 rounded-full bg-[#3ABEFF]"></span>}
                        </span>
                        <span className="select-none">{parent.name}</span>
                    </label>
                ))}
            </div>
            {selectedParent && (
                <div className="ml-2 flex flex-col gap-1">
                    {categories
                        .find((c: any) => c.name === selectedParent)
                        ?.children?.map((sub: any) => (
                            <label key={sub.id} className="flex cursor-pointer items-center space-x-2 text-gray-700">
                                <input type="checkbox" checked={category === sub.id} onChange={() => onSelectSub(sub.id)} className="peer hidden" />
                                <span
                                    className={`flex h-4 w-4 items-center justify-center rounded border ${
                                        category === sub.id ? 'border-[#3ABEFF] bg-[#3ABEFF]' : 'border-gray-400 bg-white'
                                    } transition-all`}
                                >
                                    {category === sub.id && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3 text-white"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8.004 8.004a1 1 0 01-1.414 0L3.293 10.71a1 1 0 011.414-1.414l3.582 3.582 7.296-7.296a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </span>
                                <span className="text-sm select-none">{sub.name}</span>
                            </label>
                        ))}
                </div>
            )}
            <InputError message={form.errors.category} />
        </div>
    );
}
