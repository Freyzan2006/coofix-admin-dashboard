export type UploadedImage =
	| {
			id: string;
			kind: "remote";
			url: string;
	  }
	| {
			id: string;
			kind: "local";
			file: File;
			preview: string;
	  };

export interface UploadedFileUI {
	id: string;
	preview: string;
	name?: string;
	size?: string;
	progress?: number;
	status: "uploading" | "success" | "error";
}
