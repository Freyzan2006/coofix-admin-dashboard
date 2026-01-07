import { forwardRef, useImperativeHandle, useRef } from "react";
import { Uploaded } from "./components/Uploaded";
import { useImageDropzone } from "./hooks/use-image-dropzone";
import type { UploadedImage } from "./types";
import { formatFileSize } from "./utils/format.util";

export interface ImageDropzoneProps {
	images?: UploadedImage[];
	onChange?: (images: UploadedImage[]) => void;
	maxFiles?: number;
	minFiles?: number;
	maxSize?: number;
	error?: string;
	isLoading?: boolean;
	accept?: string;
	disabled?: boolean;
	required?: boolean;
}

export interface ImageDropzoneRef {
	clear: () => void;
	removeById: (id: string) => void;
	getImages: () => UploadedImage[];
	validate: () => boolean;
}

export const ImageDropzoneV2 = forwardRef<ImageDropzoneRef, ImageDropzoneProps>(
	(
		{
			images = [],
			onChange,
			maxFiles = 10,
			minFiles = 0,
			maxSize = 5 * 1024 * 1024,
			error: externalError,
			isLoading = false,
			accept = "image/*",
			disabled = false,
			required = false,
		},
		ref,
	) => {
		const fileInputRef = useRef<HTMLInputElement>(null);

		const {
			handleFiles,
			handleRemove,
			handleClearAll,
			canAddMore,
			canRemove,
			validationError,
			isMinFilesReached,
		} = useImageDropzone({
			maxFiles,
			minFiles: required ? Math.max(minFiles, 1) : minFiles,
			maxSize,
			onChange,
			value: images,
		});

		// Экспортируем методы через ref
		useImperativeHandle(ref, () => ({
			clear: handleClearAll,
			removeById: handleRemove,
			getImages: () => images,
			validate: () => {
				if (required && images.length === 0) return false;
				return images.length >= minFiles;
			},
		}));

		// Объединяем ошибки: внешнюю и внутреннюю валидацию
		const combinedError =
			externalError ||
			validationError ||
			(required && images.length === 0
				? "Это поле обязательно для заполнения"
				: null) ||
			(minFiles > 0 && images.length < minFiles
				? `Минимум ${minFiles} файл(ов) требуется`
				: null);

		// Функция для получения preview с fallback
		const getPreview = (img: UploadedImage): string => {
			if (img.preview) return img.preview;
			if (img.kind === "local" && img.file) {
				return URL.createObjectURL(img.file);
			}
			if (img.kind === "remote" && img.url) {
				return img.url;
			}
			return "/placeholder-image.png";
		};

		const uploadedFiles = images
			.map((img) => ({
				id: img.id,
				preview: getPreview(img),
				status: "success" as const,
				name:
					img.kind === "local" && img.file
						? img.file.name
						: img.name || "Image",
				size:
					img.kind === "local" && img.file
						? formatFileSize(img.file.size)
						: img.size
							? formatFileSize(img.size)
							: "",
			}))
			.filter((file) => file.preview);

		return (
			<div className="relative">
				{minFiles > 0 && (
					<div className="text-sm text-base-content/60 mb-2">
						Требуется файлов: {images.length}/{minFiles}
						{!isMinFilesReached && (
							<span className="text-warning ml-2">
								⚠️ Добавьте ещё {minFiles - images.length} файл(ов)
							</span>
						)}
					</div>
				)}

				<Uploaded
					uploadedFiles={uploadedFiles}
					handleFiles={handleFiles}
					handleRemoveFile={handleRemove}
					handleClearAll={handleClearAll}
					maxFiles={maxFiles}
					minFiles={minFiles}
					maxSize={maxSize}
					error={combinedError || undefined}
					isLoading={isLoading || disabled}
					fileInputRef={fileInputRef}
					accept={accept}
					canAddMore={canAddMore}
					canRemove={canRemove}
					disabled={disabled}
					isMinFilesReached={isMinFilesReached}
				/>
			</div>
		);
	},
);

ImageDropzoneV2.displayName = "ImageDropzone";
