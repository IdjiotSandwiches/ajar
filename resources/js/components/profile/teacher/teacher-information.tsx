import DetailImage from '@/components/detail-image';
import DetailInput from '@/components/detail-input';
import InputError from '@/components/input-error';
import GraduateForm from '@/components/register/graduate';
import WorkForm from '@/components/register/work';
import { useForm } from '@inertiajs/react';

export default function ProfileTeacherForm({ detail }: any) {
    const form = useForm<any>({
        certificates: detail.certificates.map((x: any) => x.image) ?? [],
        description: detail.description ?? '',
        graduates:
            detail.graduates.length > 0
                ? detail.graduates.map((x: any) => ({
                      id: Date.now(),
                      university_name: x.university_name,
                      degree_title: x.degree_title,
                      degree_type: x.degree_type_id,
                  }))
                : [{ id: Date.now(), degree_title: '', university_name: '', degree_type: null }],
        works:
            detail.work_experiences.length > 0
                ? detail.work_experiences.map((x: any) => ({
                    id: Date.now(),
                    duration: x.duration,
                    institution: x.institution,
                    position: x.position
                }))
                : [{ id: Date.now(), duration: 0, institution: '', position: '' }],
        deleted_certificates: [],
    });

    const getError = (field: any) => form.errors[field];
    const handleCertificatesChange = (files: File[]) => {
        form.setData('certificates', files);
    };

    const handleRemoveCertificate = (fileToRemove: File | string) => {
        const updatedCertificates = form.data.certificates.filter((c: File | string) => c !== fileToRemove);
        if (typeof fileToRemove === 'string') {
            form.setData({
                ...form.data,
                certificates: updatedCertificates,
                deleted_certificates: [...form.data.deleted_certificates, fileToRemove],
            });
        } else {
            form.setData('certificates', updatedCertificates);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route('teacher.update-detail'), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <div className="rounded-2xl border dark:border-white/20 dark:shadow-[#ffffff]/20 p-6 shadow-sm md:p-8">
            <h3 className="mb-8 text-center text-xl font-semibold text-[#3ABEFF] md:text-2xl">Teacher Information</h3>
            {detail && (
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
                            onRemove={handleRemoveCertificate}
                            name={'certificates'}
                        />
                        <InputError message={getError('certificates')} />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#3ABEFF] py-2.5 font-medium text-white transition hover:bg-[#3ABEFF]/90"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
