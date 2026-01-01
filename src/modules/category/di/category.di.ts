import { newRestApiCli } from "@shared/api/rest-api/client";
import { environmentConfig } from "@shared/config";
import { CategoryRestApi } from "../api/category.api";
import {
	CategoryService,
	type ICategoryService,
} from "../service/category.service";

async function factoryCategoryService(): Promise<ICategoryService> {
	const clientRestApi = await newRestApiCli(
		environmentConfig.get<string>("VITE_API_URL"),
	);
	const categoryApi = new CategoryRestApi(clientRestApi);
	const categoryService = new CategoryService(categoryApi);

	return categoryService;
}

export const categoryService = await factoryCategoryService();
