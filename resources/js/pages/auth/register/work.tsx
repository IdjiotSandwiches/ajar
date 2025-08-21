import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TeacherRegisterProps, WorkProps } from '@/interfaces/shared';
import { InertiaFormProps } from '@inertiajs/react';
import { CirclePlus, Trash2 } from 'lucide-react';

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
        <>
            {(form.data.works as WorkProps[])?.map((g, idx) => {
                return (
                    <div key={g.id} className="flex gap-4">
                        {(() => {
                            const rowHasError =
                                getError(`works.${idx}.institution`) ||
                                getError(`works.${idx}.position`) ||
                                getError(`works.${idx}.duration`);

                            return (
                                <>
                                    <div className="grid w-full max-w-sm items-center gap-2" key={`works.${idx}.institution`}>
                                        <Label htmlFor={`works.${idx}.institution`}>Company/Institutiion Name - {idx + 1}</Label>
                                        <Input
                                            id={`works.${idx}.institution`}
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="institution"
                                            value={g.institution}
                                            onChange={(e) =>
                                                form.setData('works', [
                                                    ...(form.data.works as WorkProps[]).map((grad, i) =>
                                                        i === idx ? { ...grad, institution: e.target.value } : grad,
                                                    ),
                                                ])
                                            }
                                            disabled={form.processing}
                                            placeholder={`Company/Institutiion Name ${idx + 1}`}
                                        />
                                        <div className={rowHasError ? 'h-5' : ''}>
                                            <InputError message={getError(`works.${idx}.institution`)} />
                                        </div>
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-2" key={`works.${idx}.position`}>
                                        <Label htmlFor={`works.${idx}.position`}>Position - {idx + 1}</Label>
                                        <Input
                                            id={`works.${idx}.position`}
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="position"
                                            value={g.position}
                                            onChange={(e) =>
                                                form.setData('works', [
                                                    ...(form.data.works as WorkProps[]).map((grad, i) =>
                                                        i === idx ? { ...grad, position: e.target.value } : grad,
                                                    ),
                                                ])
                                            }
                                            disabled={form.processing}
                                            placeholder={`Position ${idx + 1}`}
                                        />
                                        <div className={rowHasError ? 'h-5' : ''}>
                                            <InputError message={getError(`works.${idx}.position`)} />
                                        </div>
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-2" key={`works.${idx}.duration`}>
                                        <Label htmlFor={`works.${idx}.duration`}>Duration in month - {idx + 1}</Label>
                                        <Input
                                            id={`works.${idx}.duration`}
                                            type="number"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="duration"
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
                                            placeholder={`Duration ${idx + 1}`}
                                        />
                                        <div className={rowHasError ? 'h-5' : ''}>
                                            <InputError message={getError(`works.${idx}.duration`)} />
                                        </div>
                                    </div>
                                    <div className="grid items-center gap-2" key={`works.${idx}.option`}>
                                        <div className="h-4"></div>
                                        {idx === (form.data.works ?? []).length - 1 ? (
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
            })}
        </>
    );
}
