import type { UploadedImage } from "./types";

export interface ImageSplitResult {
	remoteUrls: string[];
	localFiles: File[];
}

export interface IUploadImageMapper {
	split(images: UploadedImage[]): ImageSplitResult;
	toUploadedImages(items: (File | string)[]): UploadedImage[];
}

export class UploadImageMapper implements IUploadImageMapper {
	public split(images: UploadedImage[]): ImageSplitResult {
		return {
			remoteUrls: images
				.filter((img) => img.kind === "remote")
				.map((img) => img.url),

			localFiles: images
				.filter((img) => img.kind === "local")
				.map((img) => img.file),
		};
	}

	public toUploadedImages(items: (File | string)[]): UploadedImage[] {
		return items.map((item) => {
			if (typeof item === "string") {
				return {
					id: crypto.randomUUID(),
					kind: "remote",
					url: item,
				};
			}
			return {
				id: crypto.randomUUID(),
				kind: "local",
				file: item,
				preview: URL.createObjectURL(item),
			};
		});
	}
}
