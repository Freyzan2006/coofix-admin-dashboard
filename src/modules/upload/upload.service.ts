import type { IUploadApi } from "./upload.api";
import type { ImageModel } from "./upload.model";

export interface IUploadImageService {
	uploadImage(file: File): Promise<ImageModel>;
	uploadImages(files: File[]): Promise<ImageModel[]>;
}

export class UploadImageService implements IUploadImageService {
	constructor(private uploadApi: IUploadApi) {}

	public async uploadImage(file: File): Promise<ImageModel> {
		return this.uploadApi.single(file);
	}

	public async uploadImages(files: File[]): Promise<ImageModel[]> {
		return this.uploadApi.multiple(files);
	}
}
