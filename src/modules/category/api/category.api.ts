import type { RestApiCliType } from "@shared/api/rest-api/client";
import type { CategoryModel } from "../model/category.model";
import type { CategoriesDto } from "./category.dto";

export interface ICategoryApi {
	findAll(): Promise<CategoryModel[]>;
}

export class CategoryRestApi implements ICategoryApi {
	constructor(private readonly client: RestApiCliType) {}

	public async findAll(): Promise<CategoryModel[]> {
		const response = await this.client.get<CategoriesDto>("/categories");
		return response.data.categories;
	}
}
