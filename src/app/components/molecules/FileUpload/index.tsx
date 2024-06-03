import React, { ChangeEvent, DragEvent, FC } from "react";

export type FileUploadProps = {
  onFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  lable?: string;
  subTitle?: string;
};

/**
 * FileUpload
 *
 * @component
 * @param {Object} props - Component props
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} props.onFileUpload - Function to handle file upload
 * @param {string} props.label - Title for the upload component
 * @param {string} props.subTitle - Sub Title text for the upload component
 * @param {(event: React.DragEvent<HTMLDivElement>) => void} props.onDrop - Function to handle file drop
 * @param {(event: React.DragEvent<HTMLDivElement>) => void} props.onDragOver - Function to handle drag over
 * @returns {JSX.Element} The FileUploadComponent
 */
export const FileUpload: FC<FileUploadProps> = ({
  lable = " Upload JSON File",
  subTitle = "Drag & drop a JSON file here, or click to select",
  onFileUpload,
  onDrop,
  onDragOver,
}) => {
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-md">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {lable}
      </label>
      <div
        className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 focus:border-gray-400 transition"
        onDrop={onDrop}
        onDragOver={onDragOver}>
        <input
          type="file"
          accept="application/json"
          onChange={onFileUpload}
          className="sr-only"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="text-center">
          <p className="text-gray-500">{subTitle}</p>
        </label>
      </div>
    </div>
  );
};
