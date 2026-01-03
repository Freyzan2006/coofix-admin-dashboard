import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { UploadedFile } from "./types";
import { Uploaded } from "./ui/Uploaded.widget";
import { formatFileSize } from "./utils/format.util";

interface ImageDropzoneProps {
	value: File[];
	onChange: (files: File[]) => void;
	maxFiles?: number;
	maxSize?: number;
	error?: string;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
	value,
	onChange,
	maxFiles = 10,
	maxSize = 5 * 1024 * 1024,
	error,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

	useEffect(() => {
		if (uploadedFiles.length === 0) {
			setUploadedFiles(
				value.map((file) => ({
					id: crypto.randomUUID(),
					file,
					name: file.name,
					size: formatFileSize(file.size),
					preview: URL.createObjectURL(file),
					progress: 100,
					status: "success",
				})),
			);
		}
	}, [value, uploadedFiles.length]);

	const simulateUpload = (id: string) => {
		let progress = 0;
		const interval = setInterval(() => {
			progress += 10;
			setUploadedFiles((prev) =>
				prev.map((f) =>
					f.id === id ? { ...f, progress: Math.min(progress, 100) } : f,
				),
			);

			if (progress >= 100) {
				clearInterval(interval);
				setUploadedFiles((prev) =>
					prev.map((f) => (f.id === id ? { ...f, status: "success" } : f)),
				);
			}
		}, 100);

		return () => clearInterval(interval);
	};

	const handleFiles = (files: FileList) => {
		const fileArray = Array.from(files).slice(0, maxFiles - value.length);
		const nextFiles = [...value, ...fileArray];
		onChange(nextFiles);

		const newUploaded: UploadedFile[] = fileArray.map((file) => ({
			id: crypto.randomUUID(),
			file,
			name: file.name,
			size: formatFileSize(file.size),
			preview: URL.createObjectURL(file),
			progress: 0,
			status: "uploading",
		}));

		setUploadedFiles((prev) => [...prev, ...newUploaded]);

		newUploaded.forEach((f) => {
			simulateUpload(f.id);
		});
	};

	const handleRemoveFile = (id: string) => {
		const next = uploadedFiles.filter((f) => f.id !== id).map((f) => f.file);
		onChange(next);
		setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
	};

	const handleClearAll = () => {
		onChange([]);
		setUploadedFiles([]);
	};

	return (
		<Uploaded
			uploadedFiles={uploadedFiles}
			isLoading={uploadedFiles.some((f) => f.status === "uploading")}
			maxFiles={maxFiles}
			handleRemoveFile={handleRemoveFile}
			handleClearAll={handleClearAll}
			handleFiles={handleFiles}
			fileInputRef={fileInputRef}
			maxSize={maxSize}
			error={error}
		/>
	);
};
