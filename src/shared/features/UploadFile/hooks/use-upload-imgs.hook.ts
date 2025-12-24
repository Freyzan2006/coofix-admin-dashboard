import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { UploadedFile } from "../types";
import { formatFileSize, validateFiles } from "../utils/format.util";

interface UseUploadImgsProps {
	name: string;
	maxFiles?: number;
	maxSize?: number;
	onFilesChange?: (files: File[]) => void;
}

export function useUploadImgs({
	name,
	maxFiles = 5,
	maxSize = 5 * 1024 * 1024,
	onFilesChange,
}: UseUploadImgsProps) {
	const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const { setValue, control } = useFormContext();

	const handleFiles = (files: FileList) => {
		setError(null);

		const fileArray = Array.from(files);
		const validationError = validateFiles(fileArray, maxFiles, maxSize);

		if (validationError) {
			setError(validationError);
			return;
		}

		setIsLoading(true);

		const newFiles: UploadedFile[] = fileArray.map((file) => ({
			id: Math.random().toString(36).substr(2, 9),
			file,
			preview: URL.createObjectURL(file),
			name: file.name,
			size: formatFileSize(file.size),
			progress: 0,
			status: "uploading" as const,
		}));

		setUploadedFiles((prev) => {
			const updated = [...prev, ...newFiles].slice(0, maxFiles);
			updateFormFiles(updated);
			return updated;
		});

		// Имитация загрузки
		newFiles.forEach((file) => {
			simulateUpload(file.id);
		});

		setIsLoading(false);
	};

	// Обновление файлов в форме
	const updateFormFiles = (files: UploadedFile[]) => {
		const fileObjects = files.map((f) => f.file);
		setValue(name, fileObjects, { shouldValidate: true, shouldDirty: true });
		onFilesChange?.(fileObjects);
	};

	// Имитация загрузки файла
	const simulateUpload = (id: string) => {
		let progress = 0;
		const interval = setInterval(() => {
			progress += 10;
			setUploadedFiles((prev) =>
				prev.map((file) =>
					file.id === id
						? { ...file, progress: Math.min(progress, 100) }
						: file,
				),
			);

			if (progress >= 100) {
				clearInterval(interval);
				setUploadedFiles((prev) =>
					prev.map((file) =>
						file.id === id ? { ...file, status: "success" } : file,
					),
				);
			}
		}, 100);
	};

	return {
		control,
		uploadedFiles,
		isLoading,
		error,
		fileInputRef,

		setValue,
		setUploadedFiles,
		handleFiles,
		updateFormFiles,
		simulateUpload,
	};
}
