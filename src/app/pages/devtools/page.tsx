import { useForm } from "react-hook-form";
import {
	ImageDropzoneV2,
	type UploadedImage,
	useUploadForm,
} from "./image-dropzone-v2";

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
		mode: "onChange",
	});

	const { imagesField, imagesError, minFiles, maxFiles, required } =
		useUploadForm<FormValues>({
			name: "images",
			control,
			minFiles: 0,
			maxFiles: 5,
			required: true,
		});

	const onSubmit = (data: FormValues) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex w-300">
			<input {...control.register("title")} />

			<ImageDropzoneV2
				images={imagesField.value}
				onChange={imagesField.onChange}
				maxFiles={maxFiles}
				minFiles={minFiles}
				error={imagesError?.message}
				required={required}
			/>

			<button type="submit">Submit</button>
		</form>
	);
}
