import type React from "react";
import { useRef } from "react";
import type { UploadedImage } from "../types";
import { Uploaded } from "./ui/Uploaded.widget";

interface ImageDropzoneProps {
	images: UploadedImage[];
	onChange: (images: UploadedImage[]) => void;
	maxFiles?: number;
	maxSize?: number;
	error?: string;
	isLoading?: boolean;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
	images = [],
	onChange,
	maxFiles = 10,
	maxSize = 5 * 1024 * 1024,
	error,
	isLoading = false,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFiles = (files: FileList) => {
		const newImages: UploadedImage[] = Array.from(files)
			.slice(0, maxFiles - images.length)
			.map((file) => ({
				id: crypto.randomUUID(),
				kind: "local",
				file,
				preview: URL.createObjectURL(file),
			}));

		onChange([...images, ...newImages]);
	};

	const handleRemove = (id: string) =>
		onChange(images.filter((img) => img.id !== id));
	const handleClearAll = () => onChange([]);

	return (
		<Uploaded
			uploadedFiles={images.map((img) => ({
				id: img.id,
				preview: img.kind === "local" ? img.preview : img.url,
				status: "success",
			}))}
			handleFiles={handleFiles}
			handleRemoveFile={handleRemove}
			handleClearAll={handleClearAll}
			maxFiles={maxFiles}
			maxSize={maxSize}
			error={error}
			isLoading={isLoading}
			fileInputRef={fileInputRef}
		/>
	);
};
