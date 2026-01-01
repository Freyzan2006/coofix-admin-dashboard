import type { ICategoryApi } from "../api/category.api";
import type { CreateCategoryDto, UpdateCategoryDto } from "../api/category.dto";
import type { CategoryModel } from "../model/category.model";

export interface ICategoryService {
	getAllCategories(): Promise<CategoryModel[]>;
	getCategoryBySlug(slug: string): Promise<CategoryModel>;
	createCategory(category: CreateCategoryDto): Promise<CategoryModel>;
	updateCategory(
		id: string,
		category: UpdateCategoryDto,
	): Promise<CategoryModel>;
	deleteCategory(id: string): Promise<void>;
}

export class CategoryService implements ICategoryService {
	constructor(private readonly api: ICategoryApi) {}
	public async getAllCategories(): Promise<CategoryModel[]> {
		return await this.api.findAll();
	}

	public async getCategoryBySlug(slug: string): Promise<CategoryModel> {
		return await this.api.findBySlug(slug);
	}

	public async createCategory(
		category: CreateCategoryDto,
	): Promise<CategoryModel> {
		return await this.api.create(category);
	}

	public async updateCategory(
		id: string,
		category: UpdateCategoryDto,
	): Promise<CategoryModel> {
		return await this.api.update(id, category);
	}

	public async deleteCategory(id: string): Promise<void> {
		await this.api.delete(id);
	}
}
