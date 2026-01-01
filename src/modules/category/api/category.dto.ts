import type { CategoryModel } from "../model/category.model";

export interface CategoriesDto {
	success: boolean;
	categories: CategoryModel[];
}
