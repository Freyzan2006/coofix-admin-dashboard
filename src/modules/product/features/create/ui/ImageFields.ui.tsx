import { ImageDropzone } from "@shared/features/UploadFile";

export const ImageFields: React.FC = () => {
	return (
		<ImageDropzone
			name="images"
			maxFiles={5}
			maxSize={10 * 1024 * 1024} // 10MB
			onFilesChange={(files) => console.log("Files changed:", files)}
		/>
	);
};
