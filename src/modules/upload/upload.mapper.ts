import type { UploadedImage } from "./types";

export interface ImageSplitsResult {
	remoteUrls: string[];
	localFiles: File[];
}

export interface ImageSplitResult {
	remoteUrls: string;
	localFiles: File;
}

export interface IUploadImageMapper {
	split(image: UploadedImage): ImageSplitResult;
	splits(images: UploadedImage[]): ImageSplitsResult;

	toUploadedImages(items: (File | string)[]): UploadedImage[];
	toUploadedImage(item: File | string): UploadedImage;

	toUrl(images: UploadedImage | null): string;
	toUrls(images: UploadedImage[]): string[];
}

export class UploadImageMapper implements IUploadImageMapper {
	public split(image: UploadedImage): ImageSplitResult {
		return {
			remoteUrls: image.kind === "remote" ? image.url : "",
			localFiles: image.kind === "local" ? image.file : new File([], ""),
		};
	}

	public splits(images: UploadedImage[]): ImageSplitsResult {
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
		return items.map((item) => this.toUploadedImage(item));
	}

	public toUploadedImage(item: File | string): UploadedImage {
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
	}

	public toUrl(image: UploadedImage | null): string {
		if (!image) return "";
		if (image.kind === "remote") return image.url;
		return URL.createObjectURL(image.file);
	}

	public toUrls(images: UploadedImage[]): string[] {
		return images.map((img) => this.toUrl(img));
	}
}
