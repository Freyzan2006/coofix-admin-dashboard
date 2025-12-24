export interface UploadedFile {
	id: string;
	file: File;
	preview: string;
	name: string;
	size: string;
	progress: number;
	status: "uploading" | "success" | "error";
}
