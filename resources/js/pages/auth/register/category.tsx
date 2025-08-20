import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Category, TeacherRegisterProps } from '@/interfaces/shared';
import { InertiaFormProps } from '@inertiajs/react';
import { useState } from 'react';

interface CategoryProps {
    categories: Category[];
    form: InertiaFormProps<Partial<TeacherRegisterProps>>;
}

export default function CategoryForm({ categories, form }: CategoryProps) {
    const flattenCategories = (arr: Category[]): Category[] =>
        arr.flatMap(obj => [obj, ...(obj.children ? flattenCategories(obj.children) : [])]);

    const findByName = (arr: Category[], id: number): Category | undefined =>
        flattenCategories(arr).find(obj => obj.id === id);

    const parentCategory = form.data.category
        ? findByName(categories, form.data.category)?.parent_id
        : "";

    const [category, setCategory] = useState<number | null>(form.data.category ?? null);
    const [selected, setSelected] = useState<string>(categories.find((c) => c.id === parentCategory)?.name ?? categories[0].name);

    const onSelect = (id: number) => {
        setCategory(id);
        form.setData('category', id);
    };

    return (
        <>
            <RadioGroup
                defaultValue={selected}
                onValueChange={(val) => setSelected(val)}
            >
                {categories.map((c, idx) => {
                    return (
                        <div key={idx}>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value={c.name} id={c.name} />
                                <Label htmlFor={c.name}>{c.name}</Label>
                            </div>

                            {selected === c.name && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {categories
                                        .find((c) => c.name === selected)
                                        ?.children?.map((item, idx) => {
                                            return (
                                                <Button
                                                    type="button"
                                                    variant={item.id === category ? 'default' : 'outline'}
                                                    key={idx}
                                                    onClick={() => onSelect(item.id)}
                                                >
                                                    {item.name}
                                                </Button>
                                            );
                                        })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </RadioGroup>
            <InputError message={form.errors.category} />
        </>
    );
}
