import React from "react";
import { InertiaFormProps } from "@inertiajs/react";
import InputError from "@/components/input-error";
import DetailInput from "../../detail-input";

interface ProfilePersonalFormProps {
    form: InertiaFormProps<any>;
}

const ProfilePersonalForm: React.FC<ProfilePersonalFormProps> = ({ form }) => {
    const getError = (field: string) => (form.errors as Record<string, string>)[field];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form data:", form.data);
        // form.post(route("profile.personal.update"));
    };

    return (
        <div className="bg-white shadow-sm rounded-2xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-semibold text-center text-[#42C2FF] mb-8">
                Personal Information
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <DetailInput
                        type="text"
                        name="name"
                        id="name"
                        title="Full Name"
                        value={form.data.name ?? ""}
                        onChange={(e) => form.setData("name", e.target.value)}
                    />
                    <div className={getError("name") ? "h-5" : ""}>
                        <InputError message={getError("name")} />
                    </div>
                </div>
                <div>
                    <DetailInput
                        type="text"
                        name="insta_link"
                        id="insta_link"
                        title="Instagram Link"
                        value={form.data.insta_link ?? ""}
                        onChange={(e) => form.setData("insta_link", e.target.value)}
                    />
                    <div className={getError("insta_link") ? "h-5" : ""}>
                        <InputError message={getError("insta_link")} />
                    </div>
                </div>
                <div>
                    <DetailInput
                        type="text"
                        name="linkedin_link"
                        id="linkedin_link"
                        title="LinkedIn Link"
                        value={form.data.insta_link ?? ""}
                        onChange={(e) => form.setData("linkedin_link", e.target.value)}
                    />
                    <div className={getError("linkedin_link") ? "h-5" : ""}>
                        <InputError message={getError("linkedin_link")} />
                    </div>
                </div>
                <div>
                    <DetailInput
                        type="text"
                        name="github_link"
                        id="github_link"
                        title="Github Link"
                        value={form.data.insta_link ?? ""}
                        onChange={(e) => form.setData("github_link", e.target.value)}
                    />
                    <div className={getError("github_link") ? "h-5" : ""}>
                        <InputError message={getError("github_link")} />
                    </div>
                </div>
                <div>
                    <DetailInput
                        type="text"
                        name="website_link"
                        id="website_link"
                        title="Website Link"
                        value={form.data.website_link ?? ""}
                        onChange={(e) => form.setData("website_link", e.target.value)}
                    />
                    <div className={getError("website_link") ? "h-5" : ""}>
                        <InputError message={getError("website_link")} />
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-[#42C2FF] hover:bg-[#42C2FF]/90 text-white font-semibold py-2.5 rounded-lg transition"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfilePersonalForm;
