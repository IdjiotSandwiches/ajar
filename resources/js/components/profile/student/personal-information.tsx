import { Form, usePage } from '@inertiajs/react';
import DetailInput from '../../detail-input';

export default function ProfilePersonalForm({ profile }: any) {
    const { errors } = usePage<any>().props;
    return (
        <div className="rounded-2xl border dark:border-white/20 shadow-sm dark:shadow-[#ffffff]/20 p-6 md:p-8">
            <h3 className="mb-8 text-center text-xl font-semibold text-black md:text-xl dark:text-white">Personal Information</h3>
            <Form action={route('update-profile')} method="post" className="flex flex-col gap-4">
                {profile && <input type="hidden" name="_method" value="PUT" />}
                <div>
                    <DetailInput type="text" name="name" id="name" title="Full Name" value={profile?.name} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div>
                    <DetailInput type="number" name="phone_number" id="phone_number" title="Phone Number" value={profile?.phone_number} />
                    {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
                </div>
                <div>
                    <DetailInput type="email" name="email" id="email" title="Email" value={profile?.email} />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="mt-6">
                    <button type="submit" className="w-full rounded-lg bg-[#3ABEFF] py-2.5 font-semibold text-white transition hover:bg-[#3ABEFF]/90">
                        Save Changes
                    </button>
                </div>
            </Form>
        </div>
    );
}
