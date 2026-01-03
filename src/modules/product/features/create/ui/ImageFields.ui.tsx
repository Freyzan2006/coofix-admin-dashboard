import type { CreateProductModel } from "@modules/product/model/create-product.model";
import { ImageDropzone } from "@shared/features/UploadFile";

import { Controller, useFormContext } from "react-hook-form";

export const ImageFields: React.FC = () => {
	const { control } = useFormContext<CreateProductModel>();
	const maxFiles = 5;
	const maxSize = 10 * 1024 * 1024;

	return (
		<Controller
			name="images"
			control={control}
			rules={{
				validate: (files: File[]) => {
					if (files.length > maxFiles)
						return `Максимум ${maxFiles} изображений`;
					return true;
				},
			}}
			render={({ field, fieldState }) => (
				<ImageDropzone
					value={field.value ?? []}
					onChange={field.onChange}
					maxFiles={maxFiles}
					maxSize={maxSize}
					error={fieldState.error?.message}
				/>
			)}
		/>
	);
};
