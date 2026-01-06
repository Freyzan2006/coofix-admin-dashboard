import type { CategoryModel } from "./category.model";

export interface CategoriesDto {
	success: boolean;
	categories: CategoryModel[];
}

export interface CategoryDto {
	success: boolean;
	category: CategoryModel;
}

export type UpdateCategoryDto = Omit<
	CategoryModel,
	"_id" | "createdAt" | "updatedAt" | "slug"
>;
