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
    const [selected, setSelected] = useState<string>(categories[0].name);
    const [category, setCategory] = useState<number | null>(null);

    const onSelect = (id: number) => {
        setCategory(id);
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
            <InputError message={form.errors.category_id} />
        </>
    );
}
