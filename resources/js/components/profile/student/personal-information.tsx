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
        <div className="bg-white shadow-sm rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-center text-[#42C2FF] mb-8">
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
                        type="number"
                        name="phone_number"
                        id="phone_number"
                        title="Phone Number"
                        value={form.data.phone_number ?? ""}
                        onChange={(e) => form.setData("phone_number", e.target.value)}
                    />
                    <div className={getError("phone_number") ? "h-5" : ""}>
                        <InputError message={getError("phone_number")} />
                    </div>
                </div>
                <div>
                    <DetailInput
                        type="email"
                        name="email"
                        id="email"
                        title="Email"
                        value={form.data.email ?? ""}
                        onChange={(e) => form.setData("email", e.target.value)}
                    />
                    <div className={getError("email") ? "h-5" : ""}>
                        <InputError message={getError("email")} />
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
