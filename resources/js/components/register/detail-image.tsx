import React, { useEffect, useState } from "react";

interface DetailImageProps {
  Index: number;
  onFilesChange: (files: File[]) => void;
  productImages?: (File | string)[];
  multiple?: boolean;
}

const DetailImage: React.FC<DetailImageProps> = ({
  Index,
  onFilesChange,
  productImages = [],
  multiple = true,
}) => {
  const [files, setFiles] = useState<(File | string)[]>(productImages);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    setFiles(productImages);
  }, [productImages]);

  useEffect(() => {
    const urls = (files ?? []).map((img) => {
      if (img instanceof File) return URL.createObjectURL(img);
      if (typeof img === "string") return img;
      return "";
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
    const updatedFiles = multiple
      ? [...files, ...selectedFiles]
      : [selectedFiles[selectedFiles.length - 1]];
    setFiles(updatedFiles);
    onFilesChange(selectedFiles);
  };

  const removeFile = (fileToRemove: File | string) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
  };

  const inputId = `hidden-input-${Index}`;

  return (
    <div className="p-6 border rounded-lg my-6">
      <div className="border-dashed border-2 border-gray-400 py-24 flex flex-col justify-center items-center rounded-md">
        <input
          type="file"
          id={inputId}
          {...(multiple ? { multiple: true } : {})}
          className="hidden"
          onChange={(e) => handleFilesChange(e.target.files)}
          accept="image/*"
        />
        <button
          type="button"
          onClick={() => document.getElementById(inputId)?.click()}
          className="text-white bg-[#3ABEFF] hover:bg-[#3ABEFF]/90 focus:ring-4 focus:outline-none focus:ring-[#3ABEFF] font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Upload a file
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-900">To Upload</h3>
        <ul className="flex flex-wrap mt-4 gap-4">
          {previewUrls.length > 0 ? (
            previewUrls.map((url, index) => (
              <li key={index} className="relative w-24 h-24 border rounded-md">
                <img
                  src={url}
                  alt="preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeFile(files[index])}
                  className="absolute top-0 right-0 text-red-600 text-sm"
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
