import { useDragging } from "../hooks/use-dragging.hook";
import { formatFileSize } from "../utils/format.util";

interface IUploadedDropZoneProps {
	handleFiles: (files: FileList) => void;
	fileInputRef: React.RefObject<HTMLInputElement | null>;
	isLoading?: boolean;
	maxSize: number;
	maxFiles: number;
}

export const UploadedDropZone: React.FC<IUploadedDropZoneProps> = ({
	handleFiles,
	fileInputRef,
	isLoading,
	maxSize,
	maxFiles,
}) => {
	const {
		isDragging,
		handleDragEnter,
		handleDragOver,
		handleDragLeave,
		handleDrop,
		handleDropzoneClick,
		handleFileInput,
	} = useDragging({ handleFiles, fileInputRef });

	return (
		<button
			type="button"
			disabled={isLoading}
			className={`
				border-2 border-dashed rounded-xl p-8 text-center
				transition-all duration-300 cursor-pointer
				${isDragging ? "border-primary bg-primary/10" : "border-base-300 hover:border-primary hover:bg-base-200"}
				${isLoading ? "opacity-50" : ""}
				flex flex-col items-center justify-center gap-4
			`}
			onClick={handleDropzoneClick}
			onDragEnter={handleDragEnter}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-12 w-12 text-primary"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<title>Upload</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
				/>
			</svg>

			<div>
				<p className="text-lg font-medium mb-2">
					{isDragging ? "Отпустите для загрузки" : "Перетащите файлы сюда"}
				</p>
				<p className="text-sm text-base-content/60">
					Поддерживаются форматы: JPG, PNG, GIF, WebP
				</p>
				<p className="text-sm text-base-content/60">
					Максимальный размер: {formatFileSize(maxSize)} на файл
				</p>
				<p className="text-sm text-base-content/60">
					Максимум файлов: {maxFiles}
				</p>
			</div>

			<div className="divider">ИЛИ</div>

			<button
				type="button"
				className="btn btn-primary"
				onClick={(e) => {
					e.stopPropagation();
					if (fileInputRef.current) {
						fileInputRef.current.click();
					}
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5 mr-2"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<title>Upload</title>
					<path
						fillRule="evenodd"
						d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
						clipRule="evenodd"
					/>
				</svg>
				Выберите файлы
			</button>

			<input
				ref={fileInputRef}
				type="file"
				className="hidden"
				multiple
				accept="image/*"
				onChange={handleFileInput}
				disabled={isLoading}
			/>
		</button>
	);
};
