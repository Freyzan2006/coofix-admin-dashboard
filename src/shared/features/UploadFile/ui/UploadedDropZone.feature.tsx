import { CloudUploadIcon } from "lucide-react";
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
		<section
			aria-label="Область для загрузки файлов"
			className={`
				border-2 border-dashed rounded-xl p-8 text-center
				transition-all duration-300
				${isDragging ? "border-primary bg-primary/10" : "border-base-300"}
				${isLoading ? "opacity-50" : ""}
				flex flex-col items-center justify-center gap-4
				relative
			`}
			onDragEnter={handleDragEnter}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			{/* Кликабельная overlay для основной drop-зоны */}
			<button
				type="button"
				className="absolute inset-0 w-full h-full cursor-pointer bg-transparent border-none"
				onClick={handleDropzoneClick}
				disabled={isLoading}
				aria-label="Перетащите или кликните для загрузки файлов"
			/>

			<div className="pointer-events-none z-10 flex flex-col items-center justify-center gap-4">
				<CloudUploadIcon className="h-12 w-12 text-primary" />

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

				<div className="divider w-full">ИЛИ</div>

				<div className="pointer-events-auto">
					<button
						type="button"
						className="btn btn-primary"
						onClick={(e) => {
							e.stopPropagation();
							fileInputRef.current?.click();
						}}
						disabled={isLoading}
					>
						<CloudUploadIcon className="h-5 w-5 mr-2" />
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
				</div>
			</div>
		</section>
	);
};
