import { CloudUploadIcon } from "lucide-react";

interface IUploadedButtonProps {
	handleSelectFilesClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
	isLoading?: boolean;
	fileInputRef: React.RefObject<HTMLInputElement | null>;
	accept?: string;
	handleFileInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UploadedButton: React.FC<IUploadedButtonProps> = ({
	handleSelectFilesClick,
	handleFileInputChange,
	isLoading = false,
	fileInputRef,
	accept = "image/*",
}) => {
	return (
		<div className="relative z-20">
			{" "}
			{/* Добавляем z-index чтобы кнопка была выше */}
			<button
				type="button"
				className={`
                            btn btn-primary relative overflow-hidden
                            transition-all duration-300
                            hover:scale-105 active:scale-95
                            ${isLoading ? "pr-12" : ""}
                            group/btn
                        `}
				onClick={handleSelectFilesClick}
				disabled={isLoading}
				style={{
					animation: "popIn 0.3s ease-out",
				}}
			>
				{isLoading ? (
					<>
						<span>Загрузка...</span>
						<span
							className="absolute right-4 w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
							style={{
								animation: "spin 1s linear infinite",
							}}
						/>
					</>
				) : (
					<>
						<CloudUploadIcon className="h-5 w-5 mr-2 transition-transform duration-300 group-hover/btn:scale-110" />
						Выберите файлы
					</>
				)}

				{/* Эффект клика */}
				<span className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/10 transition-colors duration-200" />
			</button>
			<input
				ref={fileInputRef}
				type="file"
				className="hidden"
				multiple
				accept={accept}
				onChange={handleFileInputChange}
				disabled={isLoading}
			/>
		</div>
	);
};
