import { storageUrl } from '@/utils/storage';
import { useEffect, useRef, useState } from 'react';

interface Props {
    index: number;
    name: string;
    images: (File | string)[];
    multiple?: boolean;
    onChange: (files: (File | string)[]) => void;
    onRemove?: (file: File | string) => void;
}

export default function DetailImage({ index, name, images, multiple = true, onChange, onRemove }: Props) {
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const urls = images.map((img) => (img instanceof File ? URL.createObjectURL(img) : storageUrl(img)));

        setPreviews(urls);

        return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [images]);

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;

        const selected = Array.from(files);
        const newFiles = selected.filter((file) => !images.some((img) => img instanceof File && img.name === file.name && img.size === file.size));

        const updated = multiple ? [...images, ...newFiles] : [selected.at(-1)!];
        onChange(updated);


        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const remove = (file: File | string) => {
        onRemove?.(file);
    };

    const inputId = `file-input-${index}`;

    return (
        <div className="my-6 rounded-lg border p-6 dark:border-white/20">
            <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed py-24 dark:border-white/20">
                <input
                    ref={fileInputRef}
                    type="file"
                    name={name}
                    id={inputId}
                    multiple={multiple}
                    hidden
                    onChange={(e) => handleFileSelect(e.target.files)}
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
                    {previews.length > 0 ? (
                        previews.map((src, i) => (
                            <li key={i} className="relative h-24 w-24">
                                <img src={src} className="h-full w-full rounded object-cover" />
                                <button type="button" onClick={() => remove(images[i])} className="absolute top-0 right-0 text-red-600">
                                    &times;
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="text-sm text-gray-500">No images uploaded</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
