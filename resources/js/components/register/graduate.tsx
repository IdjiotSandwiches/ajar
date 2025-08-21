import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DegreeTypeEnums, GraduateProps, TeacherRegisterProps } from '@/interfaces/shared';
import { InertiaFormProps, usePage } from '@inertiajs/react';
import { CirclePlus, Trash2 } from 'lucide-react';

export default function GraduateForm({ form }: { form: InertiaFormProps<Partial<TeacherRegisterProps>> }) {
    const enums = usePage<DegreeTypeEnums>().props;
    const degree_type = enums.degree_type_enum;

    const getError = (field: string) => (form.errors as Record<string, string>)[field];

    const addData = () => {
        form.setData('graduates', [
            ...((form.data.graduates as GraduateProps[]) ?? []),
            { id: Date.now(), degree_title: '', degree_type: null, university_name: '' },
        ]);
    };

    const removeData = (idx: number) => {
        form.setData(
            'graduates',
            ((form.data.graduates as GraduateProps[]) ?? []).filter((g) => g.id !== idx),
        );
    };

    return (
        <>
            {(form.data.graduates as GraduateProps[])?.map((g, idx) => {
                {
                    return (
                        <div key={g.id} className="flex items-start gap-4">
                            {(() => {
                                const rowHasError =
                                    getError(`graduates.${idx}.university_name`) ||
                                    getError(`graduates.${idx}.degree_title`) ||
                                    getError(`graduates.${idx}.degree_type`);

                                return (
                                    <>
                                        <div className="grid w-full max-w-sm items-start gap-2" key={`graduates.${idx}.university_name`}>
                                            <Label htmlFor={`graduates.${idx}.university_name`}>Educational Institution - {idx + 1}</Label>
                                            <Input
                                                id={`graduates.${idx}.university_name`}
                                                type="text"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="university_name"
                                                value={g.university_name}
                                                onChange={(e) =>
                                                    form.setData('graduates', [
                                                        ...(form.data.graduates as GraduateProps[]).map((grad, i) =>
                                                            i === idx ? { ...grad, university_name: e.target.value } : grad,
                                                        ),
                                                    ])
                                                }
                                                disabled={form.processing}
                                                placeholder={`Educational Institution ${idx + 1}`}
                                            />
                                            <div className={rowHasError ? 'h-5' : ''}>
                                                <InputError message={getError(`graduates.${idx}.university_name`)} />
                                            </div>
                                        </div>
                                        <div className="grid w-full max-w-sm items-center gap-2" key={`graduates.${idx}.degree_title`}>
                                            <Label htmlFor={`graduates.${idx}.degree_title`}>Title/Major - {idx + 1}</Label>
                                            <Input
                                                id={`graduates.${idx}.degree_title`}
                                                type="text"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="degree_title"
                                                value={g.degree_title}
                                                onChange={(e) =>
                                                    form.setData('graduates', [
                                                        ...(form.data.graduates as GraduateProps[]).map((grad, i) =>
                                                            i === idx ? { ...grad, degree_title: e.target.value } : grad,
                                                        ),
                                                    ])
                                                }
                                                disabled={form.processing}
                                                placeholder={`Title/Major ${idx + 1}`}
                                            />
                                            <div className={rowHasError ? 'h-5' : ''}>
                                                <InputError message={getError(`graduates.${idx}.degree_title`)} />
                                            </div>
                                        </div>
                                        <div className="grid w-full max-w-sm items-center gap-2" key={`graduates.${idx}.degree_type`}>
                                            <Label htmlFor={`graduates.${idx}.degree_type`}>Degree - {idx + 1}</Label>
                                            <Select
                                                onValueChange={(value) =>
                                                    form.setData('graduates', [
                                                        ...(form.data.graduates as GraduateProps[]).map((grad, i) =>
                                                            i === idx ? { ...grad, degree_type: Number(value) } : grad,
                                                        ),
                                                    ])
                                                }
                                                defaultValue={g.degree_type !== null ? String(g.degree_type) : undefined}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder={`Degree ${idx + 1}`} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.entries(degree_type).map(([label, id]) => (
                                                        <SelectItem key={`graduates.${idx}.degree_type.${label}`} value={String(id)}>
                                                            {label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <div className={rowHasError ? 'h-5' : ''}>
                                                <InputError message={getError(`graduates.${idx}.degree_type`)} />
                                            </div>
                                        </div>
                                        <div className="grid items-center gap-2" key={`graduates.${idx}.option`}>
                                            <div className="h-4"></div>
                                            {idx === (form.data.graduates ?? []).length - 1 ? (
                                                <Button asChild type="button" variant="ghost" size="icon" className="rounded-full" onClick={addData}>
                                                    <CirclePlus className="h-6 w-6 text-gray-400" />
                                                </Button>
                                            ) : (
                                                <Button
                                                    asChild
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="rounded-full"
                                                    onClick={() => removeData(g.id)}
                                                >
                                                    <Trash2 className="h-6 w-6 text-red-500" />
                                                </Button>
                                            )}
                                            <div className={rowHasError ? 'h-5' : ''}></div>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    );
                }
            })}
        </>
    );
}
