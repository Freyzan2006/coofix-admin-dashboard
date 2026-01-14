import type { ImageModel } from "@modules/upload";
import type { CategoryModel, MutationCategoryModel } from "./category.model";

export interface CategoriesDto {
	success: boolean;
	categories: CategoryModel[];
}

export interface CategoryDto {
	success: boolean;
	category: CategoryModel;
}

export interface UpdateCategoryDto
	extends Omit<
		MutationCategoryModel,
		"_id" | "createdAt" | "updatedAt" | "slug" | "image"
	> {
	image: ImageModel | null;
}
