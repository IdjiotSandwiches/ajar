import { Form, usePage } from '@inertiajs/react';
import DetailInput from '../../detail-input';

export default function ProfilePersonalForm({ profile }: any) {
    const { errors } = usePage<any>().props;
    return (
        <div className="rounded-2xl border dark:border-white/20 dark:shadow-[#ffffff]/20 p-6 shadow-sm md:p-8">
            <h3 className="mb-8 text-center text-xl font-semibold text-[#3ABEFF] md:text-2xl">Personal Information</h3>
            <Form action={route('teacher.update-profile')} method="post" className="flex flex-col gap-4">
                {profile && <input type="hidden" name="_method" value="PUT" />}
                <div>
                    <DetailInput type="text" name="name" id="name" title="Full Name" value={profile?.user?.name} />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div>
                    <DetailInput type="number" name="phone_number" id="phone_number" title="Phone Number" value={profile?.user?.phone_number} />
                    {errors.phone_number && <p className="text-red-500">{errors.phone_number}</p>}
                </div>
                <div>
                    <DetailInput type="email" name="email" id="email" title="Email" value={profile?.user?.email} />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                <div>
                    <DetailInput
                        type="text"
                        name="instagram"
                        id="insta_link"
                        title="Instagram Link"
                        value={profile?.user?.social_medias?.find((x: any) => x.social_media_type?.name === 'Instagram')?.url}
                    />
                    {errors.instagram && <p className="text-red-500">{errors.instagram}</p>}
                </div>
                <div>
                    <DetailInput
                        type="text"
                        name="linkedin"
                        id="linkedin_link"
                        title="LinkedIn Link"
                        value={profile?.user?.social_medias?.find((x: any) => x.social_media_type?.name === 'LinkedIn')?.url}
                    />
                    {errors.linkedin && <p className="text-red-500">{errors.linkedin}</p>}
                </div>
                <div>
                    <DetailInput
                        type="text"
                        name="github"
                        id="github_link"
                        title="Github Link"
                        value={profile?.user?.social_medias?.find((x: any) => x.social_media_type?.name === 'Github')?.url}
                    />
                    {errors.github && <p className="text-red-500">{errors.github}</p>}
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
