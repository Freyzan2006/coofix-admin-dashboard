import { useCallback, useEffect, useState } from "react";
import { useDragging } from "../hooks/use-dragging.hook";
import { UploadedButton } from "./UploadedButton.feature";
import { UploadedEffects } from "./UploadedEffects.ui";
import { UploadedInfo } from "./UploadedInfo.ui";

interface IUploadedDropZoneProps {
	handleFiles: (files: FileList) => void;
	fileInputRef: React.RefObject<HTMLInputElement | null>;
	isLoading?: boolean;
	maxSize: number;
	maxFiles: number;
	minFiles: number;
	accept?: string;
	canAddMore?: boolean;
}

export const UploadedDropZone: React.FC<IUploadedDropZoneProps> = ({
	handleFiles,
	fileInputRef,
	isLoading,
	maxSize,
	minFiles = 0,
	maxFiles,
	accept = "image/*",
	canAddMore = true,
}) => {
	const {
		isDragging,
		handleDragEnter,
		handleDragOver,
		handleDragLeave,
		handleDrop,
		handleFileInput,
	} = useDragging({
		handleFiles,
		fileInputRef,
		disabled: isLoading,
	});

	const [uploadSuccess, setUploadSuccess] = useState(false);
	const [fileCount, setFileCount] = useState(0);

	// Анимация успешной загрузки
	useEffect(() => {
		if (fileCount > 0) {
			setUploadSuccess(true);
			const timer = setTimeout(() => setUploadSuccess(false), 2000);
			return () => clearTimeout(timer);
		}
	}, [fileCount]);

	const handleFileDrop = useCallback(
		(e: React.DragEvent) => {
			handleDrop?.(e);
			if (e.dataTransfer.files) {
				setFileCount(e.dataTransfer.files.length);
			}
		},
		[handleDrop],
	);

	const handleFileInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			handleFileInput?.(e);
			if (e.target.files) {
				setFileCount(e.target.files.length);
			}
		},
		[handleFileInput],
	);

	const handleSelectFilesClick = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();

			if (!isLoading && fileInputRef.current) {
				fileInputRef.current.click();
			}
		},
		[isLoading, fileInputRef],
	);

	if (!canAddMore) {
		return (
			<div
				className="border-2 border-dashed border-base-300 rounded-xl p-8 text-center bg-base-100"
				style={{
					animation: "fadeIn 0.5s ease-out",
				}}
			>
				<p className="text-lg font-medium">
					Достигнуто максимальное количество файлов ({maxFiles})
				</p>
			</div>
		);
	}

	return (
		<section
			aria-label="Область для загрузки файлов"
			className={`
        border-2 border-dashed rounded-xl p-8 text-center
        transition-all duration-300 mb-4 relative overflow-hidden
        ${
					isDragging
						? "border-primary bg-primary/10 scale-[1.02] shadow-lg shadow-primary/20"
						: "border-base-300"
				}
        ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${uploadSuccess ? "border-success bg-success/5" : ""}
        group
      `}
			style={{
				animation: "fadeIn 0.5s ease-out",
			}}
			onDragEnter={!isLoading ? handleDragEnter : undefined}
			onDragOver={!isLoading ? handleDragOver : undefined}
			onDragLeave={!isLoading ? handleDragLeave : undefined}
			onDrop={!isLoading ? handleFileDrop : undefined}
		>
			<UploadedEffects isDragging={isDragging} uploadSuccess={uploadSuccess} />

			<div className="relative z-10 flex flex-col items-center justify-center gap-4">
				<UploadedInfo
					isDragging={isDragging}
					uploadSuccess={uploadSuccess}
					isLoading={isLoading}
					minFiles={minFiles}
					maxFiles={maxFiles}
					maxSize={maxSize}
					fileCount={fileCount}
				/>

				<div
					className="divider w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					style={{
						animation: "expand 0.5s ease-out",
					}}
				>
					ИЛИ
				</div>

				<UploadedButton
					handleSelectFilesClick={handleSelectFilesClick}
					isLoading={isLoading}
					fileInputRef={fileInputRef}
					accept={accept}
					handleFileInputChange={handleFileInputChange}
				/>
			</div>

			{/* Микро-анимация при наведении */}
			<div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
		</section>
	);
};
