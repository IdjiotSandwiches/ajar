import InputError from '@/components/input-error';

import { Input } from '@/components/ui/input';
import { RegisterFormProps } from '@/interfaces/shared';
import { InertiaFormProps } from '@inertiajs/react';
import { RefObject, useEffect } from 'react';

export default function FormInput({
    form,
    content,
    firstInputRef,
}: {
    form: InertiaFormProps<Partial<RegisterFormProps>>;
    content: Array<keyof RegisterFormProps>;
    firstInputRef?: RefObject<HTMLInputElement | null>;
}) {
    function separateWords(name: string) {
        return name
            .split('_')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
    }

    const inputType: Record<keyof RegisterFormProps, string | undefined> = {
        'name': 'text',
        'email': 'email',
        'phone_number': 'text',
        'password': 'password',
        'password_confirmation': 'password',
        'role_id': undefined
    };

    useEffect(() => {
        if (firstInputRef?.current) {
            firstInputRef.current.focus();
        }
    }, [content]);

    return (
        <>
            {content.map((c, idx) => {
                return (
                    <div className="grid" key={idx}>
                        <Input
                            // ref={idx === 0 ? firstInputRef : undefined} 
                            id={c}
                            type={inputType[c]}
                            required
                            // autoFocus
                            label={separateWords(c)}
                            name={c}
                            tabIndex={1}
                            autoComplete={c}
                            value={form.data[c]}
                            onChange={(e) => form.setData(c, e.target.value)}
                            disabled={form.processing}
                            // placeholder={separateWords(c)}
                        />
                        <InputError message={form.errors[c]} />
                    </div>
                );
            })}
        </>
    );
}
