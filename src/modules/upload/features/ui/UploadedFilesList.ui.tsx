import { SliceText } from "@shared/ui/text";
import type { UploadedFileUI } from "../../types";
import { FileStatus } from "./FileStatus.ui";

interface IUploadFilesListProps {
	uploadedFiles: UploadedFileUI[];
	handleRemoveFile: (id: string) => void;
	isLoading: boolean;
}

export const UploadFilesList: React.FC<IUploadFilesListProps> = ({
	uploadedFiles,
	handleRemoveFile,
	isLoading,
}) => {
	return (
		<div className="space-y-4">
			{uploadedFiles.map((file) => (
				<div
					key={file.id}
					className="card card-side bg-base-200 shadow-sm border border-base-300"
				>
					<figure className="w-32 p-4">
						<img
							src={file.preview}
							alt={file.name}
							className="w-full h-24 object-cover rounded-lg"
						/>
					</figure>

					<div className="card-body p-4 flex-1">
						<div className="flex justify-between items-start">
							<div className="flex-1">
								{/* <h4 className="font-medium truncate">{file.name}</h4> */}
								<SliceText
									text={String(file.id)}
									title={file.name}
									slice={30}
								/>
								<p className="text-sm text-base-content/60">{file.size}</p>
								<div className="mt-2">
									<FileStatus file={file} />
								</div>
							</div>

							<button
								onClick={(e) => {
									e.stopPropagation();
									handleRemoveFile(file.id);
								}}
								className="btn btn-ghost btn-sm btn-circle"
								disabled={isLoading}
								type="button"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<title>Close</title>
									<path
										fillRule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
