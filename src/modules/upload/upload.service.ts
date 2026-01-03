import type { IUploadApi } from "./upload.api";

export interface IUploadImageService {
	uploadImage(file: File): Promise<string>;
	uploadImages(files: File[]): Promise<string[]>;
}

export class UploadImageService implements IUploadImageService {
	constructor(private uploadApi: IUploadApi) {}

	public async uploadImage(file: File): Promise<string> {
		return this.uploadApi.single(file);
	}

	public async uploadImages(files: File[]): Promise<string[]> {
		return this.uploadApi.multiple(files);
	}
}
