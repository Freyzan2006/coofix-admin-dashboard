import { useCallback, useEffect, useState } from "react";
import type { UploadedImage } from "../types";

export interface UseImageDropzoneOptions {
	maxFiles?: number;
	minFiles?: number; // <-- Добавляем
	maxSize?: number;
	onChange?: (images: UploadedImage[]) => void;
	value?: UploadedImage[];
}

export const useImageDropzone = ({
	maxFiles = 10,
	minFiles = 0, // <-- По умолчанию 0
	maxSize = 5 * 1024 * 1024, // 5MB
	onChange,
	value = [],
}: UseImageDropzoneOptions = {}) => {
	const [validationError, setValidationError] = useState<string | null>(null);

	// Валидация при изменении количества файлов
	useEffect(() => {
		if (minFiles > 0 && value.length < minFiles) {
			setValidationError(`Минимум ${minFiles} файл(ов) требуется`);
		} else if (value.length > maxFiles) {
			setValidationError(`Максимум ${maxFiles} файл(ов) разрешено`);
		} else {
			setValidationError(null);
		}
	}, [value.length, minFiles, maxFiles]);

	const validateFile = useCallback(
		(file: File): string | null => {
			// Проверка типа файла
			if (!file.type.startsWith("image/")) {
				return "Файл должен быть изображением";
			}

			// Проверка размера
			if (file.size > maxSize) {
				return `Максимальный размер файла: ${(maxSize / (1024 * 1024)).toFixed(0)}MB`;
			}

			return null;
		},
		[maxSize],
	);

	const handleFiles = useCallback(
		(files: FileList) => {
			if (value.length >= maxFiles) {
				setValidationError(`Максимум ${maxFiles} файл(ов) разрешено`);
				return;
			}

			const validFiles: UploadedImage[] = [];
			const errors: string[] = [];

			Array.from(files)
				.slice(0, maxFiles - value.length)
				.forEach((file) => {
					const error = validateFile(file);
					if (error) {
						errors.push(`${file.name}: ${error}`);
					} else {
						validFiles.push({
							id: crypto.randomUUID(),
							kind: "local",
							file,
							preview: URL.createObjectURL(file),
						});
					}
				});

			if (errors.length > 0) {
				setValidationError(errors.join(", "));
			}

			if (validFiles.length > 0) {
				const newImages = [...value, ...validFiles];
				onChange?.(newImages);

				// Очищаем ошибку валидации если файлы добавлены
				if (newImages.length >= minFiles) {
					setValidationError(null);
				}
			}
		},
		[value, maxFiles, minFiles, onChange, validateFile],
	);

	const handleRemove = useCallback(
		(id: string) => {
			const newImages = value.filter((img) => img.id !== id);
			onChange?.(newImages);

			// Проверяем минимальное количество
			if (minFiles > 0 && newImages.length < minFiles) {
				setValidationError(
					`Минимум ${minFiles} файл(ов) требуется. Удалено: ${newImages.length}/${minFiles}`,
				);
			}
		},
		[value, minFiles, onChange],
	);

	const handleClearAll = useCallback(() => {
		if (minFiles > 0) {
			setValidationError(
				`Нельзя очистить все файлы. Минимум ${minFiles} файл(ов) требуется`,
			);
			return;
		}
		onChange?.([]);
	}, [onChange, minFiles]);

	return {
		images: value,
		handleFiles,
		handleRemove,
		handleClearAll,
		maxFiles,
		minFiles,
		maxSize,
		canAddMore: value.length < maxFiles,
		canRemove: value.length > minFiles,
		validationError,
		isMinFilesReached: value.length >= minFiles,
	};
};
