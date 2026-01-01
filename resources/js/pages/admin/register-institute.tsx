import DetailInput from '@/components/detail-input';
import DynamicModal from '@/components/modal/modal';
import LMSLayout from '@/layouts/lms-layout';
import { Form, usePage } from '@inertiajs/react';
import React, { useRef, useState } from 'react';

export default function InstituteForm({ categories, errors }: any) {
    const { props } = usePage();
    const roles = props.enums?.roles_enum;

    const [showApplyModal, setShowApplyModal] = useState(false);
    const formRef = useRef<any>(null);

    const handleBack = () => {
        window.history.back();
    };

    const handleConfirmSubmit = () => {
        formRef.current?.submit();
        setShowApplyModal(false);
    };

    return (
        <>
            <div className="flex min-h-screen flex-col gap-6">
                <div className="rounded-2xl border dark:border-white/20 p-8 shadow-sm">
                    <Form
                        method="post"
                        action={route('admin.register-institute')}
                        className="flex flex-col gap-4"
                        ref={formRef}
                    >
                        <input type="hidden" name="role_id" value={roles.Institute} />

                        <DetailInput title="Institute Name" name="name" id="name" type="text" />
                        {errors?.name && <p className="text-red-500">{errors.name}</p>}

                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-800 dark:text-white">Institute Category</p>
                            <div className="flex gap-6">
                                {categories.map((category: any, index: number) => {
                                    return (
                                        <label key={index} className="flex cursor-pointer items-center gap-2">
                                            <input type="radio" name="category" value={category.id} className="accent-[#3ABEFF]" />
                                            <span className="text-sm text-gray-700 dark:text-white/80">{category.name}</span>
                                        </label>
                                    );
                                })}
                            </div>
                            {errors?.category && <p className="mt-1 text-red-500">{errors.category}</p>}
                        </div>

                        <DetailInput title="Email" name="email" id="email" type="email" />
                        {errors?.email && <p className="text-red-500">{errors.email}</p>}

                        <DetailInput title="Phone Number" name="phone_number" id="phone_number" type="text" />
                        {errors?.email && <p className="text-red-500">{errors.phone_number}</p>}

                        <DetailInput title="Password" name="password" id="password" type="password" />
                        {errors?.password && <p className="text-red-500">{errors.password}</p>}

                        <div className="flex justify-end gap-2 pt-4">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="rounded-lg bg-black/80 px-6 py-2 font-semibold text-white hover:bg-black/70 dark:bg-gray-700 dark:hover:bg-gray-600"
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowApplyModal(true)}
                                className="rounded-lg bg-[#3ABEFF] px-6 py-2 font-semibold text-white hover:bg-[#3ABEFF]/90">
                                Submit
                            </button>
                        </div>
                    </Form>
                </div>
            </div>

            <DynamicModal
                type="confirmation"
                isOpen={showApplyModal}
                onClose={() => setShowApplyModal(false)}
                onConfirm={handleConfirmSubmit}
                description={`Are you sure you want to update your availability? This will affect your schedule starting next week.`}
            />
        </>
    );
}

InstituteForm.layout = (page: React.ReactNode) => <LMSLayout title="Register Institute">{page}</LMSLayout>;
