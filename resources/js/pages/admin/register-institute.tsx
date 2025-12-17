
import DetailInput from '@/components/detail-input';
import LMSLayout from '@/layouts/lms-layout';
import { Form, Head } from '@inertiajs/react';
import React, { useState } from 'react';

export default function InstituteForm({ institute, errors }: any) {
    const [category, setCategory] = useState(
        institute?.category || 'technology',
    );

    const handleBack = () => {
        window.history.back();
    };

    return (
        <>
            <Head title={institute ? 'Edit Institute' : 'Create Institute'} />

            <div className="flex min-h-screen flex-col gap-6">
                <h1 className="hidden md:flex text-2xl font-semibold text-gray-800">
                    {institute ? 'Edit Institute' : 'Create Institute'}
                </h1>

                <div className="rounded-2xl bg-white p-8 shadow-sm">
                    <Form
                        method="post"
                        // action={
                        //     institute
                        //         ? route('institute.update', institute.id)
                        //         : route('institute.store')
                        // }
                        className="flex flex-col gap-4"
                    >
                        {institute && (
                            <input type="hidden" name="_method" value="PUT" />
                        )}

                        {/* ================= NAME ================= */}
                        <DetailInput
                            title="Institute Name"
                            name="name"
                            id="name"
                            type="text"
                            value={institute?.name}
                        />
                        {errors?.name && (
                            <p className="text-red-500">{errors.name}</p>
                        )}

                                                {/* ================= CATEGORY ================= */}
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-800">
                                Institute Category
                            </p>
                            <div className="flex gap-6">
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="category"
                                        value="technology"
                                        checked={category === 'technology'}
                                        onChange={() =>
                                            setCategory('technology')
                                        }
                                        className="accent-[#42C2FF]"
                                    />
                                    <span className="text-sm text-gray-700">
                                        Technology
                                    </span>
                                </label>

                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="category"
                                        value="design"
                                        checked={category === 'design'}
                                        onChange={() => setCategory('design')}
                                        className="accent-[#42C2FF]"
                                    />
                                    <span className="text-sm text-gray-700">
                                        Design
                                    </span>
                                </label>
                            </div>
                            {errors?.category && (
                                <p className="mt-1 text-red-500">
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        {/* ================= EMAIL ================= */}
                        <DetailInput
                            title="Email"
                            name="email"
                            id="email"
                            type="email"
                            value={institute?.email}
                        />
                        {errors?.email && (
                            <p className="text-red-500">{errors.email}</p>
                        )}

                        {/* ================= PASSWORD ================= */}
                        <DetailInput
                            title="Password"
                            name="password"
                            id="password"
                            type="password"
                        />
                        {errors?.password && (
                            <p className="text-red-500">{errors.password}</p>
                        )}

                        {/* ================= ACTION ================= */}
                        <div className="flex justify-end gap-2 pt-4">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="rounded-lg bg-black/80 px-6 py-2 font-semibold text-white hover:bg-black/70"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="rounded-lg bg-[#42C2FF] px-6 py-2 font-semibold text-white hover:bg-[#42C2FF]/90"
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}

InstituteForm.layout = (page: React.ReactNode) => (
    <LMSLayout title="Institute">{page}</LMSLayout>
);
