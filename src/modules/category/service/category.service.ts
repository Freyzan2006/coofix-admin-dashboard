import type { ICategoryApi } from "../api/category.api";
import type { CategoryModel } from "../model/category.model";

export interface ICategoryService {
	getAllCategories(): Promise<CategoryModel[]>;
}

export class CategoryService implements ICategoryService {
	constructor(private readonly api: ICategoryApi) {}
	public async getAllCategories(): Promise<CategoryModel[]> {
		return this.api.findAll();
	}
}
