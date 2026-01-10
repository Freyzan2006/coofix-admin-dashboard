import type { UploadedImage } from "@modules/upload/features/image-dropzone-v2";
import type { ImageModel } from "./upload.model";
import { isImageModel } from "./upload.utils";

export interface ImageSplitsResult {
	remoteUrls: string[];
	localFiles: File[];
}

export interface ImageSplitResult {
	remoteUrl?: string;
	localFile?: File;
}

export interface IUploadImageMapper {
	split(image: UploadedImage): ImageSplitResult;
	splits(images: UploadedImage[]): ImageSplitsResult;

	toUploadedImages(items: (File | ImageModel | string)[]): UploadedImage[];
	toUploadedImage(item: File | ImageModel | string): UploadedImage;

	toUrl(image: UploadedImage | null): string;
	toUrls(images: UploadedImage[]): string[];
}

export class UploadImageMapper implements IUploadImageMapper {
	public split(image: UploadedImage): ImageSplitResult {
		if (image.kind === "remote") {
			return {
				remoteUrl: image.url, // url может быть undefined
			};
		} else {
			return {
				localFile: image.file, // file может быть undefined
			};
		}
	}

	public splits(images: UploadedImage[]): ImageSplitsResult {
		if (!images || images.length === 0) {
			return { remoteUrls: [], localFiles: [] };
		}

		// Фильтруем undefined значения
		const remoteUrls = images
			.filter(
				(img): img is UploadedImage & { kind: "remote"; url: string } =>
					img.kind === "remote" && img.url !== undefined,
			)
			.map((img) => img.url);

		const localFiles = images
			.filter(
				(img): img is UploadedImage & { kind: "local"; file: File } =>
					img.kind === "local" && img.file !== undefined,
			)
			.map((img) => img.file);

		return { remoteUrls, localFiles };
	}

	public toUploadedImages(items: (File | ImageModel)[]): UploadedImage[] {
		return items.map((item) => this.toUploadedImage(item));
	}

	public toUploadedImage(item: File | ImageModel | string): UploadedImage {
		if (typeof item === "string") {
			return {
				id: crypto.randomUUID(),
				kind: "remote",
				url: item,
			};
		}

		if (isImageModel(item)) {
			return {
				id: crypto.randomUUID(),
				kind: "remote",
				url: item.url,
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

		if (image.kind === "remote") {
			return image.url || "";
		}

		// Для local файлов
		if (image.preview) {
			return image.preview;
		}

		if (image.file) {
			return URL.createObjectURL(image.file);
		}

		return "";
	}

	public toUrls(images: UploadedImage[]): string[] {
		return images.map((img) => this.toUrl(img));
	}
}
