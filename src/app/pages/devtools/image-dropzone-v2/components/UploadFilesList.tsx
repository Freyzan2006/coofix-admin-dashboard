import type { UploadedFileUI } from "../types";

import { FileItem } from "./FileItem.ui";

interface IUploadFilesListProps {
	uploadedFiles: UploadedFileUI[];
	handleRemoveFile: (id: string) => void;
	isLoading: boolean;
	disabled?: boolean;
	canRemove?: boolean;
	minFiles?: number;
	currentCount?: number;
}

export const UploadFilesList: React.FC<IUploadFilesListProps> = ({
	uploadedFiles,
	handleRemoveFile,
	isLoading,
	disabled = false,
	canRemove = true,
	minFiles = 0,
	currentCount = 0,
}) => {

	const canRemoveFile = (index: number) => {
		if (!canRemove) return false;
		if (minFiles === 0) return true;
		
		if (index === 0) return currentCount - 2 >= minFiles;
		return currentCount - 1 >= minFiles;
	};

	return (
		<div className="space-y-4">
			{uploadedFiles.map((file, index) => (
				<FileItem
					key={file.id}
					file={file}
					index={index}
					handleRemoveFile={handleRemoveFile}
					isLoading={isLoading}
					disabled={disabled}
					canRemove={canRemoveFile(index)}
					minFiles={minFiles}
					currentCount={currentCount}
				/>
			))}
		</div>
	);
};



