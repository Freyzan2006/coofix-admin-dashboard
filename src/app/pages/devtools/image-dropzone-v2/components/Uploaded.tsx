import type { UploadedFileUI } from "../types";
import { UploadedDropZone } from "./UploadedDropZone";
import { UploadedFiles } from "./UploadedFiles";

interface UploadedProps {
	uploadedFiles: UploadedFileUI[];
	isLoading: boolean;
	maxFiles: number;
	minFiles: number;
	handleRemoveFile: (id: string) => void;
	handleClearAll: () => void;
	handleFiles: (files: FileList) => void;
	fileInputRef: React.RefObject<HTMLInputElement | null>;
	maxSize: number;
	error?: string;
	accept?: string;
	canAddMore?: boolean;
	canRemove?: boolean;
	disabled?: boolean;

	isMinFilesReached?: boolean;
}

export const Uploaded: React.FC<UploadedProps> = ({
	uploadedFiles,
	isLoading,
	maxFiles,
	minFiles,
	handleRemoveFile,
	handleClearAll,
	handleFiles,
	fileInputRef,
	maxSize,
	error,
	accept = "image/*",
	canAddMore = true,
	canRemove = true,
	disabled = false,
	isMinFilesReached = true,
}) => {
	return (
		<div className={`${disabled ? "opacity-60" : ""}`}>
			{minFiles > 0 && (
				<div
					className={`
          mb-3 p-2 rounded-lg text-sm font-medium
          ${
						isMinFilesReached
							? "bg-success/10 text-success border border-success/20"
							: "bg-warning/10 text-warning border border-warning/20"
					}
        `}
				>
					{isMinFilesReached ? (
						<span>
							✓ Минимальное количество файлов достигнуто ({uploadedFiles.length}
							/{minFiles})
						</span>
					) : (
						<span>
							⚠️ Требуется ещё {minFiles - uploadedFiles.length} файл(ов)
							(загружено: {uploadedFiles.length}/{minFiles})
						</span>
					)}
				</div>
			)}

			{error && (
				<div className="mb-3 p-3 rounded-lg bg-error/10 text-error text-sm border border-error/20">
					{error}
				</div>
			)}

			{canAddMore && !disabled && (
				<UploadedDropZone
					handleFiles={handleFiles}
					fileInputRef={fileInputRef}
					isLoading={isLoading}
					maxSize={maxSize}
					maxFiles={maxFiles}
					minFiles={minFiles}
					accept={accept}
					canAddMore={canAddMore}
				/>
			)}

			<UploadedFiles
				uploadedFiles={uploadedFiles}
				isLoading={isLoading || disabled}
				maxFiles={maxFiles}
				minFiles={minFiles}
				handleRemoveFile={handleRemoveFile}
				handleClearAll={handleClearAll}
				disabled={disabled}
				canRemove={canRemove}
				isMinFilesReached={isMinFilesReached}
			/>
		</div>
	);
};
