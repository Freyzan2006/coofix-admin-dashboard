import type { ImageModel, UploadedImage } from "@modules/upload";

export interface CategoryParentModel {
	_id: string;
	name: string;
	slug: string;
}

export interface CategoryModel {
	_id: string;
	name: string;
	slug: string;
	parent: CategoryParentModel;
	image: ImageModel | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface MutationCategoryModel {
	name: string;
	parent: CategoryParentModel;
	image: UploadedImage | null;
}
