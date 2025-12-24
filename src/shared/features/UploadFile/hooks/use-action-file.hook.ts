import type { UploadedFile } from "../types";

interface useActionFileProps {
	handleFiles: (files: FileList) => void;
	name: string;
	fileInputRef: React.RefObject<HTMLInputElement | null>;
	uploadedFiles: UploadedFile[];
	setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
	updateFormFiles: (files: UploadedFile[]) => void;
	onFilesChange?: (files: File[]) => void;
	setValue: (
		name: string,
		value: string | string[] | number,
		options?:
			| {
					shouldValidate?: boolean | undefined;
					shouldDirty?: boolean | undefined;
					shouldTouch?: boolean | undefined;
			  }
			| undefined,
	) => void;
}

export function useActionFile({
	name,
	uploadedFiles,
	setUploadedFiles,
	updateFormFiles,
	onFilesChange,
	setValue,
}: useActionFileProps) {
	// Удаление файла
	const handleRemoveFile = (id: string) => {
		const fileToRemove = uploadedFiles.find((file) => file.id === id);
		if (fileToRemove) {
			URL.revokeObjectURL(fileToRemove.preview);
		}

		setUploadedFiles((prev) => {
			const updated = prev.filter((file) => file.id !== id);
			updateFormFiles(updated);
			return updated;
		});
	};

	// Очистка всех файлов
	const handleClearAll = () => {
		uploadedFiles.forEach((file) => {
			URL.revokeObjectURL(file.preview);
		});

		setUploadedFiles([]);
		setValue(name, [], { shouldValidate: true, shouldDirty: true });
		onFilesChange?.([]);
	};

	return {
		handleRemoveFile,
		handleClearAll,
	};
}
