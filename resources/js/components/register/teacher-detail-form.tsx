import DetailImage from '../detail-image';
import DetailInput from '../detail-input';
import InputError from '../input-error';
import GraduateForm from './graduate';
import WorkForm from './work';

export default function TeacherDetailForm({ form, categories }: any) {
    const getError = (field: any) => form.errors[field];
    const handleCertificatesChange = (files: File[]) => {
        form.setData('certificates', files);
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
                <h3 className="mb-3 font-medium text-gray-800">Certificates</h3>
                <DetailImage
                    Index={0}
                    multiple={true}
                    productImages={form.data.certificates ?? []}
                    onFilesChange={handleCertificatesChange}
                    name={'certificates'}
                />
            </div>
        </div>
    );
}
