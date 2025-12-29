import { storageUrl } from '@/utils/storage';
import React, { useEffect, useState } from 'react';

interface DetailImageProps {
    Index: number;
    onFilesChange: (files: File[]) => void;
    onRemove?: (file: File | string) => void;
    productImages?: (File | string)[];
    multiple?: boolean;
    name: string;
}

const DetailImage: React.FC<DetailImageProps> = ({ Index, onFilesChange, onRemove, productImages = [], multiple = true, name }) => {
    const [files, setFiles] = useState<(File | string)[]>(productImages);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    useEffect(() => {
        const urls = (files ?? []).map((img) => {
            if (img instanceof File) return URL.createObjectURL(img);
            if (typeof img === 'string') return storageUrl(img);
            return '';
        });

        setPreviewUrls(urls);

        return () => {
            (files ?? []).forEach((img, i) => {
                if (img instanceof File) URL.revokeObjectURL(urls[i]);
            });
        };
    }, [files]);

    const handleFilesChange = (newFiles: FileList | null) => {
        if (!newFiles) return;
        const selectedFiles = Array.from(newFiles);
        const updatedFiles = multiple ? [...files, ...selectedFiles] : [selectedFiles[selectedFiles.length - 1]];
        setFiles(updatedFiles);
        onFilesChange(selectedFiles);
    };

    const removeFile = (fileToRemove: File | string) => {
        const updatedFiles = files.filter((file) => file !== fileToRemove);
        setFiles(updatedFiles);

        if (onRemove) {
            onRemove(fileToRemove);
        } else {
            onFilesChange(updatedFiles as File[]);
        }
    };

    const inputId = `hidden-input-${Index}`;

    return (
        <div className="my-6 rounded-lg border dark:border-white/20 p-6">
            <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed dark:border-white/20 py-24">
                <input
                    type="file"
                    name={name}
                    id={inputId}
                    {...(multiple ? { multiple: true } : {})}
                    className="hidden"
                    onChange={(e) => handleFilesChange(e.target.files)}
                    accept="image/*"
                />
                <button
                    type="button"
                    onClick={() => document.getElementById(inputId)?.click()}
                    className="rounded-lg bg-[#3ABEFF] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#3ABEFF]/90 focus:ring-4 focus:ring-[#3ABEFF] focus:outline-none"
                >
                    Upload a file
                </button>
            </div>

            <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">To Upload</h3>
                <ul className="mt-4 flex flex-wrap gap-4">
                    {previewUrls.length > 0 ? (
                        previewUrls.map((url, index) => (
                            <li key={index} className="relative h-24 w-24 rounded-md border dark:border-white/20">
                                <img src={url} alt="preview" className="h-full w-full rounded-md object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeFile(files[index])}
                                    className="absolute top-0 right-0 pr-1 text-sm text-red-600"
                                >
                                    &times;
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="text-sm text-gray-500">There is no image!</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default DetailImage;
