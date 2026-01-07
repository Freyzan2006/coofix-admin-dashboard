import { CheckIcon, CloudUploadIcon, UploadIcon } from "lucide-react";

import { formatFileSize } from "../utils/format.util";

interface IUploadedInfoProps {
	isDragging: boolean;
	uploadSuccess: boolean;
	isLoading?: boolean;
	maxSize: number;
	minFiles: number;
	maxFiles?: number;
	fileCount: number;
}

export const UploadedInfo: React.FC<IUploadedInfoProps> = ({
	isDragging,
	uploadSuccess,
	isLoading,
	minFiles,
	maxFiles,
	maxSize,
	fileCount,
}) => {
	return (
		<>
			<div className="relative">
				<div
					className={`
							transition-all duration-300
							${uploadSuccess ? "scale-0 opacity-0" : "scale-100 opacity-100"}
						`}
				>
					{isDragging ? (
						<div
							className="text-primary"
							style={{
								animation: "bounce 1s infinite",
							}}
						>
							<UploadIcon className="h-12 w-12" />
						</div>
					) : (
						<CloudUploadIcon className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
					)}
				</div>

				{/* Иконка успеха */}
				<div
					className={`
							absolute inset-0 flex items-center justify-center transition-all duration-300
							${uploadSuccess ? "scale-100 opacity-100" : "scale-0 opacity-0"}
						`}
					style={{
						animation: uploadSuccess ? "bounceIn 0.5s ease-out" : undefined,
					}}
				>
					<CheckIcon className="h-12 w-12 text-success" />
				</div>

				{/* Вращающаяся иконка при загрузке */}
				{isLoading && (
					<div className="absolute inset-0 flex items-center justify-center">
						<div
							className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"
							style={{
								animation: "spin 1s linear infinite",
							}}
						/>
					</div>
				)}
			</div>

			<div className="space-y-2">
				<p
					className="text-lg font-medium transition-all duration-300"
					style={{
						animation: uploadSuccess ? "popIn 0.3s ease-out" : undefined,
					}}
				>
					{uploadSuccess ? (
						<span className="text-success">✓ Файлы загружены!</span>
					) : isDragging ? (
						<span className="text-primary">Отпустите для загрузки</span>
					) : (
						"Перетащите файлы сюда"
					)}
				</p>

				<div
					className="space-y-1"
					style={{
						animation: "slideDown 0.5s ease-out",
					}}
				>
					<p className="text-sm text-base-content/60">
						Поддерживаются форматы: JPG, PNG, GIF, WebP
					</p>
					<p className="text-sm text-base-content/60">
						Максимальный размер: {formatFileSize(maxSize)} на файл
					</p>
					<p className="text-sm text-base-content/60">
						Максимум файлов: {maxFiles}
					</p>

					{minFiles > 0 && (
						<p className="text-sm text-warning font-medium">
							Минимум файлов: {minFiles}
						</p>
					)}
				</div>

				{/* Индикатор количества загружаемых файлов */}
				{fileCount > 0 && (
					<p
						className="text-sm text-primary font-medium mt-2"
						style={{
							animation: "slideDown 0.3s ease-out",
						}}
					>
						Загружено {fileCount} файл{fileCount > 1 ? "ов" : ""}
					</p>
				)}
			</div>
		</>
	);
};
