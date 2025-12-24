import type { UploadedFile } from "../types";

interface FileStatusProps {
	file: UploadedFile;
}

export const FileStatus: React.FC<FileStatusProps> = ({ file }) => {
	switch (file.status) {
		case "uploading":
			return (
				<>
					<div className="flex items-center gap-2">
						<span className="loading loading-spinner loading-xs"></span>
						<span>Загрузка...</span>
					</div>
					<progress
						className="progress progress-primary w-full"
						value={file.progress}
						max="100"
					></progress>
				</>
			);
		case "success":
			return (
				<div className="flex items-center gap-2 text-success">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<title>Success</title>
						<path
							fillRule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
					<span>Загружено</span>
				</div>
			);
		case "error":
			return (
				<div className="flex items-center gap-2 text-error">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<title>Error</title>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clipRule="evenodd"
						/>
					</svg>
					<span>Ошибка</span>
				</div>
			);
	}
};
