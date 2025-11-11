import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { TeacherRegisterProps, WorkProps } from '@/interfaces/shared';
import { InertiaFormProps } from '@inertiajs/react';
import { CirclePlus, Trash2 } from 'lucide-react';
import DetailInput from '../detail-input';

export default function WorkForm({ form }: { form: InertiaFormProps<Partial<TeacherRegisterProps>> }) {
    const getError = (field: string) => (form.errors as Record<string, string>)[field];

    const addData = () => {
        form.setData('works', [...((form.data.works as WorkProps[]) ?? []), { id: Date.now(), position: '', institution: '', duration: 0 }]);
    };

    const removeData = (idx: number) => {
        form.setData(
            'works',
            ((form.data.works as WorkProps[]) ?? []).filter((g) => g.id !== idx),
        );
    };

    return (
        <div className="w-full">
            <h3 className="font-medium text-gray-800 mb-5">Work Experience</h3>
            {(form.data.works as WorkProps[])?.map((g, idx) => {
                return (
                    <div key={g.id} className="relative flex items-center gap-4">
                        {(() => {
                            const rowHasError =
                                getError(`works.${idx}.institution`) ||
                                getError(`works.${idx}.position`) ||
                                getError(`works.${idx}.duration`);

                            return (
                                <>
                                    <div className='flex-1 grid md:grid-cols-3 gap-4 mb-2'>
                                        <div className="grid w-full max-w-sm items-center gap-2" key={`works.${idx}.institution`}>
                                            {/* <Label htmlFor={`works.${idx}.institution`}>Company/Institution Name - {idx + 1}</Label> */}
                                            <DetailInput
                                                id={`works.${idx}.institution`}
                                                title={`Company/Institution Name ${idx + 1}`}
                                                name={`Company/Institution Name ${idx + 1}`}
                                                type="text"
                                                tabIndex={1}
                                                value={g.institution}
                                                onChange={(e) =>
                                                    form.setData('works', [
                                                        ...(form.data.works as WorkProps[]).map((grad, i) =>
                                                            i === idx ? { ...grad, institution: e.target.value } : grad,
                                                        ),
                                                    ])
                                                }
                                                disabled={form.processing}
                                            />
                                            <div className={rowHasError ? 'h-5' : ''}>
                                                <InputError message={getError(`works.${idx}.institution`)} />
                                            </div>
                                        </div>
                                        <div className="grid w-full max-w-sm items-center gap-2" key={`works.${idx}.position`}>
                                            {/* <Label htmlFor={`works.${idx}.position`}>Position - {idx + 1}</Label> */}
                                            <DetailInput
                                                id={`works.${idx}.position`}
                                                title={`Position ${idx + 1}`}
                                                name={`Position ${idx + 1}`}
                                                type="text"
                                                tabIndex={1}
                                                value={g.position}
                                                onChange={(e) =>
                                                    form.setData('works', [
                                                        ...(form.data.works as WorkProps[]).map((grad, i) =>
                                                            i === idx ? { ...grad, position: e.target.value } : grad,
                                                        ),
                                                    ])
                                                }
                                                disabled={form.processing}
                                            />
                                            <div className={rowHasError ? 'h-5' : ''}>
                                                <InputError message={getError(`works.${idx}.position`)} />
                                            </div>
                                        </div>
                                        <div className="grid w-full max-w-sm items-center gap-2" key={`works.${idx}.duration`}>
                                            {/* <Label htmlFor={`works.${idx}.duration`}>Duration in month - {idx + 1}</Label> */}
                                            <DetailInput
                                                id={`works.${idx}.duration`}
                                                title={`Duration (Month) ${idx + 1}`}
                                                name={`Duration (Month) ${idx + 1}`}
                                                type="number"
                                                tabIndex={1}
                                                value={g.duration}
                                                min={0}
                                                onChange={(e) =>
                                                    form.setData('works', [
                                                        ...(form.data.works as WorkProps[]).map((grad, i) =>
                                                            i === idx ? { ...grad, duration: e.target.value } : grad,
                                                        ),
                                                    ])
                                                }
                                                disabled={form.processing}
                                            />
                                            <div className={rowHasError ? 'h-5' : ''}>
                                                <InputError message={getError(`works.${idx}.duration`)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2" key={`works.${idx}.option`}>
                                        <div className="h-4"></div>
                                        {idx === (form.data.works ?? []).length - 1 ? (
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
            })}
        </div>
    );
}
