import { Form, usePage } from '@inertiajs/react';
import DetailInput from '../../detail-input';

export default function ProfilePersonalForm({ profile }: any) {
    const { errors } = usePage<any>().props;
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-8 text-center text-xl font-semibold text-[#42C2FF] md:text-2xl">Personal Information</h3>
            <Form action={route('update-profile')} method="post" className="flex flex-col gap-4">
                {profile && <input type="hidden" name="_method" value="PUT" />}
                <div>
                    <DetailInput type="text" name="name" id="name" title="Full Name" value={profile?.name} />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div>
                    <DetailInput type="number" name="phone_number" id="phone_number" title="Phone Number" value={profile?.phone_number} />
                    {errors.phone_number && <p className="text-red-500">{errors.phone_number}</p>}
                </div>
                <div>
                    <DetailInput type="email" name="email" id="email" title="Email" value={profile?.email} />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                <div className="mt-6">
                    <button type="submit" className="w-full rounded-lg bg-[#42C2FF] py-2.5 font-semibold text-white transition hover:bg-[#42C2FF]/90">
                        Save Changes
                    </button>
                </div>
            </Form>
        </div>
    );
}
