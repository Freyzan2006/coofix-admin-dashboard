import { useEffect, useState } from "react";
import type { UploadedFileUI } from "../types";
import { BanIcon, CheckIcon, LockIcon, XIcon } from "lucide-react";
import { Loading } from "@shared/ui/Loading.ui";
import { SliceText } from "@shared/ui/text";
import { FileStatus } from "./FileStatus.ui";

interface FileItemProps {
	file: UploadedFileUI;
	index: number;
	handleRemoveFile: (id: string) => void;
	isLoading: boolean;
	disabled?: boolean;
	canRemove?: boolean;
	minFiles?: number;
	currentCount?: number;
}

export const FileItem: React.FC<FileItemProps> = ({
	file,
	index,
	handleRemoveFile,
	isLoading,
	disabled = false,
	canRemove = true,
	minFiles = 0,
}) => {
	const [isRemoving, setIsRemoving] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	// Анимация появления с задержкой
	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), index * 50);
		return () => clearTimeout(timer);
	}, [index]);

	const handleRemove = () => {
		setIsRemoving(true);
		setTimeout(() => {
			handleRemoveFile(file.id);
		}, 300);
	};

	return (
		<div
			className={`
        card card-side bg-base-200 shadow-sm border border-base-300
        transition-all duration-300 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        ${isRemoving ? "opacity-0 -translate-y-4 scale-95" : ""}
        ${disabled ? "opacity-70" : ""}
      `}
			style={{
				animation: isVisible
					? "0.3s ease-out 0s 1 normal forwards running fadeIn"
					: undefined,
			}}
		>
			<figure className="w-32 p-4 relative">
				{/* Превью с анимацией */}
				<div className="relative w-full h-24 overflow-hidden rounded-lg">
					<img
						src={file.preview}
						alt={file.name || "Uploaded image"}
						className={`
              w-full h-full object-cover
              transition-all duration-300
              ${
								file.status === "uploading"
									? "opacity-50 blur-[1px]"
									: "opacity-100"
							}
              ${isRemoving ? "scale-110" : ""}
            `}
					/>

					{/* Наложение при загрузке */}
					{file.status === "uploading" && (
						<div className="absolute inset-0 bg-black/30 flex items-center justify-center">
							<div className="flex flex-col items-center gap-2">
								<div className="w-8 h-8 border-2 border-white/50 border-t-white rounded-full animate-[spin_1s_linear_infinite]"></div>
								<span className="text-xs text-white font-medium">
									{file.progress || 0}%
								</span>
							</div>
						</div>
					)}

					{/* Успешная загрузка - галочка */}
					{file.status === "success" && (
						<div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center animate-[bounceIn_0.5s_ease-out]">
							<CheckIcon />
						</div>
					)}

					{/* Ошибка - крестик */}
					{file.status === "error" && (
						<div className="absolute -top-2 -right-2 w-8 h-8 bg-error rounded-full flex items-center justify-center animate-[shake_0.5s_ease-in-out]">
							<BanIcon />
						</div>
					)}
				</div>

				{/* Круговой прогресс-бар */}
				{file.status === "uploading" && (
					<div className="absolute -top-2 -right-2">
						<div className="relative w-8 h-8">
							<Loading />
						</div>
					</div>
				)}
			</figure>

			<div className="card-body p-4 flex-1">
				<div className="flex justify-between items-start">
					<div className="flex-1 min-w-0">
						{/* Анимация появления названия */}
						<div
							className="flex items-center gap-2 mb-1 animate-[slideDown_0.3s_ease-out]"
							style={{ animationDelay: `${index * 50 + 100}ms` }}
						>
							<SliceText
								text={file.name || String(file.id)}
								title={file.name}
								slice={30}
							/>
						</div>

						{/* Размер файла с анимацией */}
						{file.size && (
							<p
								className="text-sm text-base-content/60 mb-2 animate-[slideDown_0.3s_ease-out]"
								style={{ animationDelay: `${index * 50 + 150}ms` }}
							>
								{file.size}
							</p>
						)}

						{/* Статус файла */}
						<div className="mt-2">
							<FileStatus file={file} />
						</div>

						{/* Линейный прогресс-бар с анимацией */}
						{file.status === "uploading" && (
							<div
								className="mt-3 animate-[slideUp_0.3s_ease-out]"
								style={{ animationDelay: `${index * 50 + 200}ms` }}
							>
								<div className="flex justify-between text-xs text-base-content/60 mb-1">
									<span>Загрузка...</span>
									<span className="font-medium">{file.progress || 0}%</span>
								</div>
								<div className="h-1.5 bg-base-300 rounded-full overflow-hidden">
									{/* Бегущая полоска для индикации активности */}
									<div className="relative h-full overflow-hidden rounded-full">
										<div
											className="absolute h-full bg-primary rounded-full transition-all duration-300 ease-out"
											style={{ width: `${file.progress || 0}%` }}
										/>
										{/* Эффект "бегущей" анимации */}
										{file.progress && file.progress < 100 && (
											<div className="absolute inset-0">
												<div
													className="h-full w-1/3 bg-white/30 rounded-full"
													style={{
														animation:
															"progressLoading 1.5s ease-in-out infinite",
														transform: `translateX(-100%)`,
													}}
												/>
											</div>
										)}
									</div>
								</div>
							</div>
						)}
					</div>

					{canRemove && !disabled ? (
						<button
							onClick={handleRemove}
							className={`
            btn btn-ghost btn-sm btn-circle
            transition-all duration-200 ease-out
            hover:scale-110 hover:bg-error/20 active:scale-95
            ${isLoading ? "opacity-50" : ""}
            ${isRemoving ? "scale-90 opacity-0" : ""}
          `}
							disabled={isLoading || !canRemove}
							type="button"
							aria-label={`Удалить ${file.name || "файл"}`}
							title={
								!canRemove
									? `Нельзя удалить. Минимум ${minFiles} файл(ов) требуется`
									: ""
							}
						>
							<XIcon />
						</button>
					) : (
						<div
							className="w-10 h-10 flex items-center justify-center text-base-content/40"
							title={`Нельзя удалить. Минимум ${minFiles} файл(ов) требуется`}
						>
							<LockIcon />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};