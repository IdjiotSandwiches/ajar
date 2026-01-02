import { Form, usePage } from '@inertiajs/react';
import DetailInput from '../../detail-input';

export default function ProfilePersonalForm({ profile }: any) {
    const { errors } = usePage<any>().props;
    return (
        <div className="rounded-2xl border dark:border-white/20 p-6 shadow-sm dark:shadow-white/20 md:p-8">
            <h3 className="mb-8 text-center text-xl font-semibold text-[#3ABEFF] md:text-2xl">Personal Information</h3>
            <Form action={route('institute.update-profile')} method="post" className="flex flex-col gap-4">
                {profile && <input type="hidden" name="_method" value="PUT" />}
                <div>
                    <DetailInput type="text" name="name" id="name" title="Full Name" value={profile?.user?.name} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div>
                    <DetailInput
                        type="text"
                        name="instagram"
                        id="insta_link"
                        title="Instagram Link"
                        value={profile?.user?.social_medias?.find((x: any) => x.social_media_type?.name === 'Instagram')?.url}
                    />
                    {errors.instagram && <p className="text-red-500 text-sm">{errors.instagram}</p>}
                </div>
                <div>
                    <DetailInput
                        type="text"
                        name="linkedin"
                        id="linkedin_link"
                        title="LinkedIn Link"
                        value={profile?.user?.social_medias?.find((x: any) => x.social_media_type?.name === 'LinkedIn')?.url}
                    />
                    {errors.linkedin && <p className="text-red-500 text-sm">{errors.linkedin}</p>}
                </div>
                <div>
                    <DetailInput
                        type="text"
                        name="github"
                        id="github_link"
                        title="Github Link"
                        value={profile?.user?.social_medias?.find((x: any) => x.social_media_type?.name === 'Github')?.url}
                    />
                    {errors.github && <p className="text-red-500 text-sm">{errors.github}</p>}
                </div>
                <div>
                    <DetailInput type="text" name="website" id="website_link" title="Website Link" value={profile?.website} />
                    {errors.website && <p className="text-red-500 text-sm">{errors.website}</p>}
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
