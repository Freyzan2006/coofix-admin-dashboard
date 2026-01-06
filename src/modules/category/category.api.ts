import type { RestApiCliType } from "@shared/api/rest-api/client";
import type {
	CategoriesDto,
	CategoryDto,
	UpdateCategoryDto,
} from "./category.dto";
import type { CategoryModel, CreateCategoryModel } from "./category.model";

export interface ICategoryApi {
	findAll(): Promise<CategoryModel[]>;
	create(category: CreateCategoryModel): Promise<CategoryModel>;
	findBySlug(slug: string): Promise<CategoryModel>;
	update(id: string, category: UpdateCategoryDto): Promise<CategoryModel>;
	delete(id: string): Promise<void>;
}

export class CategoryRestApi implements ICategoryApi {
	constructor(private readonly client: RestApiCliType) {}

	public async findAll(): Promise<CategoryModel[]> {
		const response = await this.client.get<CategoriesDto>("/categories");
		return response.data.categories;
	}

	public async create(category: CreateCategoryModel): Promise<CategoryModel> {
		const response = await this.client.post<CategoryDto>(
			"/categories",
			category,
		);
		return response.data.category;
	}

	public async findBySlug(slug: string): Promise<CategoryModel> {
		const response = await this.client.get<CategoryDto>(`/categories/${slug}`);
		return response.data.category;
	}

	public async update(
		id: string,
		category: UpdateCategoryDto,
	): Promise<CategoryModel> {
		const response = await this.client.put<CategoryDto>(
			`/categories/${id}`,
			category,
		);
		return response.data.category;
	}

	public async delete(id: string): Promise<void> {
		await this.client.delete(`/categories/${id}`);
	}
}
