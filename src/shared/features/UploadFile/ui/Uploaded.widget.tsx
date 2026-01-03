import type { UploadedFile } from "../types";
import { UploadedDropZone } from "./UploadedDropZone.feature";
import { UploadedFiles } from "./UploadedFiles.widget";

interface UploadedProps {
	uploadedFiles: UploadedFile[];
	isLoading: boolean;
	maxFiles: number;
	handleRemoveFile: (id: string) => void;
	handleClearAll: () => void;
	handleFiles: (files: FileList) => void;
	fileInputRef: React.RefObject<HTMLInputElement | null>;
	maxSize: number;
	error?: string;
}

export const Uploaded: React.FC<UploadedProps> = ({
	uploadedFiles,
	isLoading,
	maxFiles,
	handleRemoveFile,
	handleClearAll,
	handleFiles,
	fileInputRef,
	maxSize,
	error,
}) => {
	return (
		<>
			{error && <p className="text-error text-sm mt-1 mb-2">{error}</p>}

			<UploadedDropZone
				handleFiles={handleFiles}
				fileInputRef={fileInputRef}
				isLoading={isLoading}
				maxSize={maxSize}
				maxFiles={maxFiles}
			/>

			<UploadedFiles
				uploadedFiles={uploadedFiles}
				isLoading={isLoading}
				maxFiles={maxFiles}
				handleRemoveFile={handleRemoveFile}
				handleClearAll={handleClearAll}
			/>
		</>
	);
};

// export const Uploaded: React.FC<UploadedProps> = ({
// 	fieldState,
// 	uploadedFiles,
// 	isLoading,
// 	maxFiles,
// 	handleRemoveFile,
// 	handleClearAll,
// 	handleFiles,
// 	fileInputRef,
// 	maxSize,
// 	error,
// }) => {
// 	return (
// 		<>
// 			{fieldState.error && (
// 				<p className="text-error text-sm mt-1 mb-2">
// 					{fieldState.error.message}
// 				</p>
// 			)}

// 			<UploadedDropZone
// 				handleFiles={handleFiles}
// 				fileInputRef={fileInputRef}
// 				isLoading={isLoading}
// 				maxSize={maxSize}
// 				maxFiles={maxFiles}
// 			/>

// 			{error && (
// 				<div className="alert alert-error mt-4">
// 					<svg
// 						xmlns="http://www.w3.org/2000/svg"
// 						className="stroke-current shrink-0 h-6 w-6"
// 						fill="none"
// 						viewBox="0 0 24 24"
// 					>
// 						<title>error</title>
// 						<path
// 							strokeLinecap="round"
// 							strokeLinejoin="round"
// 							strokeWidth="2"
// 							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
// 						/>
// 					</svg>
// 					<span>{error}</span>
// 				</div>
// 			)}

// 			<UploadedFiles
// 				uploadedFiles={uploadedFiles}
// 				isLoading={isLoading}
// 				maxFiles={maxFiles}
// 				handleRemoveFile={handleRemoveFile}
// 				handleClearAll={handleClearAll}
// 			/>
// 		</>
// 	);
// };
