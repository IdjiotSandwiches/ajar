import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';
import { CirclePlus, Trash2 } from 'lucide-react';
import DetailInput from '../detail-input';
import DetailSelect from '../detail-select';

export default function GraduateForm({ form }: any) {
    const { props } = usePage();
    const degree_type = props.enums?.degree_type_enum;

    const getError = (field: string) => form.errors[field];
    const addData = () => {
        form.setData('graduates', [...(form.data.graduates ?? []), { id: Date.now(), degree_title: '', degree_type: null, university_name: '' }]);
    };

    const removeData = (idx: number) => {
        form.setData(
            'graduates',
            (form.data.graduates ?? []).filter((g: any) => g.id !== idx),
        );
    };

    return (
        <div className="w-full">
            <h3 className="mb-5 font-medium text-gray-800">Graduate</h3>
            {form.data.graduates?.map((g: any, idx: number) => {
                {
                    return (
                        <div key={g.id} className="relative flex items-center gap-4">
                            {(() => {
                                const rowHasError =
                                    getError(`graduates.${idx}.university_name`) ||
                                    getError(`graduates.${idx}.degree_title`) ||
                                    getError(`graduates.${idx}.degree_type`);

                                return (
                                    <>
                                        <div className="mb-2 grid flex-1 gap-4 md:grid-cols-3">
                                            <div className="grid w-full max-w-sm items-center gap-2" key={`graduates.${idx}.university_name`}>
                                                {/* <Label htmlFor={`graduates.${idx}.university_name`}>Educational Institution {idx + 1}</Label> */}
                                                <DetailInput
                                                    id={`graduates.${idx}.university_name`}
                                                    title={`Educational Institution ${idx + 1}`}
                                                    name={`Educational Institution ${idx + 1}`}
                                                    type="text"
                                                    tabIndex={1}
                                                    value={g.university_name}
                                                    onChange={(e) =>
                                                        form.setData('graduates', [
                                                            ...form.data.graduates.map((grad: any, i: number) =>
                                                                i === idx ? { ...grad, university_name: e.target.value } : grad,
                                                            ),
                                                        ])
                                                    }
                                                    disabled={form.processing}
                                                />
                                                <div className={rowHasError ? 'h-5' : ''}>
                                                    <InputError message={getError(`graduates.${idx}.university_name`)} />
                                                </div>
                                            </div>
                                            <div className="grid w-full max-w-sm items-center gap-2" key={`graduates.${idx}.degree_title`}>
                                                {/* <Label htmlFor={`graduates.${idx}.degree_title`}>Title/Major - {idx + 1}</Label> */}
                                                <DetailInput
                                                    id={`graduates.${idx}.degree_title`}
                                                    title={`Title/Major ${idx + 1}`}
                                                    name={`Title/Major ${idx + 1}`}
                                                    type="text"
                                                    tabIndex={1}
                                                    value={g.degree_title}
                                                    onChange={(e) => {
                                                        form.setData('graduates', [
                                                            ...form.data.graduates.map((grad: any, i: number) =>
                                                                i === idx ? { ...grad, degree_title: e.target.value } : grad,
                                                            ),
                                                        ]);
                                                    }}
                                                    disabled={form.processing}
                                                />
                                                <div className={rowHasError ? 'h-5' : ''}>
                                                    <InputError message={getError(`graduates.${idx}.degree_title`)} />
                                                </div>
                                            </div>
                                            <div className="grid w-full max-w-sm items-center gap-2" key={`graduates.${idx}.degree_type`}>
                                                <DetailSelect
                                                    id={`graduates.${idx}.degree_type`}
                                                    name={`graduates.${idx}.degree_type`}
                                                    title={`Degree ${idx + 1}`}
                                                    value={g.degree_type !== null ? String(g.degree_type) : ''}
                                                    onChange={(val) =>
                                                        form.setData('graduates', [
                                                            ...form.data.graduates.map((grad: any, i: number) =>
                                                                i === idx ? { ...grad, degree_type: Number(val) } : grad,
                                                            ),
                                                        ])
                                                    }
                                                    options={Object.entries(degree_type).map(([label, id]) => ({
                                                        label,
                                                        value: id as string | number,
                                                    }))}
                                                    disabled={form.processing}
                                                />
                                                <div className={rowHasError ? 'h-5' : ''}>
                                                    <InputError message={getError(`graduates.${idx}.degree_type`)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2" key={`graduates.${idx}.option`}>
                                            <div className="h-4"></div>
                                            {idx === (form.data.graduates ?? []).length - 1 ? (
                                                <Button asChild type="button" variant="ghost" size="icon" className="rounded-full" onClick={addData}>
                                                    <CirclePlus className="h-6 w-6 text-gray-500 hover:text-[#3ABEFF]" />
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
                                                    <Trash2 className="h-6 w-6 text-gray-500 hover:text-red-500" />
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
        </div>
    );
}
