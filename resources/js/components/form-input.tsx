import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';

export default function FormInput({ form, content }: any) {
    function separateWords(name: string) {
        return name
            .split('_')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
    }

    const inputType: Record<string, string | undefined> = {
        name: 'text',
        email: 'email',
        phone_number: 'text',
        password: 'password',
        password_confirmation: 'password',
        role_id: undefined,
    };

    return (
        <>
            {content.map((c: any, idx: number) => {
                return (
                    <div className="grid" key={idx}>
                        <Input
                            id={c}
                            type={inputType[c]}
                            required
                            label={separateWords(c)}
                            name={c}
                            tabIndex={1}
                            autoComplete={c}
                            value={form.data[c]}
                            onChange={(e) => form.setData(c, e.target.value)}
                            disabled={form.processing}
                        />
                        <InputError message={form.errors[c]} />
                    </div>
                );
            })}
        </>
    );
}
