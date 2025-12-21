import DetailInput from '@/components/detail-input';
import LMSLayout from '@/layouts/lms-layout';
import { Form, usePage } from '@inertiajs/react';
import React from 'react';

export default function InstituteForm({ categories, errors }: any) {
    const { props } = usePage();
    const roles = props.enums?.roles_enum;

    const handleBack = () => {
        window.history.back();
    };

    return (
        <>
            <div className="flex min-h-screen flex-col gap-6">
                <h1 className="hidden text-2xl font-semibold text-gray-800 md:flex">Create Institute</h1>
                <div className="rounded-2xl bg-white p-8 shadow-sm">
                    <Form method="post" action={route('admin.register-institute')} className="flex flex-col gap-4">
                        <input type="hidden" name="role_id" value={roles.Institute} />

                        {/* ================= NAME ================= */}
                        <DetailInput title="Institute Name" name="name" id="name" type="text" />
                        {errors?.name && <p className="text-red-500">{errors.name}</p>}

                        {/* ================= CATEGORY ================= */}
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-800">Institute Category</p>
                            <div className="flex gap-6">
                                {categories.map((category: any, index: number) => {
                                    return (
                                        <label key={index} className="flex cursor-pointer items-center gap-2">
                                            <input type="radio" name="category" value={category.id} className="accent-[#42C2FF]" />
                                            <span className="text-sm text-gray-700">{category.name}</span>
                                        </label>
                                    );
                                })}
                            </div>
                            {errors?.category && <p className="mt-1 text-red-500">{errors.category}</p>}
                        </div>

                        {/* ================= EMAIL ================= */}
                        <DetailInput title="Email" name="email" id="email" type="email" />
                        {errors?.email && <p className="text-red-500">{errors.email}</p>}

                        <DetailInput title="Phone Number" name="phone_number" id="phone_number" type="text" />
                        {errors?.email && <p className="text-red-500">{errors.phone_number}</p>}

                        {/* ================= PASSWORD ================= */}
                        <DetailInput title="Password" name="password" id="password" type="password" />
                        {errors?.password && <p className="text-red-500">{errors.password}</p>}

                        <div className="flex justify-end gap-2 pt-4">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="rounded-lg bg-black/80 px-6 py-2 font-semibold text-white hover:bg-black/70"
                            >
                                Back
                            </button>
                            <button type="submit" className="rounded-lg bg-[#42C2FF] px-6 py-2 font-semibold text-white hover:bg-[#42C2FF]/90">
                                Submit
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}

InstituteForm.layout = (page: React.ReactNode) => <LMSLayout title="Register Institute">{page}</LMSLayout>;
