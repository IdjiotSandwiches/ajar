import React from 'react';
import DetailImage from '../../detail-image';
import DetailInput from '../../detail-input';
import InputError from '../../input-error';
import GraduateForm from '../../register/graduate';
import WorkForm from '../../register/work';

export default function ProfileTeacherForm({ form }: any) {
    const getError = (field: any) => (form.errors)[field];
    const handleCertificatesChange = (files: File[]) => {
        form.setData('certificates', files);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data:', form.data);
    };

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-8 text-center text-xl font-semibold text-[#42C2FF] md:text-2xl">Teacher Information</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <DetailInput
                        type="textarea"
                        name="description"
                        id="description"
                        title="Description"
                        value={form.data.description ?? ''}
                        onChange={(e) => form.setData('description', e.target.value)}
                    />
                    <div className={getError('description') ? 'h-5' : ''}>
                        <InputError message={getError('description')} />
                    </div>
                </div>
                <GraduateForm form={form} />
                <WorkForm form={form} />
                <div>
                    <h4 className="mb-3 font-medium text-gray-800">Certificates</h4>
                    <DetailImage
                        Index={0}
                        multiple
                        productImages={form.data.certificates ?? []}
                        onFilesChange={handleCertificatesChange}
                        name={'certificates'}
                    />
                </div>
                <div className="mt-6">
                    <button type="submit" className="w-full rounded-lg bg-[#42C2FF] py-2.5 font-medium text-white transition hover:bg-[#42C2FF]/90">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
