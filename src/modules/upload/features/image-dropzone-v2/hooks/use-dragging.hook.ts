// import { useCallback, useState } from "react";

// interface UseDraggingProps {
// 	handleFiles: (files: FileList) => void;
// 	fileInputRef: React.RefObject<HTMLInputElement | null>;
// }

// export function useDragging({ handleFiles, fileInputRef }: UseDraggingProps) {
// 	const [isDragging, setIsDragging] = useState(false);

// 	// Обработчик изменения input
// 	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		if (e.target.files?.length) {
// 			handleFiles(e.target.files);
// 			e.target.value = "";
// 		}
// 	};

// 	// Обработчик клика на dropzone
// 	const handleDropzoneClick = (e: React.MouseEvent) => {
// 		if ((e.target as HTMLElement).closest("label, button")) {
// 			return;
// 		}

// 		if (fileInputRef.current) {
// 			fileInputRef.current.click();
// 		}
// 	};

// 	// Обработчики drag and drop
// 	const handleDragEnter = useCallback((e: React.DragEvent) => {
// 		e.preventDefault();
// 		e.stopPropagation();
// 		setIsDragging(true);
// 	}, []);

// 	const handleDragOver = useCallback((e: React.DragEvent) => {
// 		e.preventDefault();
// 		e.stopPropagation();
// 		setIsDragging(true);
// 	}, []);

// 	const handleDragLeave = useCallback((e: React.DragEvent) => {
// 		e.preventDefault();
// 		e.stopPropagation();

// 		const relatedTarget = e.relatedTarget as Node;
// 		const currentTarget = e.currentTarget as Node;

// 		if (!currentTarget.contains(relatedTarget)) {
// 			setIsDragging(false);
// 		}
// 	}, []);

// 	const handleDrop = useCallback(
// 		(e: React.DragEvent) => {
// 			e.preventDefault();
// 			e.stopPropagation();
// 			setIsDragging(false);

// 			const files = e.dataTransfer.files;
// 			if (files.length) {
// 				handleFiles(files);
// 			}

// 			e.dataTransfer.clearData();
// 		},
// 		[handleFiles],
// 	);

// 	return {
// 		handleFileInput,
// 		handleDropzoneClick,
// 		handleDragEnter,
// 		handleDragOver,
// 		handleDragLeave,
// 		handleDrop,
// 		isDragging,
// 	};
// }

import { useCallback, useRef, useState } from "react";

interface UseDraggingOptions {
	handleFiles: (files: FileList) => void;
	fileInputRef: React.RefObject<HTMLInputElement | null>;
	disabled?: boolean;
}

export const useDragging = ({
	handleFiles,
	fileInputRef,
	disabled = false,
}: UseDraggingOptions) => {
	const [isDragging, setIsDragging] = useState(false);
	const dragCounter = useRef(0);

	const handleDragEnter = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		dragCounter.current++;
		if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
			setIsDragging(true);
		}
	}, []);

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		dragCounter.current--;
		if (dragCounter.current === 0) {
			setIsDragging(false);
		}
	}, []);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(false);
			dragCounter.current = 0;

			if (disabled) return;

			const files = e.dataTransfer.files;
			if (files && files.length > 0) {
				handleFiles(files);
			}
		},
		[handleFiles, disabled],
	);

	const handleDropzoneClick = useCallback(() => {
		if (!disabled && fileInputRef.current) {
			fileInputRef.current.click();
		}
	}, [fileInputRef, disabled]);

	const handleFileInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (disabled) return;

			const files = e.target.files;
			if (files && files.length > 0) {
				handleFiles(files);
				// Сброс input для возможности повторной загрузки тех же файлов
				e.target.value = "";
			}
		},
		[handleFiles, disabled],
	);

	return {
		isDragging,
		handleDragEnter: !disabled ? handleDragEnter : undefined,
		handleDragOver: !disabled ? handleDragOver : undefined,
		handleDragLeave: !disabled ? handleDragLeave : undefined,
		handleDrop: !disabled ? handleDrop : undefined,
		handleDropzoneClick: !disabled ? handleDropzoneClick : undefined,
		handleFileInput: !disabled ? handleFileInput : undefined,
	};
};
