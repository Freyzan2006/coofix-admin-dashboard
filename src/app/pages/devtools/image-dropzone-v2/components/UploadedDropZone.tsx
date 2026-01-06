// import { CloudUploadIcon, UploadIcon, CheckIcon } from "lucide-react";
// import { useState, useEffect, useCallback } from "react";
// import { useDragging } from "../hooks/use-dragging.hook";
// import { formatFileSize } from "../utils/format.util";

// interface IUploadedDropZoneProps {
//   handleFiles: (files: FileList) => void;
//   fileInputRef: React.RefObject<HTMLInputElement | null>;
//   isLoading?: boolean;
//   maxSize: number;
//   maxFiles: number;
//   accept?: string;
//   canAddMore?: boolean;
// }

// export const UploadedDropZone: React.FC<IUploadedDropZoneProps> = ({
//   handleFiles,
//   fileInputRef,
//   isLoading,
//   maxSize,
//   maxFiles,
//   accept = "image/*",
//   canAddMore = true,
// }) => {
//   const {
//     isDragging,
//     handleDragEnter,
//     handleDragOver,
//     handleDragLeave,
//     handleDrop,
//     handleDropzoneClick,
//     handleFileInput,
//   } = useDragging({
//     handleFiles,
//     fileInputRef,
//     disabled: isLoading
//   });

//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [fileCount, setFileCount] = useState(0);

//   // Анимация успешной загрузки
//   useEffect(() => {
//     if (fileCount > 0) {
//       setUploadSuccess(true);
//       const timer = setTimeout(() => setUploadSuccess(false), 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [fileCount]);

//   const handleFileDrop = useCallback((e: React.DragEvent) => {
//     handleDrop?.(e);
//     if (e.dataTransfer.files) {
//       setFileCount(e.dataTransfer.files.length);
//     }
//   }, [handleDrop]);

//   const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     handleFileInput?.(e);
//     if (e.target.files) {
//       setFileCount(e.target.files.length);
//     }
//   }, [handleFileInput]);

//   const handleSelectFilesClick = useCallback((e: React.MouseEvent) => {
//     e.stopPropagation();
//     e.preventDefault();

//     if (!isLoading && fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   }, [isLoading, fileInputRef]);

//   const handleSectionClick = useCallback((e: React.MouseEvent) => {
//     const target = e.target as HTMLElement;
//     const isButtonClick = target.closest('button[type="button"]');

//     if (!isLoading && !isButtonClick) {
//       handleDropzoneClick?.();
//     }
//   }, [isLoading, handleDropzoneClick]);

//   if (!canAddMore) {
//     return (
//       <div
//         className="border-2 border-dashed border-base-300 rounded-xl p-8 text-center bg-base-100"
//         style={{
//           animation: "fadeIn 0.5s ease-out"
//         }}
//       >
//         <p className="text-lg font-medium">
//           Достигнуто максимальное количество файлов ({maxFiles})
//         </p>
//       </div>
//     );
//   }

//   return (
//     <section
//       aria-label="Область для загрузки файлов"
//       className={`
//         border-2 border-dashed rounded-xl p-8 text-center
//         transition-all duration-300 mb-4 relative overflow-hidden
//         ${isDragging
//           ? "border-primary bg-primary/10 scale-[1.02] shadow-lg shadow-primary/20"
//           : "border-base-300"
//         }
//         ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
//         ${uploadSuccess
//           ? "border-success bg-success/5"
//           : ""
//         }
//         group
//       `}
//       style={{
//         animation: "fadeIn 0.5s ease-out"
//       }}
//       onDragEnter={!isLoading ? handleDragEnter : undefined}
//       onDragOver={!isLoading ? handleDragOver : undefined}
//       onDragLeave={!isLoading ? handleDragLeave : undefined}
//       onDrop={!isLoading ? handleFileDrop : undefined}
//       onClick={!isLoading ? handleSectionClick : undefined}
//     >
//       {/* Эффект пульсации при dragging */}
//       {isDragging && (
//         <>
//           <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
//           <div
//             className="absolute inset-4 border-4 border-primary/20 rounded-lg"
//             style={{
//               animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite"
//             }}
//           />
//         </>
//       )}

//       {/* Эффект успешной загрузки */}
//       {uploadSuccess && (
//         <div
//           className="absolute inset-0 bg-success/5"
//           style={{
//             animation: "fadeOut 2s ease-out forwards"
//           }}
//         />
//       )}

