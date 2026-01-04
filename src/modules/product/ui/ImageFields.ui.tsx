import { ImageDropzone } from "@modules/upload";
import type { UploadedImage } from "@modules/upload/types";
import type React from "react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface ImageFieldsProps {
	initialImages: UploadedImage[];
	onChange?: (images: UploadedImage[]) => void;
}

export const ImageFields: React.FC<ImageFieldsProps> = ({
	initialImages,
	onChange,
}) => {
	const { setValue } = useFormContext();
	const [images, setLocalImages] = useState<UploadedImage[]>(
		initialImages || [],
	);

	useEffect(() => {
		setLocalImages(initialImages || []);
	}, [initialImages]);

	const handleChange = (newImages: UploadedImage[]) => {
		setLocalImages(newImages);

		// передаём наверх
		if (onChange) onChange(newImages);

		// только локальные файлы в форму
		setValue(
			"images",
			newImages.filter((img) => img.kind === "local").map((img) => img.file),
		);
	};

	return (
		<ImageDropzone
			images={images}
			onChange={handleChange}
			maxFiles={5}
			maxSize={10 * 1024 * 1024}
			isLoading={false}
		/>
	);
};
