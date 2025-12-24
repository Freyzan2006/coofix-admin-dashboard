import type { UploadedFile } from "../types";
import { UploadFilesList } from "./UploadedFilesList.ui";
import { UploadFileController } from "./UploadFileController.ui";

interface UploadedFilesProps {
	uploadedFiles: UploadedFile[];
	isLoading: boolean;
	maxFiles: number;
	handleRemoveFile: (id: string) => void;
	handleClearAll: () => void;
}

export const UploadedFiles = ({
	uploadedFiles,
	isLoading,
	maxFiles,
	handleRemoveFile,
	handleClearAll,
}: UploadedFilesProps) => {
	return (
		<>
			{uploadedFiles.length > 0 && (
				<div className="mt-8">
					<UploadFileController
						maxFiles={maxFiles}
						isLoading={isLoading}
						uploadedFiles={uploadedFiles}
						handleClearAll={handleClearAll}
					/>

					<UploadFilesList
						uploadedFiles={uploadedFiles}
						handleRemoveFile={handleRemoveFile}
						isLoading={isLoading}
					/>
				</div>
			)}
		</>
	);
};
