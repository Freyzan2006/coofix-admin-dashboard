import {
	type Control,
	type FieldValues,
	type Path,
	useController,
} from "react-hook-form";
import type { UploadedImage } from "../types";

interface IUseUploadForm<T extends FieldValues> {
	name: Path<T>;
	control: Control<T>;
	minFiles?: number;
	maxFiles?: number;
	required?: boolean;
}

export function useUploadForm<T extends FieldValues>({
	name,
	control,
	minFiles = 0,
	maxFiles = 10,
	required = false,
}: IUseUploadForm<T>) {
	const {
		field,
		fieldState: { error },
	} = useController({
		name,
		control,
		rules: {
			required: required ? "Это поле обязательно для заполнения" : false,
			validate: (value: unknown) => {
				const images = (value as UploadedImage[]) || [];

				if (minFiles > 0 && images.length < minFiles) {
					return `Минимум ${minFiles} фото требуется`;
				}

				if (images.length > maxFiles) {
					return `Максимум ${maxFiles} фото разрешено`;
				}

				return true;
			},
		},
	});

	const typedField = {
		...field,
		value: (field.value as UploadedImage[]) || [],
	};

	return {
		imagesField: typedField,
		imagesError: error,
		minFiles,
		maxFiles,
		required,
	};
}
