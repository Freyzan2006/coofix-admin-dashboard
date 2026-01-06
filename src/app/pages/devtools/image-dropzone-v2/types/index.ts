export interface UploadedImage {
	id: string;
	kind: "local" | "remote";
	file?: File;
	url?: string;
	preview?: string;
	name?: string;
	size?: number;
}

export interface UploadedFileUI {
	id: string;
	preview: string;
	status: "uploading" | "success" | "error";
	name?: string;
	size?: string;
	progress?: number;
}
