import DetailImage from '@/components/detail-image';
import DetailInput from '@/components/detail-input';
import InputError from '@/components/input-error';
import GraduateForm from '@/components/register/graduate';
import WorkForm from '@/components/register/work';
import { useForm } from '@inertiajs/react';

export default function ProfileTeacherForm({ detail }: any) {
    const form = useForm<any>({
        certificates: detail.certificates?.map((x: any) => x.image) ?? [],
        deleted_certificates: [],
        description: detail.description ?? '',
        graduates:
            detail.graduates.length > 0
                ? detail.graduates.map((x: any) => ({
                      id: crypto.randomUUID(),
                      university_name: x.university_name,
                      degree_title: x.degree_title,
                      degree_type: x.degree_type_id,
                  }))
                : [
                      {
                          id: crypto.randomUUID(),
                          degree_title: '',
                          university_name: '',
                          degree_type: null,
                      },
                  ],
        works:
            detail.work_experiences.length > 0
                ? detail.work_experiences.map((x: any) => ({
                      id: crypto.randomUUID(),
                      duration: x.duration,
                      institution: x.institution,
                      position: x.position,
                  }))
                : [
                      {
                          id: crypto.randomUUID(),
                          duration: 0,
                          institution: '',
                          position: '',
                      },
                  ],
    });

    const getError = (field: string) => form.errors[field];

    const handleCertificatesChange = (files: (File | string)[]) => {
        form.setData('certificates', files);
    };

    const handleRemoveCertificate = (file: File | string) => {
        const updated = form.data.certificates.filter((c: any) => c !== file);

        if (typeof file === 'string') {
            form.setData({
                ...form.data,
                certificates: updated,
                deleted_certificates: [...form.data.deleted_certificates, file],
            });
        } else {
            form.setData('certificates', updated);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.transform((data) => ({
            ...data,
            certificates: data.certificates.filter((c: any) => c instanceof File),
        }));

        form.post(route('teacher.update-detail'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: (page) => {
                const updatedDetail = (page.props as any).detail;
                form.setData({
                    ...form.data,
                    certificates: updatedDetail.certificates?.map((x: any) => x.image) ?? [],
                    deleted_certificates: [],
                });
            },
        });
    };

    return (
        <div className="rounded-2xl border p-6 shadow-sm md:p-8 dark:border-white/20">
            <h3 className="mb-8 text-center text-xl font-semibold text-[#3ABEFF] md:text-2xl">Teacher Information</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <DetailInput
                        type="textarea"
                        id="description"
                        name="description"
                        title="Description"
                        value={form.data.description}
                        onChange={(e) => form.setData('description', e.target.value)}
                    />
                    <InputError message={getError('description')} />
                </div>

                <GraduateForm form={form} />
                <WorkForm form={form} />

                <div>
                    <h4 className="mb-3 font-medium text-gray-800 dark:text-white">Certificates</h4>

                    <DetailImage
                        index={0}
                        name="certificates"
                        multiple
                        images={form.data.certificates}
                        onChange={handleCertificatesChange}
                        onRemove={handleRemoveCertificate}
                    />

                    <InputError message={getError('certificates')} />
                </div>

                <button
                    type="submit"
                    disabled={form.processing}
                    className="w-full rounded-lg bg-[#3ABEFF] py-2.5 font-medium text-white disabled:bg-gray-400"
                >
                    {form.processing ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}
