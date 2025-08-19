import InputError from '@/components/input-error';

import { Input } from '@/components/ui/input';
import { RegisterFormProps } from '@/interfaces/shared';
import { InertiaFormProps } from '@inertiajs/react';

export default function FormInput({
    form,
    content,
}: {
    form: InertiaFormProps<Required<RegisterFormProps>>;
    content: Array<keyof RegisterFormProps>;
}) {
    function separateWords(name: string) {
        return name
            .split('_')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
    }

    const inputType: Record<keyof RegisterFormProps, string> = {
        'name': 'text',
        'email': 'email',
        'phone_number': 'text',
        'password': 'password',
        'password_confirmation': 'password',
        'role_id': 'number'
    };

    return (
        <>
            {content.map((c) => {
                return (
                    <div className="grid">
                        <Input
                            id={c}
                            type={inputType[c]}
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete={c}
                            value={form.data[c]}
                            onChange={(e) => form.setData(c, e.target.value)}
                            disabled={form.processing}
                            placeholder={separateWords(c)}
                        />
                        <InputError message={form.errors[c]} />
                    </div>
                );
            })}
        </>
    );
}
