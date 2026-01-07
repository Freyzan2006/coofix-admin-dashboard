import { CheckIcon, CircleXIcon } from "lucide-react";
import type { UploadedFileUI } from "../types";

interface FileStatusProps {
	file: UploadedFileUI;
}

export const FileStatus: React.FC<FileStatusProps> = ({ file }) => {
	switch (file.status) {
		case "uploading":
			return (
				<div className="space-y-2">
					<div
						className="flex items-center gap-2"
						style={{
							animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
						}}
					>
						<div
							className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full"
							style={{
								animation: "spin 1s linear infinite",
							}}
						/>
						<span className="text-sm font-medium">Загрузка...</span>
					</div>
					<div className="w-full bg-base-300 rounded-full h-1.5 overflow-hidden">
						<div
							className="h-full bg-primary rounded-full relative overflow-hidden"
							style={{ width: `${file.progress || 0}%` }}
						>
							{/* Эффект движения */}
							{file.progress && file.progress < 100 && (
								<div
									className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
									style={{
										animation: "progressLoading 1.5s ease-in-out infinite",
										transform: `translateX(-100%)`,
									}}
								/>
							)}
						</div>
					</div>
				</div>
			);
		case "success":
			return (
				<div
					className="flex items-center gap-2 text-success"
					style={{
						animation: "bounceIn 0.5s ease-out",
					}}
				>
					<div className="w-5 h-5 bg-success/20 rounded-full flex items-center justify-center">
						<CheckIcon />
					</div>
					<span className="text-sm font-medium">Загружено</span>
				</div>
			);
		case "error":
			return (
				<div
					className="flex items-center gap-2 text-error"
					style={{
						animation: "shake 0.5s ease-in-out",
					}}
				>
					<div className="w-5 h-5 bg-error/20 rounded-full flex items-center justify-center">
						<CircleXIcon />
					</div>
					<span className="text-sm font-medium">Ошибка</span>
				</div>
			);
	}
};
