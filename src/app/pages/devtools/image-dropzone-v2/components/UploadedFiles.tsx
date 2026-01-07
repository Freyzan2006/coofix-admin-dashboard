import type { UploadedFileUI } from "../types";
import { UploadFileController } from "./UploadFileController";
import { UploadFilesList } from "./UploadFilesList";

interface UploadedFilesProps {
	uploadedFiles: UploadedFileUI[];
	isLoading: boolean;
	maxFiles: number;
	minFiles: number;
	handleRemoveFile: (id: string) => void;
	handleClearAll: () => void;
	disabled?: boolean;
	canRemove?: boolean;
	isMinFilesReached?: boolean;
}

export const UploadedFiles = ({
	uploadedFiles,
	isLoading,
	maxFiles,
	minFiles,
	handleRemoveFile,
	handleClearAll,
	disabled = false,
	canRemove = true,
	isMinFilesReached = true,
}: UploadedFilesProps) => {
	return (
		<>
			{uploadedFiles.length > 0 && (
				<div className="mt-8">
					<UploadFileController
						maxFiles={maxFiles}
						minFiles={minFiles}
						isLoading={isLoading || disabled}
						uploadedFiles={uploadedFiles}
						handleClearAll={handleClearAll}
						disabled={disabled}
						canRemove={canRemove}
						isMinFilesReached={isMinFilesReached}
					/>

					<UploadFilesList
						uploadedFiles={uploadedFiles}
						handleRemoveFile={handleRemoveFile}
						isLoading={isLoading || disabled}
						disabled={disabled}
						canRemove={canRemove}
						minFiles={minFiles}
						currentCount={uploadedFiles.length}
					/>
				</div>
			)}
		</>
	);
};
