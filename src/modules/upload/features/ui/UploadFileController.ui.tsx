import type { UploadedFileUI } from "../../types";

interface IUploadFileControllerProps {
	maxFiles: number;
	uploadedFiles: UploadedFileUI[];
	isLoading: boolean;
	handleClearAll: () => void;
}

export const UploadFileController = ({
	maxFiles,
	uploadedFiles,
	isLoading,
	handleClearAll,
}: IUploadFileControllerProps) => {
	return (
		<div className="flex justify-between items-center mb-4">
			<h3 className="text-lg font-semibold">
				Загруженные файлы ({uploadedFiles.length}/{maxFiles})
			</h3>
			<button
				onClick={handleClearAll}
				className="btn btn-ghost btn-sm text-error"
				disabled={isLoading}
				type="button"
			>
				Очистить все
			</button>
		</div>
	);
};
