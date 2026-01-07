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

interface IUseUploadFormReturn {
	imagesField: {
		value: UploadedImage[];
		onChange: (images: UploadedImage[]) => void;
	};
	imagesError: string | undefined;
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
}: IUseUploadForm<T>): IUseUploadFormReturn {
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
		imagesError: error?.message,
		minFiles,
		maxFiles,
		required,
	};
}
