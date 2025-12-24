import type React from "react";
import { Controller } from "react-hook-form";
import { useActionFile } from "./hooks/use-action-file.hook";
import { useUploadImgs } from "./hooks/use-upload-imgs.hook";

import { Uploaded } from "./ui/Uploaded.widget";

interface ImageDropzoneProps {
	name?: string;
	maxFiles?: number;
	maxSize?: number; // в байтах
	onFilesChange?: (files: File[]) => void;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
	name = "images",
	maxFiles = 10,
	maxSize = 5 * 1024 * 1024, // 5MB по умолчанию
	onFilesChange,
}) => {
	const {
		handleFiles,
		control,
		isLoading,
		error,
		uploadedFiles,
		fileInputRef,
		setUploadedFiles,
		updateFormFiles,
		setValue,
	} = useUploadImgs({
		name,
		maxFiles,
		maxSize,
		onFilesChange,
	});

	const { handleRemoveFile, handleClearAll } = useActionFile({
		handleFiles,
		name,
		fileInputRef,
		uploadedFiles,
		setUploadedFiles,
		updateFormFiles,
		onFilesChange,
		setValue,
	});

	return (
		<div className="w-full">
			<Controller
				name={name}
				control={control}
				rules={{
					validate: (value) => {
						if (!value || value.length === 0) {
							return "Изображения обязательны";
						}
						if (value.length > maxFiles) {
							return `Максимум ${maxFiles} изображений`;
						}
						return true;
					},
				}}
				render={({ fieldState }) => (
					<Uploaded
						fieldState={fieldState}
						uploadedFiles={uploadedFiles}
						isLoading={isLoading}
						maxFiles={maxFiles}
						handleRemoveFile={handleRemoveFile}
						handleClearAll={handleClearAll}
						fileInputRef={fileInputRef}
						maxSize={maxSize}
						error={error}
						handleFiles={handleFiles}
					/>
				)}
			/>
		</div>
	);
};
