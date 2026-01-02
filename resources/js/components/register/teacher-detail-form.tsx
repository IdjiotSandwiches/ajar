import DetailImage from '../detail-image';
import DetailInput from '../detail-input';
import InputError from '../input-error';
import GraduateForm from './graduate';
import WorkForm from './work';

export default function TeacherDetailForm({ form }: any) {
    const getError = (field: any) => form.errors[field];
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

    return (
        <div className="flex flex-col gap-6">
            <div>
                <DetailInput
                    type="textarea"
                    name="description"
                    id="description"
                    title="Description"
                    value={form.data.description ?? ''}
                    onChange={(e) => form.setData('description', e.target.value)}
                />
                <div className={getError(`description`) ? 'h-5' : ''}>
                    <InputError message={getError(`description`)} />
                </div>
            </div>
            <GraduateForm form={form} />
            <WorkForm form={form} />
            <div>
                <h3 className="mb-3 font-medium text-gray-800 dark:text-white">Certificates</h3>
                <DetailImage
                    index={0}
                    multiple={true}
                    images={form.data.certificates ?? []}
                    onChange={handleCertificatesChange}
                    onRemove={handleRemoveCertificate}
                    name={'certificates'}
                />
                <div className={getError(`certificates`) ? 'h-5' : ''}>
                    <InputError message={getError(`certificates`)} />
                </div>
            </div>
        </div>
    );
}
