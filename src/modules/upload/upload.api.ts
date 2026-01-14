import type { RestApiCliType } from "@shared/api/rest-api/client";
import type {
	ImageModel,
	ImageResponseDto,
	ImagesResponseDto,
} from "./upload.model";

interface UploadOptions {
	onProgress?: (percent: number) => void;
	signal?: AbortSignal;
}

export interface IUploadApi {
	single(file: File, options?: UploadOptions): Promise<ImageModel>;
	multiple(files: File[], options?: UploadOptions): Promise<ImageModel[]>;
}

export class UploadRestApi implements IUploadApi {
	constructor(private readonly client: RestApiCliType) {}

	async single(file: File, options?: UploadOptions): Promise<ImageModel> {
		const formData = new FormData();
		formData.append("image", file);

		const response = await this.client.post<ImageResponseDto>(
			"/upload/single",
			formData,
			{
				signal: options?.signal,
				onUploadProgress: (e) => {
					if (!options?.onProgress || !e.total) return;
					options.onProgress(Math.round((e.loaded / e.total) * 100));
				},
			},
		);

		return response.data.image;
	}

	async multiple(
		files: File[],
		options?: UploadOptions,
	): Promise<ImageModel[]> {
		const formData = new FormData();
		files.forEach((f) => {
			formData.append("images", f);
		});

		const response = await this.client.post<ImagesResponseDto>(
			"/upload/multiple",
			formData,
			{
				signal: options?.signal,
				onUploadProgress: (e) => {
					if (!options?.onProgress || !e.total) return;
					options.onProgress(Math.round((e.loaded / e.total) * 100));
				},
			},
		);

		return response.data.images;
	}
}
