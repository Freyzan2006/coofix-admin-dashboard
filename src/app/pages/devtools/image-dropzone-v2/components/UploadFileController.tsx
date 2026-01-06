// import type { UploadedFileUI } from "../types";

// interface IUploadFileControllerProps {
// 	maxFiles: number;
// 	uploadedFiles: UploadedFileUI[];
// 	isLoading: boolean;
// 	handleClearAll: () => void;
// 	disabled?: boolean;
// }

// export const UploadFileController = ({
// 	maxFiles,
// 	uploadedFiles,
// 	isLoading,
// 	handleClearAll,
// 	disabled = false,
// }: IUploadFileControllerProps) => {
// 	return (
// 		<div className="flex justify-between items-center mb-4">
// 			<h3 className="text-lg font-semibold">
// 				Загруженные файлы ({uploadedFiles.length}/{maxFiles})
// 			</h3>
// 			{!disabled && (
// 				<button
// 					onClick={handleClearAll}
// 					className="btn btn-ghost btn-sm text-error"
// 					disabled={isLoading}
// 					type="button"
// 				>
// 					Очистить все
// 				</button>
// 			)}
// 		</div>
// 	);
// };

// components/ui/UploadFileController.ui.tsx
import type { UploadedFileUI } from "../types";

interface IUploadFileControllerProps {
	maxFiles: number;
	minFiles: number;
	uploadedFiles: UploadedFileUI[];
	isLoading: boolean;
	handleClearAll: () => void;
	disabled?: boolean;
	canRemove?: boolean;
	isMinFilesReached?: boolean;
}

export const UploadFileController = ({
	maxFiles,
	minFiles,
	uploadedFiles,
	isLoading,
	handleClearAll,
	disabled = false,
	canRemove = true,
	isMinFilesReached = true,
}: IUploadFileControllerProps) => {
	const showClearAll = canRemove && uploadedFiles.length > minFiles;

	return (
		<div className="flex justify-between items-center mb-4">
			<div>
				<h3 className="text-lg font-semibold">
					Загруженные файлы ({uploadedFiles.length}/{maxFiles})
				</h3>
				{minFiles > 0 && (
					<p
						className={`text-sm ${isMinFilesReached ? "text-success" : "text-warning"}`}
					>
						Минимум: {uploadedFiles.length}/{minFiles}
					</p>
				)}
			</div>

			{showClearAll && (
				<button
					onClick={handleClearAll}
					className="btn btn-ghost btn-sm text-error"
					disabled={isLoading || disabled || !canRemove}
					type="button"
					title={
						!canRemove
							? `Нельзя удалить все файлы. Минимум ${minFiles} файл(ов) требуется`
							: ""
					}
				>
					Очистить все
				</button>
			)}
		</div>
	);
};
