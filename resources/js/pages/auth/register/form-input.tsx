import InputError from '@/components/input-error';

import { Input } from '@/components/ui/input';
import { RegisterFormProps } from '@/interfaces/shared';
import { InertiaFormProps } from '@inertiajs/react';

interface FormInputProps {
    setIsFilled: React.Dispatch<React.SetStateAction<Boolean>>;
}

export default function FormInput({
    form,
    content,
}: {
    form: InertiaFormProps<Partial<RegisterFormProps>>;
    content: Array<keyof RegisterFormProps>;
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

    return (
        <>
            {content.map((c, idx) => {
                return (
                    <div className="grid" key={idx}>
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
