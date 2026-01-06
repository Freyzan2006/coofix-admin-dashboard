import type { UploadedImage } from "@modules/upload";

export interface CategoryModel {
	_id: string;
	name: string;
	slug: string;
	parent: string;
	image: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateCategoryModel {
	name: string;
	parent: string;
	image: UploadedImage | null;
}

export interface UpdateCategoryModel {
	name: string;
	parent: string;
	image: UploadedImage | null;
}
