import type { ImageModel } from "./upload.model";

export function isImageModel(item: File | ImageModel): item is ImageModel {
	return "url" in item && "publicId" in item && typeof item.url === "string";
}
