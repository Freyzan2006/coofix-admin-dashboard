export const formatFileSize = (bytes: number): string => {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return String(`${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`);
};

export const validateFiles = (
	files: File[],
	maxFiles = 10,
	maxSize = 5 * 1024 * 1024,
): string | null => {
	if (files.length > maxFiles) {
		return `Максимальное количество файлов: ${maxFiles}`;
	}

	for (const file of files) {
		if (!file.type.startsWith("image/")) {
			return "Поддерживаются только изображения";
		}

		if (file.size > maxSize) {
			return `Файл ${file.name} превышает максимальный размер ${formatFileSize(maxSize)}`;
		}
	}

	return null;
};
