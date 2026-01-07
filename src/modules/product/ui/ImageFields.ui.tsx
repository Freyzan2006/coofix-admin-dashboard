import { ImageDropzoneV2, type IUseUploadFormReturn } from "@modules/upload";

import type React from "react";

interface ImageFieldsProps {
	images: IUseUploadFormReturn;
}

export const ImageFields: React.FC<ImageFieldsProps> = ({ images }) => {
	return (
		<ImageDropzoneV2
			images={images.field.value}
			onChange={images.field.onChange}
			maxFiles={images.maxFiles}
			minFiles={images.minFiles}
			required={images.required}
		/>
	);
};