//       {/* УБИРАЕМ overlay-кнопку - она нам больше не нужна */}
//       {/* <button
//         type="button"
//         className="absolute inset-0 w-full h-full cursor-pointer bg-transparent border-none"
//         onClick={handleDropzoneClick}
//         disabled={isLoading}
//         aria-label="Перетащите или кликните для загрузки файлов"
//       /> */}

//       <div className="relative z-10 flex flex-col items-center justify-center gap-4">
//         {/* Анимированная иконка */}
//         <div className="relative">
//           <div
//             className={`
//               transition-all duration-300
//               ${uploadSuccess
//                 ? "scale-0 opacity-0"
//                 : "scale-100 opacity-100"
//               }
//             `}
//           >
//             {isDragging ? (
//               <div
//                 className="text-primary"
//                 style={{
//                   animation: "bounce 1s infinite"
//                 }}
//               >
//                 <UploadIcon className="h-12 w-12" />
//               </div>
//             ) : (
//               <CloudUploadIcon className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
//             )}
//           </div>

//           {/* Иконка успеха */}
//           <div
//             className={`
//               absolute inset-0 flex items-center justify-center transition-all duration-300
//               ${uploadSuccess
//                 ? "scale-100 opacity-100"
//                 : "scale-0 opacity-0"
//               }
//             `}
//             style={{
//               animation: uploadSuccess ? "bounceIn 0.5s ease-out" : undefined
//             }}
//           >
//             <CheckIcon className="h-12 w-12 text-success" />
//           </div>

//           {/* Вращающаяся иконка при загрузке */}
//           {isLoading && (
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div
//                 className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"
//                 style={{
//                   animation: "spin 1s linear infinite"
//                 }}
//               />
//             </div>
//           )}
//         </div>

//         <div className="space-y-2">
//           <p
//             className="text-lg font-medium transition-all duration-300"
//             style={{
//               animation: uploadSuccess ? "popIn 0.3s ease-out" : undefined
//             }}
//           >
//             {uploadSuccess ? (
//               <span className="text-success">✓ Файлы загружены!</span>
//             ) : isDragging ? (
//               <span className="text-primary">Отпустите для загрузки</span>
//             ) : (
//               "Перетащите файлы сюда"
//             )}
//           </p>

//           <div
//             className="space-y-1"
//             style={{
//               animation: "slideDown 0.5s ease-out"
//             }}
//           >
//             <p className="text-sm text-base-content/60">
//               Поддерживаются форматы: JPG, PNG, GIF, WebP
//             </p>
//             <p className="text-sm text-base-content/60">
//               Максимальный размер: {formatFileSize(maxSize)} на файл
//             </p>
//             <p className="text-sm text-base-content/60">
//               Максимум файлов: {maxFiles}
//             </p>
//           </div>

//           {/* Индикатор количества загружаемых файлов */}
//           {fileCount > 0 && (
//             <p
//               className="text-sm text-primary font-medium mt-2"
//               style={{
//                 animation: "slideDown 0.3s ease-out"
//               }}
//             >
//               Загружено {fileCount} файл{fileCount > 1 ? 'ов' : ''}
//             </p>
//           )}
//         </div>

//         <div
//           className="divider w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//           style={{
//             animation: "expand 0.5s ease-out"
//           }}
//         >
//           ИЛИ
//         </div>

//         <div className="relative z-20"> {/* Добавляем z-index чтобы кнопка была выше */}
//           <button
//             type="button"
//             className={`
//               btn btn-primary relative overflow-hidden
//               transition-all duration-300
//               hover:scale-105 active:scale-95
//               ${isLoading ? "pr-12" : ""}
//               group/btn
//             `}
//             onClick={handleSelectFilesClick}
//             disabled={isLoading}
//             style={{
//               animation: "popIn 0.3s ease-out"
//             }}
//           >
//             {isLoading ? (
//               <>
//                 <span>Загрузка...</span>
//                 <span
//                   className="absolute right-4 w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
//                   style={{
//                     animation: "spin 1s linear infinite"
//                   }}
//                 />
//               </>
//             ) : (
//               <>
//                 <CloudUploadIcon className="h-5 w-5 mr-2 transition-transform duration-300 group-hover/btn:scale-110" />
//                 Выберите файлы
//               </>
//             )}

