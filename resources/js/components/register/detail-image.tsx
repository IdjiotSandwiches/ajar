import React, { useEffect, useState } from "react";

interface DetailImageProps {
  Index: number;
  onFilesChange: (files: File[]) => void;
  productImages?: File[];
  multiple?: boolean;
}

const DetailImage: React.FC<DetailImageProps> = ({
  Index,
  onFilesChange,
  productImages = [],
  multiple = true
}) => {
  const [files, setFiles] = useState<File[]>(productImages);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  useEffect(() => {
    const currentNames = (productImages ?? []).map((f) => f.name).join(",");
    const newNames = files.map((f) => f.name).join(",");

    if (currentNames !== newNames) {
      onFilesChange(files);
    }
  }, [files]);

  const handleFilesChange = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const selectedFiles = Array.from(newFiles);

    let updatedFiles: File[];

    if (multiple) { 
      updatedFiles = [...files, ...selectedFiles].filter(
        (file, index, self) =>
          index === self.findIndex((f) => f.name === file.name)
      );
    } else {
      updatedFiles = [selectedFiles[selectedFiles.length - 1]];
    }

    setFiles(updatedFiles);
  };

  const removeFile = (fileToRemove: File) => {
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
        <h3 className="font-semibold text-gray-900">To Upload</h3>
        <ul className="flex flex-wrap mt-4 gap-4">
          {files.length > 0 ? (
            files.map((file, index) => (
              <li
                key={index}
                className="relative w-24 h-24 border bg-gray-100 rounded-md flex items-center justify-center"
              >
                <img
                  src={previewUrls[index]}
                  alt="preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeFile(file)}
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
