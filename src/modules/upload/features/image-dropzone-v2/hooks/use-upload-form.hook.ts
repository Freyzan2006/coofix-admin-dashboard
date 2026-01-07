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
	defaultValue?: UploadedImage[];
}

export interface IUseUploadFormReturn {
	field: {
		value: UploadedImage[];
		onChange: (images: UploadedImage[]) => void;
	};
	error: string | undefined;
	minFiles: number;
	maxFiles: number;
	required: boolean;
}

/**
 * Hook для работы с полем загрузки файлов.
 * Он возвращает объект с полями imagesField (поле для ввода файлов), imagesError (ошибка валидации), minFiles, maxFiles, required.
 * @param {IUseUploadForm<T>} props - объект с настройками
 * @returns {IUseUploadFormReturn} - объект с полями imagesField, imagesError, minFiles, maxFiles, required
 */
export function useUploadForm<T extends FieldValues>({
	name,
	control,
	minFiles = 0,
	maxFiles = 10,
	required = false,
	defaultValue = [],
}: IUseUploadForm<T>): IUseUploadFormReturn {
	const {
		field,
		fieldState: { error },
	} = useController({
		name,
		control,
		rules: {
			required: required ? "Это поле обязательно для заполнения" : false,
			validate: (value: UploadedImage[]) => {
				const images = value || [];

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
		value: field.value || defaultValue,
	};

	return {
		field: typedField,
		error: error?.message,
		minFiles,
		maxFiles,
		required,
	};
}