//             {/* Эффект клика */}
//             <span className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/10 transition-colors duration-200" />
//           </button>

//           <input
//             ref={fileInputRef}
//             type="file"
//             className="hidden"
//             multiple
//             accept={accept}
//             onChange={handleFileInputChange}
//             disabled={isLoading}
//           />
//         </div>
//       </div>

//       {/* Микро-анимация при наведении */}
//       <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
//     </section>
//   );
// };

import { CheckIcon, CloudUploadIcon, UploadIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDragging } from "../hooks/use-dragging.hook";
import { formatFileSize } from "../utils/format.util";

interface IUploadedDropZoneProps {
	handleFiles: (files: FileList) => void;
	fileInputRef: React.RefObject<HTMLInputElement | null>;
	isLoading?: boolean;
	maxSize: number;
	maxFiles: number;
	minFiles: number;
	accept?: string;
	canAddMore?: boolean;
}

export const UploadedDropZone: React.FC<IUploadedDropZoneProps> = ({
	handleFiles,
	fileInputRef,
	isLoading,
	maxSize,
	minFiles = 0,
	maxFiles,
	accept = "image/*",
	canAddMore = true,
}) => {
	const {
		isDragging,
		handleDragEnter,
		handleDragOver,
		handleDragLeave,
		handleDrop,
		handleFileInput,
	} = useDragging({
		handleFiles,
		fileInputRef,
		disabled: isLoading,
	});

	const [uploadSuccess, setUploadSuccess] = useState(false);
	const [fileCount, setFileCount] = useState(0);

	// Анимация успешной загрузки
	useEffect(() => {
		if (fileCount > 0) {
			setUploadSuccess(true);
			const timer = setTimeout(() => setUploadSuccess(false), 2000);
			return () => clearTimeout(timer);
		}
	}, [fileCount]);

	const handleFileDrop = useCallback(
		(e: React.DragEvent) => {
			handleDrop?.(e);
			if (e.dataTransfer.files) {
				setFileCount(e.dataTransfer.files.length);
			}
		},
		[handleDrop],
	);

	const handleFileInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			handleFileInput?.(e);
			if (e.target.files) {
				setFileCount(e.target.files.length);
			}
		},
		[handleFileInput],
	);

	const handleSelectFilesClick = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();

			if (!isLoading && fileInputRef.current) {
				fileInputRef.current.click();
			}
		},
		[isLoading, fileInputRef],
	);

	if (!canAddMore) {
		return (
			<div
				className="border-2 border-dashed border-base-300 rounded-xl p-8 text-center bg-base-100"
				style={{
					animation: "fadeIn 0.5s ease-out",
				}}
			>
				<p className="text-lg font-medium">
					Достигнуто максимальное количество файлов ({maxFiles})
				</p>
			</div>
		);
	}

	return (
		<section
			aria-label="Область для загрузки файлов"
			className={`
        border-2 border-dashed rounded-xl p-8 text-center
        transition-all duration-300 mb-4 relative overflow-hidden
        ${
					isDragging
						? "border-primary bg-primary/10 scale-[1.02] shadow-lg shadow-primary/20"
						: "border-base-300"
				}
        ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${uploadSuccess ? "border-success bg-success/5" : ""}
        group
      `}
			style={{
				animation: "fadeIn 0.5s ease-out",
			}}
			onDragEnter={!isLoading ? handleDragEnter : undefined}
			onDragOver={!isLoading ? handleDragOver : undefined}
			onDragLeave={!isLoading ? handleDragLeave : undefined}
			onDrop={!isLoading ? handleFileDrop : undefined}
		>
			{/* Эффект пульсации при dragging */}
			{isDragging && (
				<>
					<div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
					<div
						className="absolute inset-4 border-4 border-primary/20 rounded-lg"
						style={{
							animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
						}}
					/>
				</>
			)}

			{/* Эффект успешной загрузки */}
			{uploadSuccess && (
				<div
					className="absolute inset-0 bg-success/5"
					style={{
						animation: "fadeOut 2s ease-out forwards",
					}}
				/>
			)}

			<div className="relative z-10 flex flex-col items-center justify-center gap-4">
				{/* Анимированная иконка */}
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

				<div
					className="divider w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					style={{
						animation: "expand 0.5s ease-out",
					}}
				>
					ИЛИ
				</div>

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
			</div>

			{/* Микро-анимация при наведении */}
			<div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
		</section>
	);
};
