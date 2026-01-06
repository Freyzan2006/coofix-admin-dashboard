import { useController, useForm } from "react-hook-form";
import { ImageDropzoneV2, type UploadedImage } from "./image-dropzone-v2";

interface FormValues {
	images: UploadedImage[];
	title: string;
}

export default function DevToolsPage() {
	const { control, handleSubmit } = useForm<FormValues>({
		defaultValues: {
			images: [],
			title: "",
		},
	});

	const {
		field,
		fieldState: { error },
	} = useController({
		name: "images",
		control,
		rules: {
			required: "Загрузите хотя бы 2 фото",
			validate: (value) => {
				const images = value || [];
				if (images.length < 2) {
					return "Минимум 2 фото требуется";
				}
				return true;
			},
		},
	});

	const onSubmit = (data: FormValues) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex w-300">
			<input {...control.register("title")} />

			<ImageDropzoneV2
				images={field.value}
				onChange={field.onChange}
				maxFiles={5}
				minFiles={2}
				error={error?.message}
				required={true}
			/>

			<button type="submit">Submit</button>
		</form>
	);
}
