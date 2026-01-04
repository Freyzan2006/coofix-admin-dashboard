import type { RestApiCliType } from "@shared/api/rest-api/client";

interface UploadOptions {
	onProgress?: (percent: number) => void;
	signal?: AbortSignal;
}

export interface IUploadApi {
	single(file: File, options?: UploadOptions): Promise<string>;
	multiple(files: File[], options?: UploadOptions): Promise<string[]>;
}

export class UploadRestApi implements IUploadApi {
	constructor(private readonly client: RestApiCliType) {}

	async single(file: File, options?: UploadOptions): Promise<string> {
		const formData = new FormData();
		formData.append("image", file);

		const response = await this.client.post<{ url: string }>(
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

		return response.data.url;
	}

	async multiple(files: File[], options?: UploadOptions): Promise<string[]> {
		const formData = new FormData();
		files.forEach((f) => {
			formData.append("images", f);
		});

		const response = await this.client.post<{ urls: string[] }>(
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

		return response.data.urls;
	}
}
