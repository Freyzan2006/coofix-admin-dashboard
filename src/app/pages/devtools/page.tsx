import {
	ImageDropzoneV2,
	type UploadedImage,
	useUploadForm,
} from "@modules/upload";
import { useForm } from "react-hook-form";

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

	const { field, error, minFiles, maxFiles, required } =
		useUploadForm<FormValues>({
			name: "images",
			control,
			minFiles: 0,
			maxFiles: 5,
			required: false,
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
				maxFiles={maxFiles}
				minFiles={minFiles}
				error={error}
				required={required}
			/>

			<button type="submit">Submit</button>
		</form>
	);
}
