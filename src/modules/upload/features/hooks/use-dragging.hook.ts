import { useCallback, useState } from "react";

interface UseDraggingProps {
	handleFiles: (files: FileList) => void;
	fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export function useDragging({ handleFiles, fileInputRef }: UseDraggingProps) {
	const [isDragging, setIsDragging] = useState(false);

	// Обработчик изменения input
	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			handleFiles(e.target.files);
			e.target.value = "";
		}
	};

	// Обработчик клика на dropzone
	const handleDropzoneClick = (e: React.MouseEvent) => {
		if ((e.target as HTMLElement).closest("label, button")) {
			return;
		}

		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	// Обработчики drag and drop
	const handleDragEnter = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	}, []);

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();

		const relatedTarget = e.relatedTarget as Node;
		const currentTarget = e.currentTarget as Node;

		if (!currentTarget.contains(relatedTarget)) {
			setIsDragging(false);
		}
	}, []);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(false);

			const files = e.dataTransfer.files;
			if (files.length) {
				handleFiles(files);
			}

			e.dataTransfer.clearData();
		},
		[handleFiles],
	);

	return {
		handleFileInput,
		handleDropzoneClick,
		handleDragEnter,
		handleDragOver,
		handleDragLeave,
		handleDrop,
		isDragging,
	};
}
